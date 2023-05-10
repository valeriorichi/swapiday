import { Text, View, Image } from 'react-native';
import React, { createContext, useContext } from 'react';

const HomeContext = createContext(null);

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('HomeCard.* component must be a child of HomeCard');
  }
  return context;
};

const HomeCard = ({ home, children }) => {
  return (
    <HomeContext.Provider value={home}>
      <View className="border border-green-600 bg-gray-200 p-3 text-black rounded-lg">
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
      className="rounded-lg border border-green-600"
      source={{
        uri: home.imageUrl,
      }}
      style={{ width: 350, height: 200 }}
    />
  );
};

const Location = () => {
  const home = useHomeContext();
  return <Text className=" mt-1">{home.houseLocation}</Text>;
};

const Rating = () => {
  const home = useHomeContext();
  return (
    <View className="flex flex-row gap-1 mt-1">
      <Image
        source={require('../assets/star.png')}
        style={{ width: 16, height: 16 }}
      />
      <Text>{home.rating}</Text>
    </View>
  );
};

const CommentCount = () => {
  const home = useHomeContext();
  return <Text>{`${home.commentsCount} reviews`}</Text>;
};

const HomeTypeAndBedrooms = () => {
  const home = useHomeContext();
  return <Text>{home.typeAndBedrooms}</Text>;
};

HomeCard.Info = Info;
HomeCard.Image = HomeImage;
HomeCard.Location = Location;
HomeCard.Rating = Rating;
HomeCard.CommentCount = CommentCount;
HomeCard.HomeTypeAndBedrooms = HomeTypeAndBedrooms;

export default HomeCard;
