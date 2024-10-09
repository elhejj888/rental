'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import ContactUs from '../../components/sections/ContactUs';
import Mission from '../../components/sections/Mission';
import AboutUs from '../../components/sections/AboutUs';
import Questions from '../../components/sections/Questions';
import Reviews from '../../components/sections/Reviews';
import CarCarousel from '@/components/sections/CarCarousel';
import Footer from '../../components/layout/Footer';
import CarouselComponent from '../../components/sections/Carousel';
import Services from '../../components/sections/Services';
import Testimonials from '../../components/sections/Testimonials';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import '../../app/globals.css';


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
      }`}
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
          <SectionWrapper id="about-us">
            <AboutUs />
          </SectionWrapper>
          <SectionWrapper id="CarCarousel">
            <CarCarousel />
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
    </div>
  );
}
export default Home;
