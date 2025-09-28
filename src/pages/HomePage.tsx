import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const HomePage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Animation variants
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

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && isAgreed) {
      try {
        // Store email in Firebase Firestore
        await addDoc(collection(db, 'newsletter_subscribers'), {
          email: email,
          subscribedAt: serverTimestamp(),
          source: 'homepage_announcements'
        });
        
        console.log('Email stored successfully:', email);
        setIsSubscribed(true);
        setEmail('');
        setIsAgreed(false);
      } catch (error) {
        console.error('Error storing email:', error);
        // Still show success to user, but log the error
        setIsSubscribed(true);
        setEmail('');
        setIsAgreed(false);
      }
    }
  };

  const isFormValid = email.length > 0 && isAgreed;

  const navigationButtons = [
    { label: 'About Us', href: '#about-us' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Volunteer with us', href: '#volunteering' },
    { label: 'Announcements', href: '#announcements' },
    { label: 'Projects', href: '#projects' },
  ];

  return (
    <div className="min-h-screen bg-emerald-900 w-full m-0 p-0">
      {/* Hero Section with Navigation Buttons */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 w-full m-0">
        {/* Animated CSS Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900">
            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-yellow-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 z-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div 
            className="space-y-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Logo */}
            <motion.div 
              className="flex justify-center mb-8"
              variants={fadeInUp}
            >
              <motion.img
                src="/image/logo.jpg"
                alt="Shuaq Foundation Logo"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-2xl ring-4 ring-yellow-400/40"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-yellow-400 leading-tight"
              variants={fadeInUp}
            >
              Shuaq Foundation
            </motion.h1>

            {/* Tagline */}
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-emerald-100 max-w-4xl mx-auto leading-relaxed font-light"
              variants={fadeInUp}
            >
              Where light dispels the darkness
            </motion.p>
            
            {/* Join Our Mission Button */}
            <motion.div
              variants={fadeInUp}
              className="pt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="inline-flex items-center py-5 px-10 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-emerald-900 text-xl md:text-2xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-yellow-200/50"
                >
                  Join Our Mission
                  <motion.svg 
                    className="ml-3 w-7 h-7" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Navigation Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto pt-8"
              variants={fadeInUp}
            >
              {navigationButtons.map((button, index) => (
                <motion.button
                  key={button.label}
                  onClick={() => {
                    const element = document.getElementById(button.href.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-emerald-100 hover:text-white font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-emerald-600 hover:border-yellow-400"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  {button.label}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Decorative Element */}
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto rounded-full mt-16"
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 lg:py-32 relative w-full m-0">
        {/* SVG Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#065f46"></path>
          </svg>
        </div>

        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8">
              Who We Are
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div className="max-w-4xl mx-auto" variants={fadeInUp}>
            <p className="text-lg md:text-xl lg:text-2xl text-emerald-100 leading-relaxed text-center font-light">
              We are a grassroots community of educators, researchers, volunteers, and advocates 
              united by a shared commitment to education as a force for democratic renewal. Our work 
              is a calling to serve the common good. We serve conscious individuals—young and adult—who 
              are eager to dedicate their learning, energy, and talents to the wellbeing of people 
              and the planet.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-20 lg:py-32 bg-emerald-800 relative w-full m-0">
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8">
              Our Philosophy
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-8"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6">
                A Force for Transformation
              </h3>
              <p className="text-lg md:text-xl text-emerald-100 leading-relaxed font-light">
                We believe education is the most potent tool for advancing human dignity. We view 
                education not just for academic achievement, but as a fundamental process that 
                supports the life of every individual. It must be nurturing, inclusive, and 
                cultivate the skills and values necessary for democratic life.
              </p>
            </motion.div>
            
            {/* Right Column */}
            <motion.div className="space-y-6" variants={fadeInUp}>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6">
                Our Mission
              </h3>
              <p className="text-lg md:text-xl text-emerald-100 leading-relaxed font-light">
                Our aim is to develop effective, sustainable, and scalable solutions to educational 
                challenges in Kazakhstan and beyond. We believe democracy is not only a form of 
                governance but also a form of pedagogy—requiring dialogue, participation, and 
                mutual respect in every learning environment we help shape.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Volunteering Section */}
      <section id="volunteering" className="py-20 lg:py-32 relative w-full m-0">
        {/* SVG Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#065f46"></path>
          </svg>
        </div>

        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8">
              Join Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div className="max-w-4xl mx-auto text-center" variants={fadeInUp}>
            <p className="text-lg md:text-xl lg:text-2xl text-emerald-100 leading-relaxed font-light mb-12">
              Democracy cannot be purchased or imposed—it must be practiced. We cultivate a spirit 
              of service and invite every member of our community to contribute their time, talent, 
              and insight in service of the common good.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center py-4 px-8 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-emerald-900 text-lg md:text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
                <motion.svg 
                  className="ml-2 w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="py-20 lg:py-32 bg-emerald-800 w-full m-0">
        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8">
              Stay Informed
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 text-lg rounded-lg border-2 border-emerald-600 bg-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 transition-colors duration-200"
                    required
                  />
                </motion.div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isAgreed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 text-yellow-400 bg-emerald-700 border-emerald-600 rounded focus:ring-yellow-400 focus:ring-2"
                  />
                  <label htmlFor="agree" className="text-emerald-100 text-sm md:text-base leading-relaxed">
                    I agree to receive the latest news and updates from Shuaq Foundation.
                  </label>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full px-8 py-4 text-lg font-bold rounded-lg shadow-lg transition-all duration-300 ${
                    isFormValid
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-emerald-900 hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-emerald-600 text-emerald-300 cursor-not-allowed'
                  }`}
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                >
                  Subscribe
                </motion.button>
              </form>
            ) : (
              <motion.div 
                className="text-center space-y-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-yellow-400">Thank you for subscribing!</h3>
                <p className="text-emerald-100">You'll receive our latest updates and announcements.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32 relative w-full m-0">
        {/* SVG Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#065f46"></path>
          </svg>
        </div>

        <motion.div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-8">
              Our Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mx-auto mb-8"></div>
          </motion.div>
          
          <motion.div className="max-w-4xl mx-auto" variants={fadeInUp}>
            <motion.div
              className="bg-emerald-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-emerald-700 cursor-pointer"
              whileHover={{ 
                scale: 1.02, 
                borderColor: '#fbbf24',
                boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div className="text-center space-y-6">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-10 h-10 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-yellow-400">
                  Digital SAT Math Course
                </h3>
                
                <p className="text-lg md:text-xl text-emerald-100 leading-relaxed font-light">
                  An intensive, high-quality preparation course designed to equip students with the 
                  critical thinking and mathematical skills needed to excel on the Digital SAT.
                </p>
                
                <motion.a
                  href="#"
                  className="inline-flex items-center text-lg md:text-xl text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                >
                  Learn More
                  <motion.svg 
                    className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};