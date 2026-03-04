import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">💉</span> ArogyaSathi
            </h3>
            <p className="text-gray-300 mb-4">
              Healthcare made simple, accessible, and affordable for everyone.
            </p>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:scale-125 transition-transform">📘</a>
              <a href="#" className="hover:scale-125 transition-transform">🐦</a>
              <a href="#" className="hover:scale-125 transition-transform">📷</a>
              <a href="#" className="hover:scale-125 transition-transform">💼</a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/symptoms" className="hover:text-white transition">Symptom Checker</Link></li>
              <li><Link to="/hospitals" className="hover:text-white transition">Find Hospitals</Link></li>
              <li><Link to="/medicine" className="hover:text-white transition">Medicine Reminder</Link></li>
              <li><Link to="/emergency" className="hover:text-white transition">Emergency Help</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
            <p>
              &copy; {currentYear} ArogyaSathi. All rights reserved. Built with ❤️ for India
            </p>
            <p className="mt-4 md:mt-0">
              Made by <span className="font-bold text-white">SushmithaB-06</span> 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}