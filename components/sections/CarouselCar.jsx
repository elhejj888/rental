'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
const CarCard = ({ car }) => (
  <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
    {/* Image Section */}
    <img
      src={car.image}
      alt={car.name}
      className="h-48 w-full object-cover rounded-t-md"
    />

    {/* Details Section */}
    <div className="p-4 space-y-3">
      {/* Car Name & Price */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-orange-600">{car.name}</h3>
        <p className="text-gray-800 font-semibold text-lg">
          {car.price.toFixed(2)}€ / day
        </p>
      </div>

      {/* Additional Information */}
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-bold">Brand:</span> {car.marque}
        </p>
        <p>
          <span className="font-bold">Model:</span> {car.modele}
        </p>
        <p>
          <span className="font-bold">Year:</span> {car.year}
        </p>
        <p>
          <span className="font-bold">Availability:</span>{" "}
          {car.availability ? "Available" : "Booked"}
        </p>
      </div>

      {/* Reserve Button */}
      <Link
        href={`/Car/${car.id}`}
        className="block bg-orange-600 text-white text-center py-2 rounded-md font-semibold hover:bg-orange-800 transition-colors"
      >
        Reserve Now
      </Link>
    </div>
  </div>
);


const CarCarousel = () => {
  const [cars, setCars] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white shadow-lg rounded-lg py-10 mx-auto w-full">
      <h2 className="text-4xl font-bold text-center text-black mb-8">Our Cars</h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 lg:px-10"
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link className="text-gray-600 font-bold hover:underline" href="/Car">
          Show All Cars
        </Link>
      </div>
    </div>
  );
};

export default CarCarousel;
