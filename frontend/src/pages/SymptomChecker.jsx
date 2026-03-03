import React, { useState } from 'react';

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    // TODO: Call API to analyze symptoms
    setResult({
      condition: 'Common Cold',
      severity: 'Mild',
      recommendation: 'Rest, stay hydrated, and monitor symptoms'
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Symptom Checker</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms here..."
          className="w-full border-2 border-gray-300 rounded p-4 h-32 mb-4 focus:outline-none focus:border-blue-500"
        />
        
        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition"
        >
          Analyze Symptoms
        </button>

        {result && (
          <div className="mt-8 p-4 bg-green-50 rounded border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-green-600 mb-2">{result.condition}</h3>
            <p className="text-gray-600 mb-2"><strong>Severity:</strong> {result.severity}</p>
            <p className="text-gray-600"><strong>Recommendation:</strong> {result.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}