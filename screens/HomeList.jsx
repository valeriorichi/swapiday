import { Text, View } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeCard from "../components/HomeCard";

const homeExample = {
  info: "wdnka",
  image:
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  location: "Paris, France",
  rating: "4.85",
  guests: {
    min: "1",
    max: "5",
  },
  bedrooms: "4",
  type: "flat",
};

function HomeList() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />
      <View className="flex flex-row justify-center">
        <HomeCard home={homeExample}>
          <HomeCard.Image />
          <HomeCard.Info>
            <HomeCard.Location />
            <HomeCard.Rating />
          </HomeCard.Info>
          <HomeCard.Info>
            <HomeCard.GuestCount />
          </HomeCard.Info>
          <HomeCard.Info>
            <HomeCard.HomeTypeAndBedrooms />
          </HomeCard.Info>
        </HomeCard>
      </View>
    </SafeAreaView>
  );
}

export default HomeList;
