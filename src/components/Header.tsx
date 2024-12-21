'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">MyApp</h1>
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              {role === 'admin' ? (
                <Link href="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              ) : (
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              )}
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
              <Link href="/notifications" className="hover:underline">
                Notifications
              </Link>
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
