// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function RegisterPage() {
//   const router = useRouter();

//   // Form state
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [address, setAddress] = useState('');


//   // Loading and error states
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
  
//     try {
//       const response = await fetch('https://bookeventapi.onrender.com/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: username,    // Send "name" as expected by backend
//           email,
//           password,
//           phone,
//           location: address, // Send "location" as expected by backend
    
//         }),
//       });
  
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong!');
//       }
  
//       alert('Registration successful! Redirecting to login...');
//       router.push('/login');
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
//       <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
//       {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         {/* Username Field */}
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-gray-700">
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Enter your username"
//           />
//         </div>

//         {/* Email Field */}
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-gray-700">
//             Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Enter your email"
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-gray-700">
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Enter your password"
//           />
//         </div>

//         {/* Phone Field */}
//         <div className="mb-4">
//           <label htmlFor="phone" className="block text-gray-700">
//             Phone:
//           </label>
//           <input
//             type="text"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Enter your phone number"
//           />
//         </div>

//         {/* Address Field */}
//         <div className="mb-4">
//           <label htmlFor="address" className="block text-gray-700">
//             Address:
//           </label>
//           <input
//             type="text"
//             id="address"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Enter your address"
//           />
//         </div>
// {/*  */}

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-2 px-4 rounded text-white ${
//               isLoading
//                 ? 'bg-blue-300 cursor-not-allowed'
//                 : 'bg-blue-500 hover:bg-blue-600'
//             } transition-colors`}
//           >
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// app/register/page.tsx

'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://bookeventapi.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,    // Send "name" as expected by backend
          email,
          password,
          phone,
          location: address, // Send "location" as expected by backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      // If registration is successful, store the token and update auth state
      if (data.token) {
        sessionStorage.setItem('Token', data.token);
        login( data.role); // Update the context
        router.push('/dashboard');
      } else {
        alert('Registration successful! Redirecting to login...');
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your username"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700">
            Address:
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your address"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded text-white ${
              isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  );
}
