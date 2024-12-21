'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log('Form submitted'); // Debug: Log when the form is submitted
    setIsLoading(true);
    setError('');

    try {
      console.log('Sending login request with:', { email, password }); // Debug: Log the login request data

      const response = await fetch('https://bookeventapi.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Received response:', data); // Debug: Check the response data

      if (!response.ok) {
        const errorMessage = data?.message || 'Something went wrong!';
        console.log('Error message from server:', errorMessage); // Debug: Log the error message
        throw new Error(errorMessage);
      }

      if (data.token && data.role) {
        sessionStorage.setItem('Token', data.token);
        sessionStorage.setItem('Role', data.role);

        console.log('Login successful, role:', data.role); // Debug: Log the role after successful login
        console.log('Stored token:', data.token); // Debug: Check if the token is stored
        console.log('Stored role:', data.role); // Debug: Check if the role is stored

        login(data.role);

        if (data.role === 'admin') {
          console.log('Redirecting to admin dashboard'); // Debug: Log admin redirect
          router.push('/dashboard');
        } else {
          console.log('Redirecting to user page'); // Debug: Log user redirect
          router.push('/user');
        }
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error during login:', err); // Debug: Log the error during login
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded text-white bg-green-500 hover:bg-green-600"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
