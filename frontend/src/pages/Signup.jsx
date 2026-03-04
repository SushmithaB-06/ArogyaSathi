import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpUser } from '../services/firebaseService';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUpUser(email, password, name);
      alert('✅ Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Join Us
            </h1>
            <p className="text-gray-600">Start your healthy lifestyle today</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 font-semibold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-2">👤 Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">📧 Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">🔐 Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">🔐 Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <input type="checkbox" className="mt-1" required />
              <p className="text-sm text-gray-600">
                I agree to the <a href="#" className="font-bold text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-success disabled:opacity-50 font-bold text-lg py-3"
            >
              {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:text-purple-600 transition">
              Login here
            </Link>
          </p>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center text-gray-600 text-sm flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span>Secure Signup</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span>Instant Activation</span>
          </div>
        </div>
      </div>
    </div>
  );
}