"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { googleLogin, restoreSession, logoutUser } from "@/lib/api-client";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = async () => {
      try {
        const res = await restoreSession();
        setUser(res.user);
      } catch (err) {
        setUser(null);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    session();
  }, []);

  const login = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      // Send the token to your backend for verification and user info retrieval
      const response = await googleLogin(credential);

      const userData = response.user;
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
