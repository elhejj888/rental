'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

// Sample car data
const carData = [
  { id: 1, name: 'Audi Q5', image: 'https://www.gtspeed.ma/storage/voitures/May2022/W1WMLUXfJkMPqtt0POds.jpeg', price: '250/day' },
  { id: 2, name: 'Peugeot 3008', image: 'https://visuel3d-secure.peugeot.com/V3DImage.ashx?client=CFGAP3D&mkt=AT&env=PROD&version=1PPDSYRJH7C0A0B0&ratio=1&format=jpg&quality=90&width=640&view=001&color=0MM00NDP&trim=0PW60RFX&opt1=ZHQM&back=0', price: '300/day' },
  { id: 3, name: 'Citroen C4', image: 'https://visuel3d-secure.citroen.com/V3DImage.ashx?client=DI1&version=1CLEA5HMK1EEA020&color=0MM00N9V&width=360&ratio=1&view=001&format=jpg&quality=90', price: '350/day' },
  { id: 4, name: 'Dacia Sandero', image: 'https://dacia.renaultmotors.be/wp-content/uploads/sites/79/2022/06/packshot-sandero-nbi.png', price: '200/day' },
  { id: 5, name: 'Fiat Tipo', image: 'https://staging-www.fiat.ma/content/dam/fiat/com/my23/tipo/colorizer/tipo-hb/gelato-white/Tipo-Sedan_680x430px-(1).png', price: '180/day' },
  { id: 6, name: 'Renault Megane 4', image: 'https://img.goodfon.com/wallpaper/big/5/d0/renault-estate-gt-line-worldwide.webp', price: '250/day' },

  // Add more cars if needed
];

const CarCard = ({ car }) => (
  <div className="min-w-[300px] bg-white shadow-lg rounded-lg overflow-hidden mx-4">
    <img src={car.image} alt={car.name} className="h-40 w-full object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg">{car.name}</h3>
      <p className="text-gray-600">{car.price}</p>
    </div>
  </div>
);

const CarCarousel = () => {
  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true); // State to track if at the start
  const [isAtEnd, setIsAtEnd] = useState(false);    // State to track if at the end

  // Auto-scroll the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isAtEnd) {
        carouselRef.current.scrollBy({
          left: 300, // Adjust the scroll distance
          behavior: 'smooth',
        });
      }
    }, 5000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isAtEnd]);

  // Update state based on scroll position
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  // Scroll the carousel manually
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg py-10 mx-auto w-full">
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-black mb-8">Our Cars</h2>

      {/* Carousel */}
      <div className="flex justify-center">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex overflow-hidden w-[900px] space-x-4 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {carData.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>

      {/* Arrow Buttons */}
      {!isAtStart && (
        <button
          onClick={handlePrev}
          className="absolute left-[5%] top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
        >
          ←
        </button>
      )}

      {!isAtEnd && (
        <button
          onClick={handleNext}
          className="absolute right-[5%] top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
        >
          →
        </button>
      )}

      {/* Link to show all cars */}
      <div className="mt-8 text-center">
        <Link className="text-gray-600 font-bold hover:underline" href="/Car">
          Show All Cars
        </Link>
      </div>
    </div>
  );
};

export default CarCarousel;
