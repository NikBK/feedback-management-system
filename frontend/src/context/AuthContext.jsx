import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

console.log('authcontext');

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  console.log('user of authProvider', user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userInfo = token ? JSON.parse(atob(token.split('.')[1])) : null;
    if (userInfo) setUser(userInfo);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const userInfo = JSON.parse(atob(token.split('.')[1]));
    setUser(userInfo);
    navigate('/admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
