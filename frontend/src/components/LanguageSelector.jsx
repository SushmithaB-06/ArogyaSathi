import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = {
    en: '🇬🇧 English',
    hi: '🇮🇳 हिंदी',
    ta: '🇮🇳 தமிழ்',
    te: '🇮🇳 తెలుగు',
    kn: '🇮🇳 ಕನ್ನಡ',
    ml: '🇮🇳 മലയാളം'
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-semibold text-gray-600">Language:</span>
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}