'use client';

import { useState } from 'react';

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [

    {
      question: 'What do I need to rent a car?',
      answer: 'To rent a car, you generally need a valid driver’s license, a credit card for payment, and sometimes an additional form of ID. Some rental agencies may have specific requirements or age restrictions.'
    },
    {
      question: 'What is included in a car rental?',
      answer: 'A standard car rental typically includes the use of the vehicle, basic insurance coverage, and 24/7 roadside assistance. Additional options like GPS, child seats, and additional insurance can be added for an extra fee.'
    },
    {
      question: 'How are rental car prices determined?',
      answer: 'Rental car prices are determined based on factors such as the vehicle type, rental duration, location, and demand. Discounts and promotions may also affect the final price.'
    },
    {
      question: 'What should I do if I have a problem with my rental car?',
      answer: 'If you encounter any issues with your rental car, contact our customer service team immediately. We offer 24/7 support to resolve any problems, including vehicle replacement or roadside assistance if needed.'
    }
  ];

  return (
    <section id="questions" className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl mb-4 text-orange-600 shadow-md font-bold border-b-2 border-b-orange-600 pb-2 text-center">Answered Questions</h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full text-left p-4 text-xl text-orange-600"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </button>
            {activeIndex === index && (
              <div className="p-4 text-gray-700 bg-gray-100 rounded-lg shadow-md">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Questions;