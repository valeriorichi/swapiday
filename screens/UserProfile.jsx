import { Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { LoginContext } from "../contexts/LoggedInContext";
import { database } from "../config/firebase";

import { collection, doc, setDoc, getDoc } from "firebase/firestore";

function UserProfile() {
  const { currentUser, setCurrentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getUserProfile(id) {
    const docRef = doc(database, "userProfilesV2", id);
    const docSnap = await getDoc(docRef);
    const results = docSnap.data();
    console.log(results);
    return results;
  }
  useEffect(() => {
    setIsLoading(true);
    getUserProfile("zzzzzzzzzzzzzzzzzzzy")
      .then((data) => {
        setIsLoading(false);
        setUserProfile(data);
      })
      .catch((e) => console.log(e));
  }, []);
  if (isLoading) {
    return (
      <>
        <ActivityIndicator />
      </>
    );
  }
  if (userProfile) {
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
              onPress={() => {
                setCurrentUser("");
                setIsLoggedIn(false);
              }}
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
              <Text>{userProfile.firstName + " " + userProfile.lastName}</Text>
              <Text>{userProfile.Location}</Text>
              <Text>{userProfile.Rating + " *"}</Text>
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
            <Text>{userProfile.Bio}</Text>
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
}

export default UserProfile;
