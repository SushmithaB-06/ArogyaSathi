import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          🏥 ArogyaSathi
        </Link>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
          <li><Link to="/symptoms" className="hover:text-blue-200">Symptoms</Link></li>
          <li><Link to="/hospitals" className="hover:text-blue-200">Hospitals</Link></li>
          <li><Link to="/medicine" className="hover:text-blue-200">Medicine</Link></li>
          <li><Link to="/emergency" className="hover:text-blue-200">Emergency</Link></li>
          <li><Link to="/login" className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800">Login</Link></li>
          <li><Link to="/signup" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}