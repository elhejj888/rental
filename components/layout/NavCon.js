import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const NavCon = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const router = useRouter();


  // Static data for connected user (replace with dynamic data from backend later)
  const user = {
    username: 'john_doe',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', // Example avatar image URL
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  if (status === 'loading') {
    return (
        <div className="flex text-black justify-center items-center min-h-screen">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      );
  }

  if (!session || !session.user) {
    router.push('/Login');
    return null; // Return null to avoid rendering the rest of the component
  }

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/Login');
  };

  return (
    <nav className="bg-white text-black py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger menu icon for mobile */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Brand/logo section (replace with your logo or brand name) */}
        <div className="flex items-center">
          <a href="/" className="text-emerald-600 text-2xl font-semibold">
            NotaryChain
          </a>
        </div>

        {/* Navigation links for desktop */}
        <ul className="hidden md:flex space-x-6 mx-auto">
          <li>
            <a href="/Dashboard" className="hover:text-gray-300 transition duration-300">
              Overview
            </a>
          </li>
          <li>
            <a href="/Clients" className="hover:text-gray-300 transition duration-300">
              Clients
            </a>
          </li>
          <li>
            <a href="/Document" className="hover:text-gray-300 transition duration-300">
              Documents
            </a>
          </li>
        </ul>

        {/* User profile section for desktop */}
        <div className="relative flex items-center space-x-4">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          <div className='flex flex-col'>
          <span >{session.user.name}</span>
          <span className='text-gray-400 text-sm'>{session.user.email}</span>
          </div>
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="hidden md:block text-gray-700 rounded hover:bg-gray-300 transition duration-300"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
              </svg>
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <a href="/UsersPage" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Users
                </a>
                <a href="/Settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Settings
                </a>
                <button onClick={handleLogout} className="text-left block px-4 py-2 text-gray-800 w-full hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <a href="/Dashboard" className="hover:text-gray-300 transition duration-300">
                Overview
              </a>
            </li>
            <li>
              <a href="/Clients" className="hover:text-gray-300 transition duration-300">
                Clients
              </a>
            </li>
            <li>
              <a href="/Document" className="hover:text-gray-300 transition duration-300">
                Documents
              </a>
            </li>
            <li>
              <a href="/UsersPage" className="hover:text-gray-300 transition duration-300">
                Users
              </a>
            </li>
            <li>
              <a href="/Settings" className="hover:text-gray-300 transition duration-300">
                Settings
              </a>
            </li>
            <li>
              <a href="/Logout" className="hover:text-gray-300 transition duration-300">
                Dark Mode
              </a>
            </li>
            <li>
              <a href="/Logout" className="hover:text-gray-300 transition duration-300">
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavCon;