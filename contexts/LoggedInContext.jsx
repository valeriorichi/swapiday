import { useContext, createContext, useState } from "react";

const LoggedInContext = createContext({});

export function useLoggedIn() {
  return useContext(LoggedInContext);
}

export function LoggedInProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
}
