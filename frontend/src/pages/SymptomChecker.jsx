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
      setError('Voice input is not supported in your browser');
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

  // Severity color map
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <span className="text-5xl">🩺</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Symptom Checker
          </h1>
          <p className="text-xl text-gray-600">
            Describe your symptoms and get instant AI-powered health insights
          </p>
        </div>

        {/* Main Card */}
        <div className="card shadow-2xl mb-8">
          {/* Language Selector */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <label className="block text-gray-800 font-bold mb-3">🗣️ Select Language for Voice Input</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border-2 border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-purple-200"
            >
              {Object.entries(voiceService.languages).map(([name, code]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </div>

          {/* Symptoms Input */}
          <div className="mb-8">
            <label className="block text-gray-800 font-bold mb-3">📝 Describe Your Symptoms</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., fever, cough, sore throat, body pain..."
              className="w-full border-2 border-gray-300 rounded-xl p-4 h-40 focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg"
            />
          </div>

          {/* Voice Buttons */}
          <div className="flex gap-3 mb-8 flex-wrap">
            <button
              onClick={handleStartVoiceInput}
              disabled={isListening}
              className="flex-1 min-w-max btn-secondary disabled:opacity-50 flex items-center justify-center gap-2"
            >
              🎤 {isListening ? 'Listening...' : 'Start Voice Input'}
            </button>

            {isListening && (
              <button
                onClick={handleStopVoiceInput}
                className="flex-1 min-w-max btn-danger flex items-center justify-center gap-2"
              >
                ⏹️ Stop Listening
              </button>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 font-semibold flex items-center gap-2">
              <span className="text-2xl">⚠️</span> {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex-1 min-w-max btn-primary disabled:opacity-50 text-lg py-4"
            >
              {loading ? '⏳ Analyzing...' : '🔍 Analyze Symptoms'}
            </button>

            <button
              onClick={handleClear}
              className="flex-1 min-w-max bg-gray-600 text-white py-4 rounded-lg font-bold hover:bg-gray-700 transition-all text-lg"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-fadeInUp space-y-6">
            {/* Possible Conditions */}
            <div className="card shadow-2xl">
              <h2 className="text-3xl font-bold text-green-600 mb-6 flex items-center gap-2">
                <span>📊</span> Analysis Results
              </h2>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">Possible Conditions:</h3>
                {result.conditions && result.conditions.map((condition, idx) => (
                  <div key={idx} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border-l-4 border-blue-500">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-gray-800 mb-2">{condition.name}</p>
                        <div className="flex gap-4 flex-wrap">
                          <span className="badge badge-primary">
                            📈 Probability: {(condition.probability * 100).toFixed(0)}%
                          </span>
                          <span className={`badge ${getSeverityColor(condition.severity)}`}>
                            ⚠️ Severity: {condition.severity}
                          </span>
                        </div>
                      </div>
                      <div className="text-4xl">
                        {condition.severity === 'mild' ? '🟢' : 
                         condition.severity === 'moderate' ? '🟡' : '🔴'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card shadow-2xl">
              <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                <span>💊</span> Recommendations
              </h3>
              <div className="space-y-3">
                {result.recommendations && result.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-4 bg-blue-50 rounded-lg flex gap-3 items-start">
                    <span className="text-2xl">✅</span>
                    <p className="text-gray-700 text-lg">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="card bg-yellow-50 border-2 border-yellow-300">
              <p className="text-yellow-800 text-lg flex gap-3 items-start">
                <span className="text-2xl">⚠️</span>
                <span>
                  <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not be considered as medical advice. Always consult a qualified healthcare professional for proper diagnosis, treatment, and medical guidance.
                </span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a
                href="tel:102"
                className="inline-block btn-danger text-lg py-4 px-8"
              >
                🚑 Call Ambulance - 102
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}