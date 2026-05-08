import React from 'react';
import Header from './components/Header';
import VideoSection from './components/VideoSection';
import PlanetList from './components/PlanetList';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <VideoSection />
      <PlanetList />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;