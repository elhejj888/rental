import React, { use, useState } from 'react';
import Link from 'next/link';
import Alert from '../common/Alert';
import { useEffect } from 'react';
import { json } from 'react-router-dom';
import axios from 'axios';

const HeroSection = () => {
  const [cars, setCars] = useState([]);
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
  const [alertRefresher, setAlertRefresher] = useState(false);
  console.log(cars);
  console.log(cars);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateFrom = new Date(reservationData.dateFrom); // Parse the start date
  const dateTo = new Date(reservationData.dateTo);     // Parse the end date
  const today = new Date();                            // Get today's date
  
  // Check if the dates are valid before proceeding
  if (isNaN(dateFrom) || isNaN(dateTo) || dateFrom < today || dateTo < dateFrom) {

    setAlertMessage('Invalid date input , Please be Sure that the date is After Today and the end date is after the start date..!');
    setAlertType('alert');
    setAlertTitle('Reservation Error');
    setShowAlert(true);
    setAlertRefresher(false);
    return;
  }
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
      setAlertTitle('Reservation Successfull');
      setAlertRefresher(true);

      const reservation = await response.json();
      console.log('Reservation created:', reservation);
    } catch (error) {
      setAlertMessage('Error creating reservation:'+ error);
      setAlertType('error');
      setAlertTitle('Reservation Error');
      setShowAlert(true);
      setAlertRefresher(false);
    }
  };

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
              <label className="text-gray-700 font-semibold">Car Brand</label>
              <select
                name="carType"
                value={reservationData.carType}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="" disabled>Select Car Brand</option>

                {cars.map((car) => (
                  <option key={car.id} value={car.marque}>
                    {car.marque}
                  </option>
                ))}
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
                {cars.map((car) => (
                  <option key={car.id} value={car.modele}>
                    {car.modele}
                  </option>
                ))}
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
        refresh={alertRefresher}
      />
    </div>
  );
};

export default HeroSection;