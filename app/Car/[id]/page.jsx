'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReservationForm from './ReservationForm';
import { FaDollarSign, FaCar, FaCog, FaMapMarkerAlt, FaRoute, FaCamera, FaSatelliteDish } from 'react-icons/fa'; // Importing icons

const CarDetailsPage = ({ params }) => {
  const [car, setCar] = useState(null);
  const [step, setStep] = useState(1);

  const router = useRouter();
  const { id } = params;

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCar();
  }, [id]);

  if (!car) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-96 shadow-xl">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">{car.name}</h1>
          <p className="text-xl">{car.marque} {car.modele} - {car.year}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Car Details (2/3 of the width) */}
          <div className="col-span-2 space-y-8">
            {/* Car Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Car Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaCar className="text-orange-600 mr-2" />
                  <span>{car.marque} {car.modele}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-calendar text-blue-600 mr-2"></i>
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="text-orange-600 mr-2" />
                  <span className="text-xl font-semibold">${car.price}/day</span>
                </div>
              </div>
            </div>

            {/* Car Additional Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4 ">Car Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaCog className="text-orange-600 mr-2" />
                  <span>{car.transmission} Transmission</span>
                </div>
                <div className="flex items-center">
                  <FaRoute className="text-orange-600 mr-2" />
                  <span>GPS: {car.gps ? 'Available' : 'Not Available'}</span>
                </div>
                <div className="flex items-center">
                  <FaCamera className="text-orange-600 mr-2" />
                  <span>Camera: {car.camera ? 'Available' : 'Not Available'}</span>
                </div>
                <div className="flex items-center">
                  <FaSatelliteDish className="text-orange-600 mr-2" />
                  <span>Satellite: {car.satellite ? 'Available' : 'Not Available'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-600">{car.description || 'No description available.'}</p>
            </div>

            {/* Delivery Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">How We Deliver</h3>
              <p className="text-gray-600">We offer free delivery for reservations of 3 days or more. Contact us for delivery locations and schedules.</p>
            </div>

            {/* Confidentiality Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Confidentiality</h3>
              <p className="text-gray-600">We respect your privacy. All personal data is handled according to our privacy policy.</p>
            </div>

            {/* Map */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-8">
              {/* Ideally, you would use an actual map here, such as Google Maps API */}
              <p className="text-center py-24 text-gray-600">Map showing our location.</p>
            </div>
          </div>

          {/* Right Column - Reservation Form (1/3 of the width on desktop, full width on mobile) */}
          <div className="col-span-1 sticky top-8 w-full ">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* Price Section */}
              <div className="flex items-center mb-4">

                <span className="text-2xl w-full text-right font-semibold text-orange-600">${car.price}/day</span>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Make a Reservation</h2>
              <ReservationForm carId={id} step={step} setStep={setStep} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
