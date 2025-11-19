# Voice Integration Guide

## Overview
The voice assistant uses the Web Speech API for speech recognition (STT) and speech synthesis (TTS). This guide covers setup, commands, and troubleshooting.

## Browser Support

### Speech Recognition (Input)
- ✅ Chrome/Chromium (all platforms)
- ✅ Edge (Windows, macOS)
- ✅ Safari (iOS 14.5+, macOS)
- ❌ Firefox (not supported)

### Speech Synthesis (Output)
- ✅ All modern browsers

## Voice Commands

### Navigation Commands
| Command | Action |
|---------|--------|
| "Go to home" | Navigate to home page |
| "Open accounts" | Navigate to accounts page |
| "Show loans" | Navigate to loans page |
| "Go to cards" | Navigate to cards page |
| "Open contact" | Navigate to contact page |

### Conversation
Any non-navigation phrase is sent to the chatbot for processing.

## How It Works

### 1. Speech Recognition (User → Text)
```javascript
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';
```

### 2. Intent Detection
The system checks if the input is a navigation command or a question.

### 3. Speech Synthesis (Text → Audio)
```javascript
const utterance = new SpeechSynthesisUtterance(text);
utterance.rate = 1.0;
utterance.pitch = 1.0;
window.speechSynthesis.speak(utterance);
```

## Adding Custom Commands

Edit `frontend/components/chatbot/VoiceAssistant.tsx`:

```typescript
const commands: { [key: string]: string } = {
  'show balance': '/accounts', // Add this
  'transfer money': '/accounts', // Add this
  // ... existing commands
};
```

## Customizing Voice Output

### Change Voice
```javascript
const voices = window.speechSynthesis.getVoices();
utterance.voice = voices[2]; // Select specific voice
```

### Adjust Speed & Pitch
```javascript
utterance.rate = 1.2;  // 0.1 to 10 (default: 1)
utterance.pitch = 1.0; // 0 to 2 (default: 1)
```

## Offline Voice Recognition

Web Speech API requires internet. For offline:

### Option 1: Vosk (Offline STT)
```bash
npm install vosk-browser
```

```javascript
import { Model } from 'vosk-browser';
const model = await Model.createModel('/models/vosk-model-small-en-us');
```

### Option 2: Whisper.cpp (Local AI)
Run Whisper locally and connect via WebSocket.

## HTTPS Requirement

**Important**: Voice recognition requires HTTPS in production!

### Development
- localhost works without HTTPS
- Use ngrok for mobile testing: `ngrok http 3000`

### Production
- Deploy to Vercel (automatic HTTPS)
- Or configure SSL certificate on your server

## Troubleshooting

### "Voice not working"
1. **Check browser support**: Use Chrome/Edge/Safari
2. **Allow microphone**: Grant permission when prompted
3. **Check HTTPS**: Required except on localhost
4. **Try different browser**: Firefox doesn't support STT

### "Voice cuts off too early"
```javascript
recognition.continuous = true; // Keep listening
```

### "Can't hear responses"
1. Check volume settings
2. Verify `speechSynthesis.getVoices()` returns voices
3. Wait for voices to load (use `voiceschanged` event)

### "Wrong language"
Change recognition language:
```javascript
recognition.lang = 'es-ES'; // Spanish
recognition.lang = 'fr-FR'; // French
recognition.lang = 'de-DE'; // German
```

## Privacy & Security

- Voice data is processed by browser/OS
- Chrome sends audio to Google servers
- Safari processes on-device (iOS 15+)
- No audio is stored by our application

## Advanced: Custom Wake Word

Implement always-listening mode with wake word detection:

```javascript
recognition.continuous = true;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();

  if (transcript.includes('hey bank')) {
    // Wake word detected
    speak('How can I help?');
    // Process next command
  }
};
```

## Performance Tips

1. **Stop synthesis before starting new**:
```javascript
window.speechSynthesis.cancel();
```

2. **Preload voices**:
```javascript
useEffect(() => {
  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    setAvailableVoices(voices);
  };

  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}, []);
```

3. **Debounce rapid commands**:
```javascript
const debouncedCommand = debounce(executeCommand, 500);
```

## Testing

### Manual Testing
1. Click microphone icon
2. Say a command
3. Verify action occurs
4. Check console for logs

### Automated Testing
```javascript
// Mock Web Speech API for tests
global.webkitSpeechRecognition = jest.fn();
global.SpeechSynthesisUtterance = jest.fn();
```

## Resources

- [MDN Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Can I Use: Speech Recognition](https://caniuse.com/speech-recognition)
- [W3C Speech API Specification](https://wicg.github.io/speech-api/)
