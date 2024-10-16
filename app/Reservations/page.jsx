'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns'; // You can use date-fns or another library like moment.js
import NavAdmin from '../../components/layout/navAdmin';


const ReservationsTable = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/api/reservations');
                setReservations(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'phoneNumber', headerName: 'Telephone', width: 150},
        { field: 'email', headerName: 'Email', width: 170},
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'carType', headerName: 'Marque', width: 90 },
        { field: 'carModel', headerName: 'Modele', width: 110 },
        {
            field: 'dateFrom',
            headerName: 'Début',
            width: 150,
            valueFormatter: (params) => {
                console.log("dateTo:", params); // Debugging: check what value is being passed
                return params ? new Date(params).toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',

                }) : '';
              }
          },
          {
            field: 'dateTo',
            headerName: 'Fin',
            width: 150,
            valueFormatter: (params) => {
                console.log("dateTo:", params.value); // Debugging: check what value is being passed
                return params ? new Date(params).toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                 
                }) : '';
              }
          },
        { field: 'pickUpTime', headerName: 'Heure', width: 90},
        { field: 'returnTime', headerName: 'Retour', width: 90},
        
        
        // Add more columns as needed
    ];

    return (
        <>
        <NavAdmin />
        <div style={{ height: '100%', width: '100%' }} className='bg-white shadow-lg mt-2 p-4 '>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataGrid rows={reservations} columns={columns} pageSize={5} />
            )}
        </div>
        </>
    );
};

export default ReservationsTable;