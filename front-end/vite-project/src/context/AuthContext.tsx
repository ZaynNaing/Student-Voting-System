import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
    token: string | null;
    email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await axios.post('https://student-policies.onrender.com/api/auth/login', { email, password });
      console.log(response)
      setIsLoggedIn(true);
      setToken(response.data.token);
      setEmail(email);
  };
    
    

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
    };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
