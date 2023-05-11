import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button, ActivityIndicator } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";
import { LoginContext } from "../contexts/LoggedInContext";
import { ChatContext } from "../contexts/ChatContext";
import { database, storage } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import EditProfile from "../components/EditProfile";
import AddHome from "../components/AddHome";
import LogoHeader from "./LogoHeader";

function UserProfile({ navigation }) {
  const [profileImgUrl, setProfileImgUrl] = useState("");
  const { currentUser, setCurrentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [senderRecipient, setSenderRecipient] = useContext(ChatContext);
  const [addingHome, setAddingHome] = useState(false);

  async function getUserProfile(id) {
    const docRef = doc(database, "userProfilesV2", id);
    const docSnap = await getDoc(docRef);
    const results = docSnap.data();
    return results;
  }

  useEffect(() => {
    setIsLoading(true);
    const reference = ref(
      storage,
      `users/${currentUser.uid}/userImages/userImage.jpg`
    );

    getDownloadURL(reference)
      .then((url) => {
        setProfileImgUrl(url);
      })
      .then(() => {
        return getUserProfile(currentUser.uid);
      })
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

  if (isEditing) {
    return (
      <EditProfile
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        userProfile={userProfile}
      />
    );
  }

  if (addingHome) {
    return (
      <AddHome
        addingHome={addingHome}
        setAddingHome={setAddingHome}
        userProfile={userProfile}
      />
    );
  }

  if (userProfile) {
    return (
      <ScrollView>
        <LogoHeader />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Button></Button>
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
              onPress={() => setAddingHome(true)}
            >
              Add my home
            </Button>
            <Button
              style={{
                width: "40%",
              }}
              mode="contained"
              buttonColor="#39C67F"
              onPress={() => setIsEditing(true)}
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
                source={{ uri: profileImgUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  margin: 5,
                  right: 5,
                }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>{userProfile.firstName + " " + userProfile.lastName}</Text>
              <Text>{userProfile.location}</Text>

              {!userProfile.uid === currentUser.uid ? (
                <Button
                  mode="contained"
                  buttonColor="#39C67F"
                  onPress={() => {
                    setSenderRecipient(currentUser.email + userProfile);
                    navigation.navigate("Chat");
                  }}
                >
                  Contact Me
                </Button>
              ) : null}
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
            <Text style={{ padding: 5 }}>{userProfile.bio}</Text>
          </View>
          <View>
            <Text>House Pictures</Text>
            <Image
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/swapiday.appspot.com/o/users%2F3EL4Y4UWgaeq3vrsCcQXkPuD3XW2%2FhouseImages%2Fdata1_0.jpg?alt=media&token=425e6c81-eadf-408f-9c73-7888958e6a5e`,
              }}
              style={{
                width: 330,
                height: 200,
                padding: 5,
                margin: 5,
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
            <Text style={{ padding: 5 }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          <Button
            modeValue="contained"
            title="Logout"
            onPress={() => {
              setCurrentUser(null);
              setIsLoggedIn(false);
            }}
          >
            Log out
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});

export default UserProfile;
