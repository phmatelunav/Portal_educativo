import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StudentPortal from './components/StudentPortal';
import VirtualLab from './components/VirtualLab';
import ImpactWall from './components/ImpactWall';
import Footer from './components/Footer';

function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navigation />
      <main className="py-12">
        <HeroSection />
        <StudentPortal />
        <VirtualLab />
        <ImpactWall />
      </main>
      <Footer />
    </div>
  );
}

export default App;
