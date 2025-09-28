import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-emerald-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Logo and Tagline */}
        <motion.div className="text-center" variants={fadeInUp}>
          <motion.img
            src="/image/logo.jpg"
            alt="Shuaq Foundation Logo"
            className="w-20 h-20 rounded-full mx-auto mb-6 shadow-2xl ring-4 ring-yellow-400/40"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-yellow-300 text-lg">
            Illuminate Your Future
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div 
            className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Sign In Form */}
        <motion.form className="space-y-6" onSubmit={handleSubmit} variants={fadeInUp}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-emerald-100 mb-2">
              Email Address
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-yellow-400/30 bg-emerald-800/50 text-white placeholder-emerald-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-200"
              placeholder="Enter your email"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-emerald-100 mb-2">
              Password
            </label>
            <motion.input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-yellow-400/30 bg-emerald-800/50 text-white placeholder-emerald-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-200"
              placeholder="Enter your password"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link 
              to="/forgot-password"
              className="text-yellow-300 hover:text-yellow-200 text-sm transition-colors duration-200"
            >
              Forgot your password?
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 border border-transparent rounded-lg font-medium text-lg transition-all duration-300 ${
              loading
                ? 'bg-emerald-600 text-emerald-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-emerald-900 hover:shadow-lg transform hover:-translate-y-1'
            }`}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div className="relative" variants={fadeInUp}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-emerald-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-emerald-900 text-emerald-300">Or continue with</span>
          </div>
        </motion.div>

        {/* Google Sign In Button */}
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3 px-4 border-2 border-emerald-600 bg-emerald-800 text-white rounded-lg font-medium text-lg hover:bg-emerald-700 hover:border-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign In with Google</span>
          </div>
        </motion.button>

        {/* Sign Up Link */}
        <motion.div className="text-center" variants={fadeInUp}>
          <p className="text-emerald-100">
            Don't have an account?{' '}
            <Link 
              to="/signup"
              className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
