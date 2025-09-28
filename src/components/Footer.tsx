import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const Footer: React.FC = () => {
  
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

  return (
    <footer className="bg-emerald-950 border-t border-emerald-800 relative overflow-hidden w-full m-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Logo and Copyright */}
          <motion.div 
            className="flex items-center space-x-4 mb-6 md:mb-0"
            variants={fadeInUp}
          >
            <motion.img
              src="/image/logo.jpg"
              alt="Shuaq Foundation Logo"
              className="w-10 h-10 rounded-full object-cover shadow-lg ring-2 ring-yellow-400/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
            <div>
              <h3 className="text-lg font-bold text-white">Shuaq Foundation</h3>
              <p className="text-sm text-emerald-300">
                © 2025 Shuaq Foundation. All Rights Reserved.
              </p>
            </div>
          </motion.div>

          {/* Social Media Links */}
          
        </motion.div>

        {/* Additional Footer Info */}
        <motion.div 
          className="mt-8 pt-8 border-t border-emerald-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center text-sm text-emerald-300"
            variants={fadeInUp}
          >
            <motion.p
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Where light dispels the darkness
            </motion.p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-200"
                  whileHover={{ scale: 1.05, y: -1 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};