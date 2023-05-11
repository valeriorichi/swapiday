import React from "react";
import { View, Text, Button } from "react-native";
import { ProgressBar } from "react-native-paper";
import CommentsList from "./CommentsList";
import RateForm from "./RateForm";
import { useRoute } from "@react-navigation/native"; // added by Val

const Reviews = ({ navigation }) => {
  // const route = useRoute(); //added by Val
  // const { searchedUserUid } = route.params; //added by Val
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

      <View>
        <Button
          title="Rate this property"
          onPress={() => navigation.navigate("RateForm")}
        />
      </View>
      <CommentsList />
    </View>
  );
};

export default Reviews;
