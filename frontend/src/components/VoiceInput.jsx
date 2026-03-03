import React, { useState, useRef } from 'react';
import { voiceService } from '../services/voiceService';

export default function VoiceInput({ onVoiceInput, language = 'en-IN' }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  const handleStartListening = () => {
    if (!voiceService.isSupported()) {
      setError('Voice input not supported in your browser');
      return;
    }

    setIsListening(true);
    setError('');

    recognitionRef.current = voiceService.startListening(
      language,
      (transcript) => {
        onVoiceInput(transcript);
        setIsListening(false);
      },
      (err) => {
        setError(err);
        setIsListening(false);
      }
    );
  };

  const handleStopListening = () => {
    voiceService.stopListening(recognitionRef.current);
    setIsListening(false);
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        {!isListening ? (
          <button
            onClick={handleStartListening}
            className="flex-1 bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            🎤 Start Voice Input
          </button>
        ) : (
          <>
            <button
              disabled
              className="flex-1 bg-purple-400 text-white py-2 rounded font-bold opacity-50 flex items-center justify-center gap-2"
            >
              🎤 Listening...
            </button>
            <button
              onClick={handleStopListening}
              className="bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
            >
              Stop
            </button>
          </>
        )}
      </div>
      {error && <p className="text-red-600 text-sm mt-2">❌ {error}</p>}
    </div>
  );
}