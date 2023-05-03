import { Text, View, Image } from "react-native";
import { Title } from "react-native-paper";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

function UserProfile() {
  const { currentUser, setCurrentUser } = useAuth();
  //still need to create logout button
  // console.log(currentUser.uid);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text>{currentUser.uid}</Text>
          <Button
            modeValue="contained"
            title="Logout"
            onPress={() => setCurrentUser("")}
          >
            Log out
          </Button>
        </View>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              marginRight: 70,
              width: "40%",
            }}
            mode="contained"
            buttonColor="#39C67F"
            onPress={() => console.log("Pressed")}
          >
            List My House
          </Button>
          <Button
            style={{
              width: "40%",
            }}
            mode="contained"
            buttonColor="#39C67F"
            onPress={() => console.log("Pressed")}
          >
            Edit Profile
          </Button>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={{ textAlign: "center" }}>
            <Image
              source={require("../imagesTemp/avatar.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>Name</Text>
            <Text>Location</Text>
            <Text>Rating</Text>
            <Button
              mode="contained"
              buttonColor="#39C67F"
              onPress={() => console.log("Pressed")}
            >
              Contact Me
            </Button>
          </View>
        </View>
        <View
          style={{
            width: "90%",
            height: 100,
            borderWidth: "2",
            borderRadius: 10,
          }}
        >
          <Text>Bio</Text>
        </View>
        <View>
          <Text>House Pictures</Text>
          <Image
            source={require("../imagesTemp/house.jpg")}
            style={{
              width: 370,
              height: 200,
            }}
          />
        </View>
        <View
          style={{
            width: "90%",
            height: 100,
            borderWidth: "2",
            borderRadius: 10,
          }}
        >
          <Text>Other Info</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default UserProfile;
