'use client';

import React, { useState } from 'react';

// Sample car data (same as the carousel)
const carData = [
  { id: 1, name: 'Audi Q5', image: 'https://pictures.dealer.com/generic-aoa-OEM_VIN_STOCK_PHOTOS/04580481b4952f0ea1f32d48f3844e75.jpg?impolicy=downsize_bkpt&imdensity=1&w=520', price: '250/day' },
  { id: 2, name: 'Peugeot 3008', image: 'https://visuel3d-secure.peugeot.com/V3DImage.ashx?client=CFGAP3D&mkt=AT&env=PROD&version=1PPDSYRJH7C0A0B0&ratio=1&format=jpg&quality=90&width=640&view=001&color=0MM00NDP&trim=0PW60RFX&opt1=ZHQM&back=0', price: '300/day' },
  { id: 3, name: 'Citroen C4', image: 'https://visuel3d-secure.citroen.com/V3DImage.ashx?client=DI1&version=1CLEA5HMK1EEA020&color=0MM00N9V&width=360&ratio=1&view=001&format=jpg&quality=90', price: '350/day' },
  { id: 4, name: 'Dacia Sandero Automatique', image: 'https://dacia.renaultmotors.be/wp-content/uploads/sites/79/2022/06/packshot-sandero-nbi.png', price: '200/day' },
  { id: 5, name: 'Fiat Tipo', image: 'https://staging-www.fiat.ma/content/dam/fiat/com/my23/tipo/colorizer/tipo-hb/gelato-white/Tipo-Sedan_680x430px-(1).png', price: '180/day' },
  { id: 6, name: 'Renault Megane 4', image: 'https://img.goodfon.com/wallpaper/big/5/d0/renault-estate-gt-line-worldwide.webp', price: '250/day' },
];

// Modal Component
const Modal = ({ isOpen, onClose, car, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Trigger the reserve action
    onClose();  // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex text-black justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">{`Reserve ${car.name}`}</h2>
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-bold mb-2">First Name</label>
              <input type="text" placeholder='John' className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Last Name</label>
              <input type="text" placeholder='Doe' className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Phone Number</label>
              <input type="text" placeholder='+33 1 12 34 56 78' className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Email Address</label>
              <input type="email" placeholder='example@mail.com' className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-bold mb-2">Start Date</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block font-bold mb-2">End Date</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Pick-up Time</label>
              <input type="time" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block font-bold mb-2">Return Time</label>
              <input type="time" className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2">Cancel</button>
            <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-md">Reserve</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component for each car card
const CarCard = ({ car, onReserve }) => (
  <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden p-4">
    <img src={car.image} alt={car.name} className="h-40 w-full object-cover rounded-md" />
    <div className="mt-4 flex">
      <div className="w-1/2">
        <h3 className="font-bold text-lg">{car.name}</h3>
        <p className="text-gray-600">{car.price}</p>
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

  const handleReserve = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const handleSubmit = () => {
    alert(`Reserved ${selectedCar.name} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="container mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Car Collection</h1>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {carData.map((car) => (
            <CarCard key={car.id} car={car} onReserve={handleReserve} />
          ))}
        </div>

        {/* Reservation Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal} car={selectedCar} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AllCarsPage;
