import { useContext, createContext, useState } from 'react';

export const LoginContext = createContext([null, () => {}]);

export const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  );
};
