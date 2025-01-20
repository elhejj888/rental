'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Alert from '../common/Alert';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const HeroSection = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [reservationData, setReservationData] = useState({
    dateFrom: '',
    dateTo: '',
    pickUpAddress: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertTitle, setAlertTitle] = useState('Success');
  const [alertRefresher, setAlertRefresher] = useState(false);
  const whatsappMessage = "Hi, can I have more information about renting cars please?";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReservationData((prev) => {
      if (name === "dateFrom") {
        return { ...prev, dateFrom: value, dateTo: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { dateFrom, dateTo } = reservationData;
    const parsedDateFrom = new Date(dateFrom);
    const parsedDateTo = new Date(dateTo);
    const current = new Date();

    // Validation for date input
    if (
      isNaN(parsedDateFrom) ||
      isNaN(parsedDateTo) ||
      parsedDateFrom < current ||
      parsedDateTo < parsedDateFrom
    ) {
      setAlertMessage(
        'Invalid date input. Ensure the start date is after today and the end date is after the start date.'
      );
      setAlertType('alert');
      setAlertTitle('Date Validation Error');
      setShowAlert(true);
      setAlertRefresher(false);
      return;
    }

    router.push(`/Car?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchInitialData();

    const interval = setInterval(() => {
      fetchInitialData();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scroll-smooth relative h-screen bg-[url('https://www.shutterstock.com/image-photo/cars-parked-row-on-outdoor-600nw-1378241768.jpg')] bg-cover">
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 space-y-6">
    <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
      Welcome to Moussaid Cars Rental
    </h1>
    <p className="text-xl md:text-2xl text-white mb-8">
      Your trusted partner for Rental Cars services in Morocco.
    </p>

    <div className="space-x-4 mb-8 flex justify-center">
      <Link href="/Car">
        <button className="bg-orange-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-orange-800 transition duration-300">
          Our Offers
        </button>
      </Link>
      <Link href={`https://wa.me/+212663635296?text=${whatsappMessage}`} target="_blank">
        <button className="bg-white font-bold text-green-600 px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
          Whatsapp Message
        </button>
      </Link>
    </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white my-auto mx-8 bg-opacity-80 p-6 rounded-lg shadow-md space-y-4 w-full max-w-2xl max-h-[70vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Available Cars</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Date From</label>
              <input
                type="date"
                name="dateFrom"
                value={reservationData.dateFrom}
                min={today}
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
                min={reservationData.dateFrom || today}
                onChange={handleChange}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-semibold">Pick Up Address</label>
            <select
              name="pickUpAddress"
              value={reservationData.pickUpAddress}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="" disabled>Select a location</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Rabat">Rabat</option>
              <option value="Tanger">Tanger</option>
              <option value="Fez Aeroport">Fes Aeroport</option>
              <option value="Fes Agency">Fes Agency</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white font-bold w-full py-3 rounded-full shadow-md hover:bg-orange-800 transition duration-300"
          >
            Search Now
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
