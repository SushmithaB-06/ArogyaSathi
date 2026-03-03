import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            Welcome to ArogyaSathi
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Healthcare made simple, accessible, and affordable for everyone.
          </p>
          <p className="text-lg text-gray-500 mb-12">
            AI-powered symptom checking, hospital finder, and medicine reminders in your language.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Card 1 */}
          <Link to="/symptoms" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <div className="text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Symptom Check</h3>
            <p className="text-gray-600">AI-powered analysis of your symptoms</p>
          </Link>

          {/* Card 2 */}
          <Link to="/hospitals" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <div className="text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Find Hospitals</h3>
            <p className="text-gray-600">Locate nearby hospitals and clinics</p>
          </Link>

          {/* Card 3 */}
          <Link to="/medicine" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Medicine Reminder</h3>
            <p className="text-gray-600">Never miss your medicine schedule</p>
          </Link>

          {/* Card 4 */}
          <Link to="/emergency" className="bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition border-2 border-red-500">
            <div className="text-4xl mb-4">🆘</div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Emergency Help</h3>
            <p className="text-gray-600">Quick access to emergency services</p>
          </Link>
        </div>
      </section>
    </div>
  );
}