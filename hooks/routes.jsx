// routes.js
'use strict';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../app/Home'; // Example: Import your components/pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import UsersPage from '../pages/UsersPage';
import Document from '../pages/Document';
import Client from '../pages/Clients';
import Dashboard from '../pages/Dashboard';
import { SessionProvider } from 'next-auth/react';

const MainRoutes = () => {
    return (
      <SessionProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Document" element={<Document />} />
        <Route path="/Dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
      </SessionProvider>
    );
  };
  
  export default MainRoutes;