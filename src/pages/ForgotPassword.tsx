import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      setIsSent(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
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

  if (isSent) {
    return (
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-md w-full space-y-8 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <motion.div
              className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <svg className="w-8 h-8 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Check Your Email
            </h2>

            <p className="text-emerald-100 text-lg mb-8">
              We've sent a password reset link to <strong>{email}</strong>
            </p>

            <Link
              to="/signin"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-emerald-900 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 transition-all duration-200"
            >
              Back to Sign In
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-900 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="text-center" variants={fadeInUp}>
          <motion.img
            src="/image/logo.jpg"
            alt="Shuaq Foundation Logo"
            className="w-20 h-20 rounded-full mx-auto mb-6 shadow-2xl ring-4 ring-yellow-400/40"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
          <h2 className="text-3xl font-bold text-white mb-2">
            Reset Password
          </h2>
          <p className="text-yellow-300 text-lg">
            Illuminate Your Future
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} variants={fadeInUp}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-yellow-400/30 bg-emerald-800/50 text-white placeholder-emerald-300 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors duration-200"
              placeholder="Enter your email"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 border border-transparent rounded-lg font-medium text-lg transition-all duration-300 ${
              isLoading
                ? 'bg-emerald-600 text-emerald-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-emerald-900 hover:shadow-lg transform hover:-translate-y-1'
            }`}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </motion.button>
        </motion.form>

        <motion.div className="text-center" variants={fadeInUp}>
          <p className="text-emerald-100">
            Remember your password?{' '}
            <Link
              to="/signin"
              className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}; 