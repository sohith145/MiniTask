import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = user !== null;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();

        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    setUser(data.user);
    return data;
  };
  const updateProfile = async (updates) => {
    try {
      const data = await updateUserProfile(user._id, updates);

      setUser(data.User);

      return data;
    } catch (error) {
      console.error("update failed:", error);
     // throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
