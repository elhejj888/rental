'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data:session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while session is loading
    if(session && session.user) {
      router.push('/Dashboard');
    }
  }, [session, status, router]);

  const handleLogout = () => {
    // Handle logout logic here
    setIsModalOpen(false);
  };

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white p-4 shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center">
        <div className="text-2xl font-bold text-orange-600 shadow-sm">
            <a href="/">Moussaid <span className="text-sm">Cars Rental</span></a>
          </div>
        </div>

        {/* App Name (Center) */}
        <div className="hidden md:block">
          <div className="text-2xl font-bold text-orange-600 shadow-sm">
            <a href="/">Moussaid <span className="text-sm">Cars Rental</span></a>
          </div>
        </div>


        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-4">
          <Link href="#mission">
            <p className="text-gray-700 hover:text-emerald-600">Mission</p>
          </Link>
          <Link href="#about">
            <p className="text-gray-700 hover:text-emerald-600">About Us</p>
          </Link>
          <Link href="#questions">
            <p className="text-gray-700 hover:text-emerald-600">Questions</p>
          </Link>
          <Link href="#reviews">
            <p className="text-gray-700 hover:text-emerald-600">Reviews</p>
          </Link>
          <Link href="#contact">
            <p className="text-gray-700 hover:text-emerald-600">Contact Us</p>
          </Link>

        </div>

        {/* User Icon (Right) */}
        {false ? (
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a href="/profile" className="text-gray-700">
                <img
                  src='https://i.pravatar.cc/150?img=3'
                  alt="Profile"
                  className="w-10 h-10 rounded-full shadow-lg"
                />
              </a>
              <div className="flex flex-col">
                <a href="/profile" className="text-gray-700">
                  <span className="text-gray-700">John Doe</span>
                </a>
                <span className="text-xs text-gray-500">username: johnDoe</span>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 px-4 py-2 rounded-full hover:text-gray-900 transition duration-300"
              >
                <FontAwesomeIcon icon={faCog} size="lg" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Logout
                  </button>
                  <form action="/FillInfos">
                    <button
                      type="submit"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                    >
                      Settings
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 px-4 py-2 rounded-full hover:text-gray-900 transition duration-300"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white shadow-lg z-20">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <div className="flex flex-col items-center mt-16">
          <Link href="/Car">
            <p onClick={handleLinkClick} className="py-2 text-gray-700 hover:text-emerald-600">Reserve</p>
          </Link>
            <Link href="#mission">
              <p onClick={handleLinkClick} className="py-2 text-gray-700 hover:text-emerald-600">Mission</p>
            </Link>
            <Link href="#about">
              <p onClick={handleLinkClick} className="py-2 text-gray-700 hover:text-emerald-600">About Us</p>
            </Link>
            <Link href="#questions">
              <p onClick={handleLinkClick} className="py-2 text-gray-700 hover:text-emerald-600">Questions</p>
            </Link>
            <Link href="#reviews">
              <p onClick={handleLinkClick} className="py-2 text-gray-700 hover:text-emerald-600">Reviews</p>
            </Link>
            <Link href="#contact">
              <p onClick={handleLinkClick} className="py-2 text-gray-700 hover:text-emerald-600">Contact Us</p>
            </Link>

          </div>
        </div>
      )}

      {/* Logout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;