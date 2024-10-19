'use client';

import { useState } from 'react';
import axios from 'axios';
import Alert from '../../components/common/Alert';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertRefresher, setAlertRefresher] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/message', formData);
      // You can reset the form or show a success message here
      setAlertMessage('Message sent successfully');
      setAlertType('success');
      setAlertTitle('Message Sent');
      setShowAlert(true);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    } catch (error) {
      setAlertMessage('Error sending message');
      setAlertType('alert');
      setAlertTitle('Message Error');
      setShowAlert(true);
    }
  };

  return (
    <section id="contact" className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-3xl mb-4 text-orange-600 shadow-md border-b-2 border-b-orange-600 pb-2 font-bold text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Phone Number:</label>
          <input
            type="tel" // Changed to 'tel' for better validation
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-orange-600 p-2 rounded font-bold text-white w-full hover:bg-orange-800 transition duration-300">Submit</button>
      </form>
      <Alert
        title={alertTitle}
        message={alertMessage}
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertType}
        refresh={false}
      />
    </section>
  );
};

export default ContactUs;
