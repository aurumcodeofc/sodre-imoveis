/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface LoginData {
  token: string;
  roles: { id: string; role: string }[];
  first_access: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  mobile_phone: string;
  person_type: string;
  birth_date: string;
  created_at: string;
  updated_at: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    complement: string;
    district: string;
    addressNumber: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserSession = async (token: string) => {
    try {
      const response = await axios.get<User>(
        "https://sodre-imoveis-production.up.railway.app/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setUser(response.data);
        setUsersList((prevUsers) => [...prevUsers, response.data]);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Erro ao validar sessão:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);

      const existingUser = usersList.find((u) => u.id === token); 
      if (existingUser) {
        setUser(existingUser);
        setIsLoading(false);
      } else {
        fetchUserSession(token);
      }
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, [usersList]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginData>(
        "https://sodre-imoveis-production.up.railway.app/sessions",
        { email, password }
      );
  
      const { token, roles, first_access } = response.data;
  
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      setLoginData({ token, roles, first_access });
      setIsAuthenticated(true);
      fetchUserSession(token);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        console.error("Erro no login:", error);
        throw new Error("Falha ao realizar login");
      }
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setLoginData(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
