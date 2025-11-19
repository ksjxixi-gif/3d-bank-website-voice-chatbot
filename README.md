# 3D Bank Website with Voice-Enabled Chatbot

A modern, full-stack banking website with 3D interactive UI, voice-enabled chatbot, and comprehensive banking features.

## Features

- 🏦 Complete banking pages (Home, Accounts, Loans, Cards, Contact)
- 🎨 3D interactive UI with Three.js
- 🎤 Voice-enabled chatbot (speech-to-text and text-to-speech)
- 🤖 AI chatbot with editable FAQ dataset
- 📱 Fully responsive design
- ⚡ Fast loading with custom 3D loading screen
- 🔐 Secure login UI

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Three.js + React Three Fiber
- TailwindCSS
- Framer Motion
- Web Speech API

### Backend
- Node.js
- Express.js
- CORS enabled
- RESTful API

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bank-website
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Configure environment variables:

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key_here
```

Backend (.env):
```
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_key_here
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

3. Open http://localhost:3000 in your browser

## Voice Commands

The voice assistant responds to commands like:

### Navigation Commands
- "Go to home" / "Open home page"
- "Show accounts" / "Open accounts"
- "Go to loans" / "Show loans page"
- "Open cards" / "Show cards"
- "Go to contact" / "Open contact page"

### Information Commands
- "Tell me about loans"
- "What cards do you offer?"
- "Show account information"
- "What services do you provide?"

### Action Commands
- "Show my balance"
- "Transfer money"
- "Pay bills"

## Editing the FAQ Dataset

The chatbot uses an editable FAQ dataset located at:
`backend/data/faq-dataset.json`

### Dataset Structure:
```json
{
  "categories": {
    "accounts": [
      {
        "question": "How do I open an account?",
        "answer": "You can open an account...",
        "keywords": ["open", "account", "new"]
      }
    ]
  }
}
```

### Adding New FAQs:
1. Open `backend/data/faq-dataset.json`
2. Add your question-answer pair to the appropriate category
3. Include relevant keywords for better matching
4. Save the file - changes take effect immediately

## Architecture

### Frontend Structure
```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── accounts/           # Accounts page
│   ├── loans/              # Loans page
│   ├── cards/              # Cards page
│   └── contact/            # Contact page
├── components/
│   ├── 3d/                 # Three.js components
│   ├── chatbot/            # Chatbot components
│   ├── voice/              # Voice assistant
│   └── ui/                 # UI components
└── lib/                    # Utilities
```

### Backend Structure
```
backend/
├── server.js               # Express server
├── routes/
│   ├── chatbot.js         # Chatbot endpoints
│   └── banking.js         # Banking API
├── data/
│   └── faq-dataset.json   # Editable FAQ data
└── utils/
    └── nlp.js             # NLP utilities
```

## Voice Integration

### Browser Compatibility
- Speech Recognition: Chrome, Edge, Safari (WebKit)
- Speech Synthesis: All modern browsers

### Fallback Options
If browser doesn't support Web Speech API, the chatbot automatically falls back to text-only mode.

### Online Model Integration

#### OpenAI Integration:
Set `NEXT_PUBLIC_OPENAI_API_KEY` in `.env.local`

#### Gemini Integration:
Replace OpenAI imports with Gemini SDK in `frontend/lib/ai-model.ts`

## Production Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel deploy --prod
```

### Backend (Any Node.js host)
```bash
cd backend
npm run build
npm start
```

## Troubleshooting

### Voice not working
- Ensure HTTPS (required for Web Speech API in production)
- Check browser compatibility
- Allow microphone permissions

### Chatbot not responding
- Verify backend is running on port 5000
- Check CORS configuration
- Review FAQ dataset syntax

### 3D performance issues
- Reduce particle count in Three.js scenes
- Enable hardware acceleration in browser

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.
