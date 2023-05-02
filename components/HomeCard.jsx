import { Text, View } from "react-native";
import React, { createContext, useContext } from "react";

const HomeContext = createContext(null);

const useHomeContext = () => {
  const conext = useContext(HomeContext);
  if (!context) {
    throw new Error("HomeCard.* component must be a child of HomeCard");
  }
  return context;
};

const HomeCard = ({ home, children }) => {
  return (
    <HomeContext.Provider value={{ home }}>
      <View>{children}</View>
    </HomeContext.Provider>
  );
};

const HomeInfo = ({ children }) => {
  return <View>{children}</View>;
};

const HomeImage = ({ image }) => {};

export default HomeCard;
