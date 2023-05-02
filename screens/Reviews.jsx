import React from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import CommentsList from "./CommentsList";

// currently not rendering anywhere, will need to render through the userProfile page when it's ready

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
        <Text style={{ marginLeft: 10, marginRight: 50 }}>Cleanliness</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.8}
            color="#7bd060"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text style={{ marginRight: 50 }}>4.0</Text>
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
        <Text style={{ marginLeft: 10, marginRight: 50 }}>Accuracy</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.6}
            color="#7bd060"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text style={{ marginRight: 50 }}>3.0</Text>
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
        <Text style={{ marginLeft: 10, marginRight: 50 }}>Location</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.9}
            color="#7bd060"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text style={{ marginRight: 50 }}>4.5</Text>
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
        <Text style={{ marginLeft: 10, marginRight: 50 }}>Check-in</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.7}
            color="#7bd060"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text style={{ marginRight: 50 }}>3.5</Text>
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
        <Text style={{ marginLeft: 10, marginRight: 50 }}>Communication</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.8}
            color="#7bd060"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text style={{ marginRight: 50 }}>4.0</Text>
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
        <Text style={{ marginLeft: 10, marginRight: 50 }}>Value</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ProgressBar
            progress={0.9}
            color="#7bd060"
            style={{ height: 10, width: 100, marginRight: 10 }}
          />
          <Text style={{ marginRight: 50 }}>4.5</Text>
        </View>
      </View>
      <CommentsList />
    </View>
  );
};

export default Reviews;
