import { Text, View, Image } from "react-native";
import React, { createContext, useContext } from "react";

const HomeContext = createContext(null);

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("HomeCard.* component must be a child of HomeCard");
  }
  return context;
};

const HomeCard = ({ home, children }) => {
  return (
    <HomeContext.Provider value={home}>
      <View className="border border-green-600 p-3 text-green-600 rounded-lg">
        {children}
      </View>
    </HomeContext.Provider>
  );
};

const Info = ({ children }) => {
  return <View className="flex flex-row justify-between">{children}</View>;
};

const HomeImage = () => {
  const home = useHomeContext();
  return (
    <Image
      source={{
        uri: home.image,
      }}
      style={{ width: 350, height: 200 }}
    />
  );
};

const Location = () => {
  const home = useHomeContext();
  return <Text className="text-green-600">{home.location}</Text>;
};

const Rating = () => {
  const home = useHomeContext();
  return (
    <View className="flex flex-row gap-1">
      <Image
        source={require("../assets/star.png")}
        style={{ width: 16, height: 16 }}
      />
      <Text className="text-green-600">{home.rating}</Text>
    </View>
  );
};

const GuestCount = () => {
  const home = useHomeContext();
  return (
    <Text className="text-green-600">{`${home.guests.min} - ${home.guests.max} Guests`}</Text>
  );
};

const HomeTypeAndBedrooms = () => {
  const home = useHomeContext();
  return (
    <Text className="text-green-600">{`${home.bedrooms} bedroom ${home.type}`}</Text>
  );
};

HomeCard.Info = Info;
HomeCard.Image = HomeImage;
HomeCard.Location = Location;
HomeCard.Rating = Rating;
HomeCard.GuestCount = GuestCount;
HomeCard.HomeTypeAndBedrooms = HomeTypeAndBedrooms;

export default HomeCard;
