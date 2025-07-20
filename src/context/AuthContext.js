
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // ✅ set user from token
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid token", err);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 1 });
    const decoded = jwtDecode(token);
    setUser(decoded); // ✅ set user on login
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null); // ✅ clear user
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
