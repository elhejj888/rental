'use client';

import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Alert from '@/components/common/Alert';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaHome, FaCar, FaExclamationCircle } from 'react-icons/fa';

// Component for each car card
const CarCard = ({ car }) => (
  <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
    <img
      src={car.image}
      alt={car.name}
      className="h-48 w-full object-cover rounded-t-md"
    />
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg text-orange-600">{car.name}</h3>
        <p className="text-gray-800 font-semibold text-lg">
          {car.price.toFixed(2)}€ / day
        </p>
      </div>
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
      <Link
        href={`/Car/${car.id}`}
        className="block bg-orange-600 text-white text-center py-2 rounded-md font-semibold hover:bg-orange-800 transition-colors"
      >
        Reserve Now
      </Link>
    </div>
  </div>
);

// Main Page Component
const AllCarsPageContent = () => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const getData = async () => {
    try {
      const dateFrom = searchParams.get('dateFrom');
      const dateTo = searchParams.get('dateTo');
      const pickUpAddress = searchParams.get('pickUpAddress');

      let url = '/api/cars';
      if (dateFrom || dateTo || pickUpAddress) {
        const params = new URLSearchParams();
        if (dateFrom) params.append('dateFrom', dateFrom);
        if (dateTo) params.append('dateTo', dateTo);
        if (pickUpAddress) params.append('pickUpAddress', pickUpAddress);

        url += `?${params.toString()}`;
      }

      const response = await axios.get(url);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-5">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-md shadow-xl p-4 mb-10">
          <Link
            href="/"
            className="text-2xl sm:text-3xl text-center font-bold text-orange-600 mt-4 sm:mt-0 flex items-center sm:text-left"
          >
            <FaHome className="text-3xl mr-2" /> Home
          </Link>
          <h1 className="text-3xl sm:text-4xl text-center font-bold text-orange-600 mt-4 sm:mt-0 flex items-center">
            <FaCar className="mr-2" /> Explore Our Fleet
          </h1>
        </div>
        {cars.length === 0 ? (
          <div className="text-center text-gray-600 font-bold opacity-75">
            <p className="text-4xl font-semibold mb-6 flex items-center justify-center">
              <FaExclamationCircle className="text-red-500 mr-2" /> No Cars
              Available
            </p>
            <p className="text-lg text-gray-500 mb-6">
              We&apos;re currently out of cars. Please check back later for
              availability.
            </p>
            <div className="flex justify-center items-center">
              <Image
                src="/images/car.png"
                alt="No Cars"
                className="h-64 w-64 object-contain mx-auto"
                width={400}
                height={400}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
      <Alert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
};

// Wrap with Suspense for CSR
const AllCarsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AllCarsPageContent />
  </Suspense>
);

export default AllCarsPage;
