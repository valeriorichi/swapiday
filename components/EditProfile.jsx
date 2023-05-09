import { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { Button, TextInput, Image } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { LoginContext } from '../contexts/LoggedInContext';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

function EditProfile({ userProfile, setIsEditing }) {
  const { currentUser, setCurrentUser } = useAuth();
  const storage = getStorage();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const profileImgRef = ref(
    storage,
    `users/${currentUser.uid}/userImages/userImage.jpg`
  );

  const handleSaveChanges = () => {
    const user = {};
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
        alert('Changes saved!');
        setIsLoggedIn(true);
        setIsEditing(false);
      })
      .catch((err) => {
        alert(`Error saving changes: ${err}`);
      });
  };

  const handleImageUpload = () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
      .then((img) => {
        return fetch(img.assets[0].uri);
      })
      .then((file) => {
        return uploadBytes(profileImgRef, file.blob());
      })
      .then((snapshot) => {
        console.log('snapshot :>> ', snapshot);
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });

    // const response = await fetch(img.assets[0].uri);
    // console.log('response :>> ', response);
    // const blob = response.blob();
    // console.log('blob :>> ', blob);
    // uploadBytes(profileImgRef, blob)
    //   .then((snapshot) => {
    //     console.log('snapshot');
    //   })
    //   .catch((err) => {
    //     console.log('err :>> ', err);
    //   });

    // console.log('assets :>> ', img.assets[0].uri);
    // uploadBytes(profileImgRef, img.assets[0].uri)
    //   .then((snapshot) => {
    //     console.log('snapshot >> ', snapshot);
    //   })
    // .catch((err) => {
    //   console.log('err >> ', err);
    // });
  };

  //   , (response) => {
  //     if (response.didCancel) {
  //       alert('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       alert(`ImagePicker Error: ${response.errorCode}`);
  //     } else {
  //       const image = response.assets[0];
  //       const uploadTask = ref(
  //         storage,
  //         `users/${currentUser.uid}/userImages/userImage.jpg`
  //       );
  //       uploadTask.putFile(image.uri).then((snapshot) => {
  //         console.log('Uploaded a blob or file!');
  //         getDownloadURL(uploadTask).then((url) => {

  //           const docRef = doc(database, 'userProfilesV2', currentUser.uid);
  //           updateDoc(docRef, { profileImgUrl: url })

  //             .then(() => {
  //               alert('Image uploaded!');
  //               setIsLoggedIn(true);
  //               setIsEditing(false);
  //             })
  //             .catch((err) => {
  //               alert(`Error saving changes: ${err}`);
  //             });
  //         });
  //       });
  //     }
  //   });
  // };

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
      <Button style="padding=20" onPress={handleImageUpload}>
        Upload Profile Image
      </Button>
      <Button style="padding=20" onPress={handleSaveChanges}>
        Save Changes
      </Button>
    </ScrollView>
  );
}

export default EditProfile;
