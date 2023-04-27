import { User } from "firebase/auth";
import React, { useContext, createContext, useState } from "react";

const AuthContext = React.createContext<User | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}
