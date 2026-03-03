// Voice Service - Speech-to-Text functionality

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const voiceService = {
  isSupported: () => {
    return SpeechRecognition !== undefined;
  },

  startListening: (language = 'en-IN', onResult, onError) => {
    if (!SpeechRecognition) {
      onError('Speech Recognition not supported in your browser');
      return null;
    }

    const recognition = new SpeechRecognition();

    // Set language
    recognition.lang = language; // 'en-IN' for English (India), 'hi-IN' for Hindi

    // Start listening
    recognition.start();

    // Handle results
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      onResult(transcript);
    };

    // Handle errors
    recognition.onerror = (event) => {
      onError(`Error: ${event.error}`);
    };

    return recognition;
  },

  stopListening: (recognition) => {
    if (recognition) {
      recognition.stop();
    }
  },

  // Language options
  languages: {
    'English': 'en-IN',
    'Hindi': 'hi-IN',
    'Tamil': 'ta-IN',
    'Telugu': 'te-IN',
    'Kannada': 'kn-IN',
    'Malayalam': 'ml-IN',
    'Marathi': 'mr-IN',
    'Bengali': 'bn-IN',
    'Gujarati': 'gu-IN',
    'Punjabi': 'pa-IN'
  }
};

export default voiceService;