'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import NavAdmin from '../../components/layout/navAdmin';
import Alert from '../../components/common/Alert';
import { set } from 'date-fns';

const CarsTable = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // State to control modal visibility
  const [isEdit, setIsEdit] = useState(false); // State to determine if edit mode
  const [selectedCarId, setSelectedCarId] = useState(null); // Store selected car ID
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to control alert visibility
  const [alertMessage, setAlertMessage] = useState(''); // Alert message
  const [alertType, setAlertType] = useState('success'); // Alert type
  const [alertRefresher, setAlertRefresher] = useState(false); // State to refresh alert
  const [alertTitle, setAlertTitle] = useState(''); // Alert title
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
  const handleOpen = (car = null) => {
    if (car) {
      setIsEdit(true);
      setSelectedCarId(car.id);
      setNewCar({
        name: car.name,
        image: car.image,
        marque: car.marque,
        modele: car.modele,
        year: car.year,
        price: car.price
      });
    } else {
      setIsEdit(false);
      setNewCar({
        name: '',
        image: '',
        marque: '',
        modele: '',
        year: null,
        price: null
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCarId(null);
    setIsEdit(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/api/cars/${selectedCarId}`, newCar);
      } else {
        await axios.post('/api/cars', newCar); // Replace with your API route
      }
      setAlertMessage(`Car ${isEdit ? 'updated' : 'added'} successfully`);
      setAlertType('success');
      setIsAlertOpen(true);
      setAlertRefresher(false);
      setAlertTitle('Car Editing');
      handleClose();
      // Refresh cars list after insertion/update
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error saving car:', error);
      setAlertMessage(`Failed to ${isEdit ? 'update' : 'add'} car`);
      setAlertType('alert');
      setIsAlertOpen(true);
      setAlertRefresher(false);
      setAlertTitle('Car Editing');

    }
  };

  // Handle delete car
  const handleDelete = async (carId) => {
    try {
      await axios.delete(`/api/cars/${carId}`);
      // Refresh cars list after deletion
      setAlertMessage('Car deleted successfully');
      setAlertType('success');
      setIsAlertOpen(true);
      setAlertRefresher(false);
      setAlertTitle('Car Deletion');
      const response = await axios.get('/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error deleting car:', error);
      setAlertMessage('Failed to delete car');
      setAlertType('alert');
      setIsAlertOpen(true);
      setAlertRefresher(false);
      setAlertTitle('Car Deletion');
    }
  };

  // DataGrid columns with action buttons
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'image', headerName: 'Image', width: 150 },
    { field: 'marque', headerName: 'Marque', width: 170 },
    { field: 'modele', headerName: 'Modele', width: 150 },
    { field: 'year', headerName: 'Year', width: 90 },
    { field: 'price', headerName: 'Price', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleOpen(params.row)}
            className="bg-yellow-500 text-white px-2 m-auto rounded hover:bg-yellow-700 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="bg-red-500 text-white px-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <NavAdmin />
      <div className="bg-white shadow-lg text-black mt-2 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Cars List</h1>
          <button
            onClick={() => handleOpen()}
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
            <h2 className="text-lg font-bold mb-4">
              {isEdit ? 'Edit Car' : 'Add New Car'}
            </h2>
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
      <Alert
            isOpen={isAlertOpen}
            message={alertMessage}
            type={alertType}
            refresh={alertRefresher}
            title={alertTitle}
            onClose={() => setIsAlertOpen(false)}
          />
    </>
  );
};

export default CarsTable;
