import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PolicyList from './components/PolicyList';
import AddPolicyForm from './components/AddPolicyForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SingupForm';
import Navbar from './components/Navbar';
import Home from './components/Homepage'; 
import AuthProvider from './context/AuthContext'
import './tailwind.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<PolicyList />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/add-policy" element={<AddPolicyForm />} />
            </Routes>
          </main>
        </div>
        <footer className="bg-gray-800 text-white text-center py-4">
          Policies for Students © {new Date().getFullYear()}
        </footer>
      </Router>
    </AuthProvider>
  );
};

export default App;