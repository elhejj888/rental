'use client';

import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      text: 'Great experience renting a car! The process was smooth and the vehicle was in excellent condition.',
      img: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      text: 'The service was top-notch. Fast check-in and check-out, and the car was spotless.',
      img: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      text: 'Overall, a fantastic experience. Friendly staff and reliable cars.',
      img: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: 'Chris Lee',
      text: 'Highly recommend this rental agency. Great selection of vehicles and excellent customer service.',
      img: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      name: 'Alex Kim',
      text: 'Very pleased with the speed of service and the quality of the car. Will use again!',
      img: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 6,
      name: 'Taylor Brown',
      text: 'Good value for the money. The rental process was straightforward and the car met all my needs.',
      img: 'https://i.pravatar.cc/150?img=6',
    },
  ];

  return (
    <section id="reviews" className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-4 text-orange-600 font-bold shadow-md pb-2 border-b-2 border-b-orange-600 text-center">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105">
            <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full mb-4" />
            <h3 className="text-xl text-orange-600">{review.name}</h3>
            <p className="text-gray-700 text-center">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;