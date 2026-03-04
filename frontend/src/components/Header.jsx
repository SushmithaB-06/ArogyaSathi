import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../services/firebaseService';
import { logoutUser } from '../services/firebaseService';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    window.location.href = '/';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-3xl font-bold hover:scale-110 transition-transform">
          <span className="text-4xl">💉</span>
          <div>
            <p className="text-lg">ArogyaSathi</p>
            <p className="text-xs font-normal opacity-80">Healthcare for Everyone</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-1 items-center">
          <li>
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/') ? 'bg-white text-blue-600' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              🏠 Home
            </Link>
          </li>
          <li>
            <Link
              to="/symptoms"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/symptoms') ? 'bg-white text-blue-600' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              🩺 Symptoms
            </Link>
          </li>
          <li>
            <Link
              to="/hospitals"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/hospitals') ? 'bg-white text-blue-600' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              🏥 Hospitals
            </Link>
          </li>
          <li>
            <Link
              to="/medicine"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/medicine') ? 'bg-white text-blue-600' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              💊 Medicine
            </Link>
          </li>
          <li>
            <Link
              to="/emergency"
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                isActive('/emergency') ? 'bg-white text-blue-600' : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              🆘 Emergency
            </Link>
          </li>

          {user ? (
            <>
              <li className="px-4 py-2">
                <p className="text-sm opacity-90">👋 {user.email?.split('@')[0]}</p>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  🚪 Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  🔑 Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all"
                >
                  ✨ Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-700 to-purple-700 px-4 py-4 space-y-2">
          <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🏠 Home</Link>
          <Link to="/symptoms" className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🩺 Symptoms</Link>
          <Link to="/hospitals" className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🏥 Hospitals</Link>
          <Link to="/medicine" className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">💊 Medicine</Link>
          <Link to="/emergency" className="block px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🆘 Emergency</Link>
          {!user && (
            <>
              <Link to="/login" className="block px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold">🔑 Login</Link>
              <Link to="/signup" className="block px-4 py-2 bg-green-500 rounded-lg font-semibold">✨ Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}