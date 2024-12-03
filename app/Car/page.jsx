'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '@/components/common/Alert';
import { set } from 'date-fns';
import Link from 'next/link';

// Modal Component
const Modal = ({ isOpen, onClose, car, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateFrom: '',
    dateTo: '',
    pickUpTime: '',
    returnTime: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex text-black justify-center items-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{`Reserve ${car.name}`}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 overflow-y-auto">
            <div>
              <label className="block font-bold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+33 1 12 34 56 78"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Start Date</label>
              <input
                type="date"
                name="dateFrom"
                value={formData.dateFrom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">End Date</label>
              <input
                type="date"
                name="dateTo"
                value={formData.dateTo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Pick-up Time</label>
              <input
                type="time"
                name="pickUpTime"
                value={formData.pickUpTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Return Time</label>
              <input
                type="time"
                name="returnTime"
                value={formData.returnTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded-md"
            >
              Reserve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component for each car card
const CarCard = ({ car, onReserve }) => (
  <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden p-4 border-2 border-gray-200">
    <img src={car.image} alt={car.name} className="h-40 w-full object-cover border-2 border-gray-100 rounded-md shadow-lg" />
    <div className="mt-4 flex shadow-xl py-4 px-2 border-2 border-gray-100 rounded-md">
      <div className="w-1/2">
        <h3 className="font-bold text-lg text-orange-600 border-b-2 border-gray-200">{car.name}</h3>
        <p className="text-gray-600 font-bold">{car.price.toFixed(2).replace('.', ',')}€</p>
      </div>
      <div className="w-1/2 text-right">
        <button
          onClick={() => onReserve(car)}
          className="bg-orange-600 text-white p-2 rounded-md font-bold shadow-lg border-1 border-black"
        >
          Reserve
        </button>
      </div>
    </div>
  </div>
);

const AllCarsPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertRefresher, setAlertRefresher] = useState(false);
  // Fetch car data
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
  }, []);

  const handleReserve = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const handleSubmit = async (reservationData) => {
    console.log('Reservation data:', reservationData);
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
        body: JSON.stringify({
          ...reservationData,
          carModel: selectedCar.modele,  // Add selected car model to reservation data
          carType: selectedCar.marque,   // Add selected car type to reservation data
          name: selectedCar.name,        // Add selected car name to reservation data

        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setAlertMessage(`${selectedCar.name} reserved successfully!`);
      setAlertType('success');
      setAlertTitle('Reservation Successfull');
      setShowAlert(true);
      setAlertRefresher(true);
    } catch (error) {
      setAlertMessage('Error creating reservation:'+ error);
      setAlertType('error');
      setAlertTitle('Reservation Error');
      setShowAlert(true);
      setAlertRefresher(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-4 px-5">
      <div className="container mx-auto ">
        {/* Title */}
        <div className="flex text-center m-auto w-full bg-white rounded-md shadow-xl mb-10">
          <Link href="/" className='text-2xl font-bold text-center text-orange-600 p-4'>Home</Link>
        <h1 className="text-3xl m-auto font-bold text-center text-orange-600 ">Our Car Collection</h1>
        </div>
        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onReserve={handleReserve} />
          ))}
        </div>

        {/* Reservation Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal} car={selectedCar} onSubmit={handleSubmit} />
      </div>
      <Alert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        refresh={alertRefresher}
      />
    </div>
  );
};

export default AllCarsPage;
