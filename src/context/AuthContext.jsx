// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const storedUser = localStorage.getItem('atelier_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login for now
    const newUser = { email, name: email.split('@')[0], avatar: null };
    setUser(newUser);
    localStorage.setItem('atelier_user', JSON.stringify(newUser));
    return true;
  };

  const signup = (userData) => {
    // Simulate signup
    const newUser = { ...userData, avatar: null };
    setUser(newUser);
    localStorage.setItem('atelier_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('atelier_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
