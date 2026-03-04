import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="animate-fadeInUp">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
                Your Health, Our Priority
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                ArogyaSathi brings healthcare to your doorstep with AI-powered symptom checking, instant hospital finder, and personalized medicine reminders.
              </p>
              <p className="text-lg text-gray-500 mb-8">
                Available in 10 Indian languages • Works offline • Designed for everyone
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/symptoms"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  🩺 Check Symptoms
                </Link>
                <Link
                  to="/signup"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  ✨ Get Started
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 flex gap-6 flex-wrap text-sm font-semibold text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔐</span>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  <span>Mobile Friendly</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  <span>10+ Languages</span>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-full h-96">
                {/* Animated Circle Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

                {/* Main Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl animate-bounce">💉</div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-10 right-10 text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>
                  🏥
                </div>
                <div className="absolute bottom-10 left-10 text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>
                  💊
                </div>
                <div className="absolute top-1/3 left-1/4 text-5xl animate-bounce" style={{ animationDelay: '0.1s' }}>
                  ❤️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Amazing Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="card card-hover group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">🩺</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-3">Symptom Check</h3>
              <p className="text-gray-600 mb-4">
                AI-powered analysis of your symptoms with voice support in your language
              </p>
              <Link to="/symptoms" className="text-blue-600 font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">🏥</div>
              <h3 className="text-2xl font-bold text-green-600 mb-3">Find Hospitals</h3>
              <p className="text-gray-600 mb-4">
                Locate nearby hospitals, clinics, and medical centers instantly
              </p>
              <Link to="/hospitals" className="text-green-600 font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">💊</div>
              <h3 className="text-2xl font-bold text-purple-600 mb-3">Medicine Reminder</h3>
              <p className="text-gray-600 mb-4">
                Never miss your medicines with smart reminders and notifications
              </p>
              <Link to="/medicine" className="text-purple-600 font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="card card-hover group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">🆘</div>
              <h3 className="text-2xl font-bold text-red-600 mb-3">Emergency Help</h3>
              <p className="text-gray-600 mb-4">
                One-tap SOS to call ambulance and emergency services instantly
              </p>
              <Link to="/emergency" className="text-red-600 font-semibold hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why ArogyaSathi Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose ArogyaSathi?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">For Everyone</h3>
              <p className="text-gray-600">
                Designed for rural, urban, elderly, and illiterate users. Simple, intuitive, and accessible to all.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fast & Reliable</h3>
              <p className="text-gray-600">
                Get instant AI-powered health insights and hospital recommendations in seconds.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-6xl mb-4">🔐</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Privacy First</h3>
              <p className="text-gray-600">
                Your health data is encrypted and secured. We never share your personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Join thousands of users who trust ArogyaSathi for their healthcare needs
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              🚀 Get Started Free
            </Link>
            <Link
              to="/symptoms"
              className="px-8 py-4 bg-blue-700 text-white font-bold rounded-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              🩺 Check Symptoms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}