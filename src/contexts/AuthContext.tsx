import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  isOpen : boolean;
  login: (username: string, keepLogin: string, jwt : string) => void;
  logout: () => void;
  changeIsOpen: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || sessionStorage.getItem("username") || "";
    setUsername(storedUsername);
    setIsAuthenticated(!!storedUsername);
  }, []);

  const login = (username: string, keepLogin: string, jwt : string) => {
    if (keepLogin === "true") {
      localStorage.setItem("username", username);
      localStorage.setItem("jwt", jwt);
    } else {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("jwt", jwt);
    }
    setUsername(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("jwt");
    setUsername("");
    setIsAuthenticated(false);
  };

  const changeIsOpen = () => { setIsOpen(!isOpen) };
  return (
      <AuthContext.Provider value={{ isAuthenticated, username, login, logout, isOpen, changeIsOpen }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
