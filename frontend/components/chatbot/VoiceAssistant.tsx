'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface VoiceAssistantProps {
  isActive: boolean;
  onTranscript: (text: string) => void;
  onStatusChange: (status: boolean) => void;
}

export default function VoiceAssistant({ isActive, onTranscript, onStatusChange }: VoiceAssistantProps) {
  const recognitionRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voice input:', transcript);

        // Check for navigation commands
        if (handleNavigationCommand(transcript)) {
          speak('Navigating now');
          onStatusChange(false);
          return;
        }

        // Send to chatbot
        onTranscript(transcript);
        onStatusChange(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onStatusChange(false);
      };

      recognitionRef.current.onend = () => {
        onStatusChange(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isActive) {
      try {
        recognitionRef.current.start();
        speak('Listening');
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        // Already stopped
      }
    }
  }, [isActive]);

  const handleNavigationCommand = (transcript: string): boolean => {
    const commands: { [key: string]: string } = {
      'go to home': '/',
      'open home': '/',
      'home page': '/',
      'show accounts': '/accounts',
      'open accounts': '/accounts',
      'go to accounts': '/accounts',
      'show loans': '/loans',
      'open loans': '/loans',
      'go to loans': '/loans',
      'show cards': '/cards',
      'open cards': '/cards',
      'go to cards': '/cards',
      'show contact': '/contact',
      'open contact': '/contact',
      'go to contact': '/contact',
      'contact page': '/contact',
    };

    for (const [command, path] of Object.entries(commands)) {
      if (transcript.includes(command)) {
        router.push(path);
        return true;
      }
    }

    return false;
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.2;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return null;
}
