import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col w-full m-0 p-0">
      <Navbar />
      <main className="flex-1 w-full m-0 p-0 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
