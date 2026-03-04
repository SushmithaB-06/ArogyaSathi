import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../services/firebaseService';
import { logoutUser } from '../services/firebaseService';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();
  const { t } = useTranslation();

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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <span className="text-3xl">💉</span>
            <div>
              <p className="text-lg">ArogyaSathi</p>
              <p className="text-xs text-gray-500 font-normal">Healthcare for All</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link
              to="/"
              className={`font-semibold text-sm transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🏠 {t('header.home')}
            </Link>
            <Link
              to="/symptoms"
              className={`font-semibold text-sm transition-colors ${
                isActive('/symptoms') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🩺 {t('header.symptoms')}
            </Link>
            <Link
              to="/hospitals"
              className={`font-semibold text-sm transition-colors ${
                isActive('/hospitals') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🏥 {t('header.hospitals')}
            </Link>
            <Link
              to="/medicine"
              className={`font-semibold text-sm transition-colors ${
                isActive('/medicine') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              💊 {t('header.medicine')}
            </Link>
            <Link
              to="/emergency"
              className={`font-semibold text-sm transition-colors ${
                isActive('/emergency') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              🆘 {t('header.emergency')}
            </Link>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">👤 {user.email?.split('@')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="btn-danger px-4 py-2 text-sm"
                >
                  🚪 {t('header.logout')}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn-primary px-4 py-2 text-sm">
                  {t('header.login')}
                </Link>
                <Link to="/signup" className="btn-success px-4 py-2 text-sm">
                  {t('header.signup')}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-600"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <Link to="/" className="block text-gray-600 hover:text-blue-600 font-semibold">
              🏠 {t('header.home')}
            </Link>
            <Link to="/symptoms" className="block text-gray-600 hover:text-blue-600 font-semibold">
              🩺 {t('header.symptoms')}
            </Link>
            <Link to="/hospitals" className="block text-gray-600 hover:text-blue-600 font-semibold">
              🏥 {t('header.hospitals')}
            </Link>
            <Link to="/medicine" className="block text-gray-600 hover:text-blue-600 font-semibold">
              💊 {t('header.medicine')}
            </Link>
            <Link to="/emergency" className="block text-gray-600 hover:text-blue-600 font-semibold">
              🆘 {t('header.emergency')}
            </Link>
            <div className="pt-3 border-t">
              <LanguageSelector />
            </div>
            {!user && (
              <div className="flex gap-2 pt-3">
                <Link to="/login" className="flex-1 btn-primary py-2 text-center text-sm">
                  {t('header.login')}
                </Link>
                <Link to="/signup" className="flex-1 btn-success py-2 text-center text-sm">
                  {t('header.signup')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}