import React from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";

const Reviews = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        4.82 | 11 Reviews
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Cleanliness</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.8}
            color="#007AFF"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text>4.0</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Accuracy</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.6}
            color="#007AFF"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text>3.0</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Location</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.9}
            color="#007AFF"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text>4.5</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Check-in</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.7}
            color="#007AFF"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text>3.5</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Communication</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.8}
            color="#007AFF"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text>4.0</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text>Value</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.9}
            color="#007AFF"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text>4.5</Text>
        </View>
      </View>
    </View>
  );
};

export default Reviews;
