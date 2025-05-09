
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PresentationSlides from '@/components/PresentationSlides';

const PresentationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <PresentationSlides />
      </main>
      
      <Footer />
    </div>
  );
};

export default PresentationPage;
