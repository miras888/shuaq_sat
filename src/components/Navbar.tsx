import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <div className="relative">
        {/* Background layers (kept subtle, no elements near edges) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/70 via-emerald-700/50 to-emerald-800/70" />
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 border-b border-emerald-600/30" />
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.35'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-4 group">
                <motion.div className="relative" whileHover={{ rotate: 5 }} transition={{ duration: 0.3 }}>
                  <motion.img
                    src="/image/logo.jpg"
                    alt="Shuaq Foundation"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-yellow-400/70 shadow-xl"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(251, 191, 36, 0.45)' }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent hidden sm:block">
                  Shuaq Foundation
                </span>
              </Link>
            </motion.div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="text-emerald-100 text-sm hidden md:block bg-emerald-800/60 px-3 py-2 rounded-lg border border-emerald-600/50">
                    Welcome, {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors duration-200 border border-emerald-600 hover:border-yellow-400 shadow"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/signin"
                      className="px-5 py-2 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-emerald-900 font-medium rounded-lg transition-all duration-200 bg-emerald-800/40"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/signup"
                      className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-emerald-900 font-semibold rounded-lg transition-all duration-200 shadow border-2 border-yellow-300"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};