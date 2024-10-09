'use client';

const ContactUs = () => {
  return (
    <section id="contact" className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-3xl mb-4 text-orange-600 shadow-md border-b-2 border-b-orange-600 pb-2 font-bold text-center">Contact Us</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Name:</label>
          <input type="text" name="name" className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Email:</label>
          <input type="email" name="email" className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600" />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Message:</label>
          <textarea name="message" className="w-full p-2 rounded bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"></textarea>
        </div>
        <button type="submit" className="bg-orange-600 p-2 rounded font-bold text-white w-full hover:bg-orange-800 transition duration-300">Submit</button>
      </form>
    </section>
  );
};

export default ContactUs;