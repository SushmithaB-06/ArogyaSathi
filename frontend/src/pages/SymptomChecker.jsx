import React, { useState, useRef } from 'react';
import { symptomAPI } from '../services/apiService';
import { voiceService } from '../services/voiceService';

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en-IN');
  const recognitionRef = useRef(null);

  const handleStartVoiceInput = () => {
    if (!voiceService.isSupported()) {
      setError('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setIsListening(true);
    setError('');

    recognitionRef.current = voiceService.startListening(
      language,
      (transcript) => {
        setSymptoms((prev) => prev + ' ' + transcript);
        setIsListening(false);
      },
      (err) => {
        setError(err);
        setIsListening(false);
      }
    );
  };

  const handleStopVoiceInput = () => {
    voiceService.stopListening(recognitionRef.current);
    setIsListening(false);
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const symptomList = symptoms.split(',').map(s => s.trim());
      const response = await symptomAPI.analyze(symptomList, 'en');
      setResult(response.data.data);
    } catch (err) {
      setError('Error analyzing symptoms. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSymptoms('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">🩺 Symptom Checker</h1>

      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Language Selector */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Select Language for Voice Input</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            {Object.entries(voiceService.languages).map(([name, code]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600 mb-4">
          📝 Enter your symptoms separated by commas (e.g., fever, cough, headache)
        </p>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms here... or use voice input below"
          className="w-full border-2 border-gray-300 rounded p-4 h-32 mb-4 focus:outline-none focus:border-blue-500"
        />

        {/* Voice Input Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleStartVoiceInput}
            disabled={isListening}
            className="flex-1 bg-purple-600 text-white py-3 rounded font-bold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            🎤 {isListening ? 'Listening...' : 'Start Voice Input'}
          </button>

          {isListening && (
            <button
              onClick={handleStopVoiceInput}
              className="flex-1 bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              ⏹️ Stop Listening
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Symptoms'}
          </button>

          <button
            onClick={handleClear}
            className="flex-1 bg-gray-600 text-white py-3 rounded font-bold hover:bg-gray-700 transition"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-600 mb-4">📊 Analysis Results</h2>

            <div className="p-4 bg-green-50 rounded border-l-4 border-green-500 mb-4">
              <h3 className="text-xl font-bold text-green-600 mb-2">Possible Conditions:</h3>
              {result.conditions && result.conditions.map((condition, idx) => (
                <div key={idx} className="mb-3 p-3 bg-white rounded">
                  <p className="font-bold text-gray-700">{condition.name}</p>
                  <p className="text-gray-600">
                    Probability: {(condition.probability * 100).toFixed(0)}% | 
                    Severity: <span className={`font-bold ${
                      condition.severity === 'mild' ? 'text-green-600' :
                      condition.severity === 'moderate' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>{condition.severity}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-500 mb-4">
              <h3 className="text-xl font-bold text-blue-600 mb-2">💊 Recommendations:</h3>
              {result.recommendations && result.recommendations.map((rec, idx) => (
                <p key={idx} className="text-gray-700 mb-2">✓ {rec}</p>
              ))}
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded">
              <p className="text-yellow-800">
                <strong>⚠️ Disclaimer:</strong> This AI analysis is for informational purposes only. 
                Please consult a licensed doctor for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      {!voiceService.isSupported() && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded">
          <p className="text-blue-800">
            <strong>ℹ️ Note:</strong> Voice input works best on Chrome, Edge, or Safari browsers.
          </p>
        </div>
      )}
    </div>
  );
}