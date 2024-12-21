// app/dashboard/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the token from sessionStorage
    const storedToken = sessionStorage.getItem('Token');
    if (!storedToken) {
      // If no token found, redirect to login
      router.push('/login');
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const handleLogout = () => {
    // Remove the token from sessionStorage
    sessionStorage.removeItem('Token');
    // Redirect to login page
    router.push('/login');
  };

  if (!token) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome! You are logged in.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}