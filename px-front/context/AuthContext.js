"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { logoutUser } from "@/lib/api-client";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = async () => {
      try {
        console.log("Restoring session...");
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
        console.log("Session restored:", res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    session();
  }, []);

  const login = async (credentialResponse) => {
    try {
      console.log("Google Credential Response:", credentialResponse);
      const credential = credentialResponse.credential;
      // Send the token to your backend for verification and user info retrieval
      const response = await api.post("/api/auth/google", {
        credential,
      });

      console.log("Login successful:", response.data);
      const userData = response.data.user;
      setUser(userData);
      // You can store the token in local storage or context for further use
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    await logoutUser();

    setUser(null); // clear context
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
