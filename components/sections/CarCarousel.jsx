'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';



const CarCard = ({ car }) => (
  <div className="bg-white text-black shadow-xl rounded-lg overflow-hidden p-4 border-2 border-gray-200 ">
    <img src={car.image} alt={car.name} className="h-40 w-full object-cover border-2 border-gray-100 rounded-md shadow-lg" />
    <div className="mt-4 flex shadow-xl py-4 px-2 border-2 border-gray-100 rounded-md">
      <div className="w-1/2">
        <h3 className="font-bold text-lg text-orange-600 border-b-2 border-gray-200">{car.name}</h3>
        <p className="text-gray-600">{car.price} MAD</p>
      </div>
    </div>
  </div>
);

const CarCarousel = () => {
  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true); // State to track if at the start
  const [isAtEnd, setIsAtEnd] = useState(false);    // State to track if at the end

  const [cars, setCars] = useState([]);

const getData = async () => {
  try {
    const response = await axios.get('/api/cars');
    setCars(response.data);
  } catch (error) {
    console.error('Error inserting car:', error);
  }
};
useEffect(() => {
  getData();

  // Set up an interval to call getData every 5 minutes (300,000 milliseconds)
  const interval = setInterval(() => {
    getData();
  }, 300000); // 5 minutes in milliseconds

  // Clean up the interval when the component unmounts
  return () => clearInterval(interval);}
, []);
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
          className="flex overflow-hidden w-[900px] space-x-4 no-scrollbar p-6 rouned-md"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {cars.map((car) => (
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
