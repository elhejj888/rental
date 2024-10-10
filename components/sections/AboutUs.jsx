'use client';

const AboutUs = () => {
  return (
    <section id="about" className="p-8 bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center w-full md:w-4/5 lg:w-3/4 mx-auto space-y-8 md:space-y-0 md:space-x-8">
      <div className="md:w-1/3">
        <img
          src="/logoMs.png"
          alt="About Us"
          className="rounded-lg shadow-md w-full"
        />
      </div>
      <div className="md:w-2/3">
        <h2 className="text-3xl mb-4 text-yellow-600 font-bold shadow-lg border-b-2 border-b-yellow-600 text-center md:text-left">About Us</h2>
        <p className="text-gray-700 mb-4">
  We are a forward-thinking company dedicated to transforming the car rental industry through the use of cutting-edge technology. Our aim is to provide secure, efficient, and reliable rental solutions that meet the evolving needs of our customers in the digital age.
</p>
<p className="text-gray-700">
  With a team of experienced professionals, we strive to offer top-tier services that are both accessible and trustworthy. Whether you&#39;re renting for personal use or business travel, we are here to ensure a seamless experience every step of the way.
</p>
      </div>
    </section>
  );
};

export default AboutUs;