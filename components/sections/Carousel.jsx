import React, { useState } from 'react';
import Link from 'next/link';
import Alert from '../common/Alert';
import { useEffect } from 'react';

const HeroSection = () => {
  const [reservationData, setReservationData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    dateFrom: '',
    dateTo: '',
    carModel: '',
    carType: '',
    pickUpTime: '',
    returnTime: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertTitle, setAlertTitle] = useState('Success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowAlert(true);
      setAlertMessage('Reservation created successfully');
      setAlertType('success');
      setAlertTitle('Success');
      const reservation = await response.json();
      console.log('Reservation created:', reservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="scroll-smooth relative h-screen bg-[url('https://www.shutterstock.com/image-photo/cars-parked-row-on-outdoor-600nw-1378241768.jpg')] bg-cover">

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center text-center mt-[5%] z-10">
        <h1 className="text-4xl md:text-6xl text-white font-bold  mb-4">Welcome to Moussaid Cars Rental</h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Your trusted partner for Rental Cars services in Morocco.
        </p>
        <div className="space-x-4 mb-8">
          <Link href="/Car">
            <button className="bg-orange-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-orange-800 transition duration-300">
              Our Offers
            </button>
          </Link>
          <Link href="#contact-us">
            <button className="bg-white font-bold text-yellow-600 px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Car Reservation Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white  mx-8 bg-opacity-80 p-6 rounded-lg shadow-md space-y-4 w-full max-w-2xl max-h-[70vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reserve a Car</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={reservationData.name}
                onChange={handleChange}
                placeholder='John Doe'
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={reservationData.phoneNumber}
                onChange={handleChange}
                placeholder='+33 1 12 34 56 78'
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={reservationData.email}
                onChange={handleChange}
                placeholder='email@example.com'
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Date From</label>
              <input
                type="date"
                name="dateFrom"
                value={reservationData.dateFrom}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Date To</label>
              <input
                type="date"
                name="dateTo"
                value={reservationData.dateTo}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Car Type</label>
              <select
                name="carType"
                value={reservationData.carType}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="" disabled>Select Car Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Sports Car">Sports Car</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Car Model</label>
              <select
                name="carModel"
                value={reservationData.carModel}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="" disabled>Select Car Model</option>
                <option value="Model A">Model A</option>
                <option value="Model B">Model B</option>
                <option value="Model C">Model C</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Pick Up Time</label>
              <input
                type="time"
                name="pickUpTime"
                value={reservationData.pickUpTime}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Return Time</label>
              <input
                type="time"
                name="returnTime"
                value={reservationData.returnTime}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white font-bold w-full py-3 rounded-full shadow-md hover:bg-orange-800 transition duration-300"
          >
            Reserve Now
          </button>
        </form>
      </div>

      <Alert
        title={alertTitle}
        message={alertMessage}
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertType}
      />
    </div>
  );
};

export default HeroSection;