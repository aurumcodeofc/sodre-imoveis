import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Interface para a role do usuário
interface Role {
  id: string;
  role: string;
}

// Interface para os dados de login retornados pela API
interface LoginData {
  token: string;
  roles: Role[];
  first_access: boolean;
}

// Interface para os dados do usuário
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

// Interface do contexto de autenticação
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  firstAccess: boolean;
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firstAccess, setFirstAccess] = useState<boolean>(false);

  const navigate = useNavigate();

  // Função para buscar o perfil do usuário logado
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

  // Verificar token no localStorage ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserSession(token);
      const storedFirstAccess = localStorage.getItem("first_access") === "true";
      setFirstAccess(storedFirstAccess);
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  // Função de login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<LoginData>(
        "https://sodre-imoveis-production.up.railway.app/sessions",
        { email, password }
      );

      const { token, first_access } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("first_access", String(first_access));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setFirstAccess(first_access);
      await fetchUserSession(token);

      // Redireciona com base no first_access
      if (first_access) {
        navigate("/primeiro-acesso");
      } else {
        navigate("/inicio");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error?.response?.data?.message || "Falha ao realizar login");
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("first_access");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    setFirstAccess(false);
    navigate("/login");
  };

  // Carregando enquanto verifica a sessão
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading, firstAccess }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
