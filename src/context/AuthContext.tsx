'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  login: (role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: '',
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const token = sessionStorage.getItem('Token');
    const storedRole = sessionStorage.getItem('Role');
    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const login = (role: string) => {
    setIsAuthenticated(true);
    setRole(role);
    sessionStorage.setItem('Role', role);
    sessionStorage.setItem('Token', 'your-token');
  };

  const logout = () => {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('Role');
    setIsAuthenticated(false);
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
