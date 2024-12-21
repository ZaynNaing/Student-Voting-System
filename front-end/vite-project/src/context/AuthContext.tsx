import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
    token: string | null;
  email: string | null;
  id: string | null;
  name: string | null;
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
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
    const { userId, userName } = response.data;
    setIsLoggedIn(true);
    setToken(response.data.token);
    setId(userId);
    setName(userName);
      setEmail(email);
  };
    
    

    const logout = () => {
        setIsLoggedIn(false);
      setToken(null);
      setEmail(null);
      setId(null);
      setName(null);
    };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, email, id, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
