'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle errors
  const [success, setSuccess] = useState(''); // State to handle success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    try {
      const res = await signIn('credentials', {
        redirect: false, // Prevent automatic redirects
        username,
        password,
      });

      if (res.error) {
        // Handle error from signIn
        setError(res.error); // Display the error
      } else {
        // Handle success from signIn
        setSuccess('Login successful!');
        console.log('Login success:', res); // Show success message or do other actions
        window.location.href = '/Reservations'; // Redirect to home page after successful sign-in
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('An error occurred during sign-in. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full m-auto items-center justify-center">
        <div className='flex flex-col justify-center items-center'>
        <h1 className="text-3xl text-center align-middle  bottom-0 mb-0">Sign In</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-1/4 m-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-1/4 mb-4"
        />
        </div>
    <div className="flex flex-col justify-center items-center">
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
        <button type="submit" className="px-4 py-2   text-white bg-blue-500 rounded-md">
          Sign In
        </button>
        </div>
      </form>
    </div>
  );
}
