import { Text, View, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { LoginContext } from '../contexts/LoggedInContext';
import { database } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import EditProfile from '../components/EditProfile';

function UserProfile() {
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const { currentUser, setCurrentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  async function getUserProfile(id) {
    const docRef = doc(database, 'userProfilesV2', id);
    const docSnap = await getDoc(docRef);
    const results = docSnap.data();
    return results;
  }

  useEffect(() => {
    setIsLoading(true);
    const storage = getStorage();
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
    return <EditProfile userProfile={userProfile} />;
  }

  if (userProfile) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text>Welcome back, {userProfile.firstName}</Text>
            <Button
              modeValue="contained"
              title="Logout"
              onPress={() => {
                setCurrentUser('');
                setIsLoggedIn(false);
              }}
            >
              Log out
            </Button>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Button
              style={{
                marginRight: 70,
                width: '40%',
              }}
              mode="contained"
              buttonColor="#39C67F"
              onPress={() => console.log('Pressed')}
            >
              List My House
            </Button>
            <Button
              style={{
                width: '40%',
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
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <View style={{ textAlign: 'center' }}>
              <Image
                source={{ uri: profileImgUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text>{userProfile.firstName + ' ' + userProfile.lastName}</Text>
              <Text>{userProfile.location}</Text>
              <Text>{userProfile.rating + ' *'}</Text>
              <Button
                mode="contained"
                buttonColor="#39C67F"
                onPress={() => console.log('Pressed')}
              >
                Contact Me
              </Button>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              height: 100,
              borderWidth: '2',
              borderRadius: 10,
            }}
          >
            <Text>{userProfile.bio}</Text>
          </View>
          <View>
            <Text>House Pictures</Text>
            <Image
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/swapiday.appspot.com/o/users%2F3EL4Y4UWgaeq3vrsCcQXkPuD3XW2%2FhouseImages%2Fdata1_0.jpg?alt=media&token=425e6c81-eadf-408f-9c73-7888958e6a5e`,
              }}
              style={{
                width: 370,
                height: 200,
              }}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: 100,
              borderWidth: '2',
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
