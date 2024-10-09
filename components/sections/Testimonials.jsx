'use client';

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Emily Davis',
      text: 'The car rental experience was seamless and hassle-free. The vehicle was in great condition and the service was excellent.',
      img: 'https://i.pravatar.cc/150?img=7',
    },
    {
      id: 2,
      name: 'Michael Brown',
      text: 'Very professional and accommodating. The team made sure everything was perfect for my trip.',
      img: 'https://i.pravatar.cc/150?img=8',
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      text: 'Exceptional service and great value. The entire process was smooth from start to finish.',
      img: 'https://i.pravatar.cc/150?img=9',
    },
    {
      id: 4,
      name: 'James Wilson',
      text: 'I was very satisfied with the rental service. The car was clean and the customer support was top-notch.',
      img: 'https://i.pravatar.cc/150?img=10',
    },
  ];

  return (
    <section id="testimonials" className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-6 text-orange-600 font-bold shadow-md border-b-2 border-b-orange-600 pb-2 text-center">Testimonials</h2>
      <Carousel showThumbs={false} infiniteLoop showStatus={false} showIndicators={false} showArrows={true} autoPlay interval={3000} stopOnHover>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col  items-center transition-transform hover:rotate-3 hover:scale-105 p-4 "
          >
            <div className="w-24 h-24 mb-4">
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="rounded-full object-cover w-full h-full shadow-lg"
              />
            </div>
            <h3 className="text-xl text-orange-600 mb-2">{testimonial.name}</h3>
            <p className="text-gray-700 text-center max-w-xl mx-auto">{testimonial.text}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonials;
