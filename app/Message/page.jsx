'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import NavAdmin from '../../components/layout/navAdmin';

const MessagesTable = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/message');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);


  // DataGrid columns
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'full name', width: 150 },
    { field: 'phoneNumber', headerName: 'phone number', width: 150 },
    { field: 'email', headerName: 'Email', width: 170 },
    {
        field: 'date',
        headerName: 'date',
        width: 150,
        valueFormatter: (params) => {
            return params ? new Date(params).toLocaleString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
                minute: '2-digit',

            }) : '';
          }
      },
      { field: 'message', headerName: 'Message', width: 220 },
  ];

  return (
    <>
      <NavAdmin />
      <div className="bg-white shadow-lg text-black mt-2 p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Messages List</h1>

        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="h-full">
            <DataGrid rows={messages} columns={columns} pageSize={5} />
          </div>
        )}
      </div>
    </>
  );
};

export default MessagesTable;
