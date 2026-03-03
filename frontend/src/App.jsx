import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SymptomChecker from './pages/SymptomChecker';
import HospitalFinder from './pages/HospitalFinder';
import MedicineReminder from './pages/MedicineReminder';
import Emergency from './pages/Emergency';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/hospitals" element={<HospitalFinder />} />
            <Route path="/medicine" element={<MedicineReminder />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;