'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import NavAdmin from '../../components/layout/navAdmin';

const CarsTable = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [newCar, setNewCar] = useState({
    name: '',
    image: '',
    marque: '',
    modele: '',
    year: null,
    price: null
  });

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/cars', newCar); // Replace with your API route
      setOpen(false);
      // Refresh cars list after insertion
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error inserting car:', error);
    }
  };

  // DataGrid columns
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'image', headerName: 'Image', width: 150 },
    { field: 'marque', headerName: 'Marque', width: 170 },
    { field: 'modele', headerName: 'Modele', width: 150 },
    { field: 'year', headerName: 'Year', width: 90 },
    { field: 'price', headerName: 'Price', width: 110 }
  ];

  return (
    <>
      <NavAdmin />
      <div className="bg-white shadow-lg text-black mt-2 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Cars List</h1>
          <button
            onClick={handleOpen}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Car
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="h-full">
            <DataGrid rows={cars} columns={columns} pageSize={5} />
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 text-black bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Add New Car</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCar.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Image</label>
                <input
                  type="text"
                  name="image"
                  value={newCar.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Marque</label>
                <input
                  type="text"
                  name="marque"
                  value={newCar.marque}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Modele</label>
                <input
                  type="text"
                  name="modele"
                  value={newCar.modele}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Year</label>
                <input
                  type="text"
                  name="year"
                  value={newCar.year}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="text"
                  name="price"
                  value={newCar.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CarsTable;
