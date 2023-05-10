import { Text, ScrollView } from 'react-native';
import React from 'react';
import LogoHeader from '../screens/LogoHeader';
import { useState, useContext, useEffect } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { database, storage } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { LoginContext } from '../contexts/LoggedInContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

function AddHome({ setAddingHome }) {
  const [houseHeaderInfo, setHouseHeaderInfo] = useState('');
  const [houseInfo, setHouseInfo] = useState('');
  const [houseLocation, setHouseLocation] = useState('');
  const [houseImg, setHouseImg] = useState('');
  const [houseImgUrl, setHouseImgUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const { currentUser, setCurrentUser } = useAuth();
  const [numberOfRooms, setNumberOfRooms] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', houseImg, true);
        xhr.send(null);
      });

      const metadata = {
        contentType: 'image/jpeg',
      };

      const uploadTask = ref(
        storage,
        `users/${currentUser.uid}/houseImages/data1_0.jpg`
      );
      const uploadPic = uploadBytesResumable(uploadTask, blobImage, metadata);

      uploadPic.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log('User does not have permission to access the object');
              break;
            case 'storage/canceled':
              console.log('User canceled the upload');
              break;
            case 'storage/unknown':
              console.log(
                'Unknown error occurred, inspect error.serverResponse'
              );
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask).then((url) => {
            const docRef = doc(database, 'userProfilesV2', currentUser.uid);
            updateDoc(docRef, { houseImgUrl: url })
              .then(() => {
                alert('Image uploaded!');
                setIsLoading(false);
              })
              .catch((err) => {
                alert(`Error saving changes: ${err}`);
              });
          });
        }
      );
    };
    if (houseImg) {
      uploadImage();
      setHouseImg(null);
    }
  }, [houseImg]);

  const handleImageSelection = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      setHouseImg(result.assets[0].uri);
    } else {
      setIsLoading(false);
    }
  };

  const handleSaveHome = () => {
    const home = {};
    if (houseHeaderInfo) {
      home.houseHeaderInfo = houseHeaderInfo;
    }
    if (houseInfo) {
      home.houseInfo = houseInfo;
    }
    if (houseLocation) {
      home.houseLocation = houseLocation;
    }
    if (houseImgUrl) {
      home.houseImgUrl = houseImgUrl;
    }
    const docRef = doc(database, 'userProfilesV2', currentUser.uid);
    updateDoc(docRef, home)
      .then(() => {
        alert(`Home added!`);
        setAddingHome(false);
      })
      .catch((err) => {
        alert(`Error saving changes: ${err}`);
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <LogoHeader />
      <Text>{'\n'}</Text>
      <TextInput
        label="Title"
        value={houseHeaderInfo}
        onChangeText={(houseHeaderInfo) => setHouseHeaderInfo(houseHeaderInfo)}
      />
      <TextInput
        label="Description"
        multiline={true}
        numberOfLines={4}
        value={houseInfo}
        onChangeText={(houseInfo) => setHouseInfo(houseInfo)}
      />
      <TextInput
        label="Location"
        value={houseLocation}
        onChangeText={(houseLocation) => setHouseLocation(houseLocation)}
      />
      <TextInput
        label="Number of Rooms"
        keyboardType="numeric"
        value={numberOfRooms}
        onChangeText={(numberOfRooms) => setNumberOfRooms(numberOfRooms)}
      />
      <Text>{'\n'}</Text>
      <Button
        style={{
          margin: 20,
          width: 150,
          alignSelf: 'center',
        }}
        compact={true}
        loading={isLoading}
        mode="contained"
        onPress={() => {
          handleImageSelection();
        }}
      >
        Add Image
      </Button>

      <Button
        style={{
          margin: 20,
          width: 150,
          alignSelf: 'center',
        }}
        disabled={isLoading}
        compact={true}
        mode="contained"
        onPress={() => {
          handleSaveHome();
        }}
      >
        Add Home
      </Button>
    </ScrollView>
  );
}

export default AddHome;
