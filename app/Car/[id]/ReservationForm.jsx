'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

const ReservationForm = ({ carId, step, setStep }) => {
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    pickUpTime: '',
    returnTime: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    insurance: false,
    options: []
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOptionsChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      options: checked
        ? [...formData.options, value]
        : formData.options.filter(option => option !== value)
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const res = axios.post(`/api/reservations`, formData);
      console.log('Reservation created:', res.data);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  // Get today's date in the format YYYY-MM-DD for the minimum date
  const today = new Date().toISOString().split('T')[0];

  // Function to calculate minimum return date based on selected pick-up date
  const getMinReturnDate = () => {
    if (formData.dateFrom) {
      const pickUpDate = new Date(formData.dateFrom);
      pickUpDate.setDate(pickUpDate.getDate() + 1); // Make the return date at least one day after pick-up
      return pickUpDate.toISOString().split('T')[0];
    }
    return today;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <>
          <div>
            <label className="block font-medium">Pick-up Date</label>
            <input
              type="date"
              name="dateFrom"
              onChange={handleInputChange}
              value={formData.dateFrom}
              required
              min={today} // Today's date as the minimum value
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Return Date</label>
            <input
              type="date"
              name="dateTo"
              onChange={handleInputChange}
              value={formData.dateTo}
              required
              min={getMinReturnDate()} // Minimum date for return is one day after pick-up date
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Pick-up Time</label>
            <input
              type="time"
              name="pickUpTime"
              onChange={handleInputChange}
              value={formData.pickUpTime}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Return Time</label>
            <input
              type="time"
              name="returnTime"
              onChange={handleInputChange}
              value={formData.returnTime}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Pick-up Address</label>
            <input
              type="text"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              onChange={handleInputChange}
              value={formData.phoneNumber}
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Insurance</label>
            <input
              type="checkbox"
              name="insurance"
              checked={formData.insurance}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Include Insurance</span>
          </div>
          <div className="space-y-2">
            <label className="block font-medium">Car Options</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="options"
                value="automatic"
                checked={formData.options.includes('automatic')}
                onChange={handleOptionsChange}
                className="mr-2"
              />
              <span>Automatic Gear</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="options"
                value="gps"
                checked={formData.options.includes('gps')}
                onChange={handleOptionsChange}
                className="mr-2"
              />
              <span>GPS</span>
            </div>
          </div>
        </>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePreviousStep}
            className="bg-gray-300 text-white py-2 px-4 rounded"
          >
            Previous
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default ReservationForm;
