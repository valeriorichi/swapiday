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
        uri: home.imageUrl,
      }}
      style={{ width: 350, height: 200 }}
    />
  );
};

const Location = () => {
  const home = useHomeContext();
  return (
    <Text style={{ marginLeft: 15 }} className="text-green-600">
      {home.houseLocation}
    </Text>
  );
};

const Rating = () => {
  const home = useHomeContext();
  return (
    <View className="flex flex-row gap-1">
      <Image
        source={require("../assets/star.png")}
        style={{ width: 16, height: 16 }}
      />
      <Text style={{ marginRight: 15 }} className="text-green-600">
        {home.rating}
      </Text>
    </View>
  );
};

const CommentCount = () => {
  const home = useHomeContext();
  return (
    <Text
      style={{ marginRight: 15 }}
      className="text-green-600"
    >{`${home.commentsCount} reviews`}</Text>
  );
};

const HomeTypeAndBedrooms = () => {
  const home = useHomeContext();
  return (
    <Text style={{ marginLeft: 15 }} className="text-green-600">
      {home.typeAndBedrooms}
    </Text>
  );
};

HomeCard.Info = Info;
HomeCard.Image = HomeImage;
HomeCard.Location = Location;
HomeCard.Rating = Rating;
HomeCard.CommentCount = CommentCount;
HomeCard.HomeTypeAndBedrooms = HomeTypeAndBedrooms;

export default HomeCard;
