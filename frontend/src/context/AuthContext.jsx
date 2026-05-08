"use client";

import { createContext, useState } from "react";
import { getCurrentUserRequest, loginRequest, registerRequest } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const rawUser = localStorage.getItem("auth_user");
    return rawUser ? JSON.parse(rawUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const persistUser = (authData) => {
    localStorage.setItem("auth_user", JSON.stringify(authData));
    setUser(authData);
  };

  const register = async (payload) => {
    setIsLoading(true);
    try {
      const result = await registerRequest(payload);
      persistUser(result.data);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (payload) => {
    setIsLoading(true);
    try {
      const result = await loginRequest(payload);
      persistUser(result.data);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (!user?.token) return null;
    const result = await getCurrentUserRequest();
    return result.data;
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user?.token),
        isLoading,
        register,
        login,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
