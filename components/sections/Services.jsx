'use client';

import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Personal Car Rentals',
      description: 'We offer convenient and budget-friendly car rentals for your personal trips, ensuring you drive with comfort and ease wherever you need to go.',
      icon: '🏎️',
    },
    {
      id: 2,
      title: 'Competitive Prices',
      description: 'Benefit from our competitive pricing, providing you with affordable rental options while maintaining excellent service and vehicle quality for every journey.',
      icon: '🏆',
    },
    {
      id: 3,
      title: 'Fast and Reliable Services',
      description: 'Count on our quick booking process and dependable service, ensuring your rental experience is smooth, hassle-free, and always on time.',
      icon: '👨🏻‍💻',
    },

  ];

  return (
    <section id="services" className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-4 text-orange-600 text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl text-orange-600 mb-2">{service.title}</h3>
            <p className="text-gray-700">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;