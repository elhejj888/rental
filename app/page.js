'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import ContactUs from '../components/sections/ContactUs';
import Mission from '../components/sections/Mission';
import AboutUs from '../components/sections/AboutUs';
import Questions from '../components/sections/Questions';
import Reviews from '../components/sections/Reviews';
import Footer from '../components/layout/Footer';
import CarouselComponent from '../components/sections/Carousel';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import CarCarousel from '../components/sections/CarCarousel';
import CarouselCar from '../components/sections/CarouselCar';
import Image from "next/image";
import '../app/globals.css';


const SectionWrapper = ({ children, id }) => {
  const [setRef, inView] = useIntersectionObserver({
    threshold: 0.1,
  });

  

  return (
    <section
      ref={setRef}
      id={id}
      className={`transition-opacity duration-1000 ease-in-out ${
        inView ? 'opacity-100' : 'opacity-0'
      } max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8`} // Added responsiveness
    >
      {children}
    </section>
  );
};

const Home = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const carouselHeight = document.getElementById('carousel').clientHeight;
      if (window.scrollY > carouselHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='scroll-smooth bg-white'>
      {showNavbar && <Navbar />}
      <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <div id="carousel">
          <CarouselComponent />
        </div>
        <main className="flex-grow p-4 space-y-12">
          <SectionWrapper id="mission">
            <Mission />
          </SectionWrapper>
          {/* <SectionWrapper id="car-carousel">
            <CarCarousel />
          </SectionWrapper> */}
          <SectionWrapper id="car-carousel">
            <CarouselCar />
          </SectionWrapper>
          <SectionWrapper id="about-us">
            <AboutUs />
          </SectionWrapper>
          <SectionWrapper id="services">
            <Services />
          </SectionWrapper>
          <SectionWrapper id="questions">
            <Questions />
          </SectionWrapper>
          <SectionWrapper id="reviews">
            <Reviews />
          </SectionWrapper>
          <SectionWrapper id="testimonials">
            <Testimonials />
          </SectionWrapper>
          <SectionWrapper id="contact-us">
            <ContactUs />
          </SectionWrapper>
        </main>
        <Footer />
      </div>
      <a
        href="https://wa.me/+212663635296?text=hi,%20can%20i%20have%20more%20information%20about%20renting%20cars%20please" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600"
        style={{ zIndex: 1000 }}
      >
        <Image
          src="/images/whatsap.png" // Replace with the path to your WhatsApp icon
          alt="WhatsApp"
          width={45}
          height={45}
        />
      </a>
    </div>
  );
}
export default Home;
