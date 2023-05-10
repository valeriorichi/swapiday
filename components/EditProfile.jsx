import { useState, useContext, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { database, storage } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { LoginContext } from '../contexts/LoggedInContext';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

function EditProfile({ userProfile, setIsEditing, isEditing }) {
  const { currentUser, setCurrentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [img, setImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('inside useEffect');
    console.log('img :>> ', img);
    const uploadImage = async () => {
      //convert image into blob image
      const blobImage = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', img, true);
        xhr.send(null);
      });
      //set metadata of image
      const metadata = {
        contentType: 'image/jpeg',
      };
      //upload image to firebase storage
      const uploadTask = ref(
        storage,
        `users/${currentUser.uid}/userImages/userImage.jpg`
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
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask).then((url) => {
            //update profile with image url
            const docRef = doc(database, 'userProfilesV2', currentUser.uid);
            updateDoc(docRef, { profileImgUrl: url })
              .then(() => {
                alert('Image uploaded!');
                // setIsLoggedIn(true);
                setIsLoading(false);
                // setIsEditing(false);
              })
              .catch((err) => {
                alert(`Error saving changes: ${err}`);
              });
          });
        }
      );
    };
    if (img) {
      uploadImage();
      setImg(null);
    }
  }, [img]);

  const handleSaveChanges = () => {
    const user = {};
    user.uid = currentUser.uid;
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (bio) {
      user.bio = bio;
    }
    if (location) {
      user.location = location;
    }

    const docRef = doc(database, 'userProfilesV2', currentUser.uid);
    updateDoc(docRef, user)
      .then(() => {
        alert(isLoggedIn ? 'Changes saved!' : 'Profile created!');
        setIsLoggedIn(true);
        isLoggedIn ? setIsEditing(false) : null;
      })
      .catch((err) => {
        alert(`Error saving changes: ${err}`);
      });
  };

  const handleImageSelection = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    setImg(result.assets[0].uri);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <TextInput
        label="First Name"
        keyboardType="default"
        width={300}
        value={firstName}
        placeholder={userProfile ? userProfile.firstName : null}
        onChangeText={(firstName) => {
          setFirstName(firstName);
        }}
      />
      <TextInput
        label="Last Name"
        placeholder={userProfile ? userProfile.lastName : null}
        keyboardType="default"
        width={300}
        value={lastName}
        onChangeText={(lastName) => {
          setLastName(lastName);
        }}
      />
      <TextInput
        label="Bio"
        outlined
        placeholder={userProfile ? userProfile.bio : null}
        keyboardType="default"
        width={300}
        value={bio}
        onChangeText={(bio) => {
          setBio(bio);
        }}
      />
      <TextInput
        label="Location"
        placeholder={userProfile ? userProfile.location : null}
        keyboardType="default"
        width={300}
        value={location}
        onChangeText={(location) => {
          setLocation(location);
        }}
      />
      <Button
        loading={isLoading}
        style="padding=20"
        onPress={handleImageSelection}
      >
        Select Profile Image
      </Button>

      <Button style="padding=20" onPress={handleSaveChanges}>
        {isLoggedIn ? 'Save Changes' : 'Create Profile'}
      </Button>
    </ScrollView>
  );
}

export default EditProfile;
