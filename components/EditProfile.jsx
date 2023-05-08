import { useState, useContext } from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { database } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

function EditProfile({ userProfile }) {
  const { currentUser, setCurrentUser } = useAuth();
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
    if (rating) {
      user.rating = rating;
    }

    const docRef = doc(database, 'userProfilesV2', currentUser.uid);
    updateDoc(docRef, user)
      .then(() => {
        alert('Changes saved!');
      })
      .catch((err) => {
        alert(`Error saving changes: ${err}`);
      });
  };
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <TextInput
        label="First Name"
        keyboardType="default"
        width={300}
        value={firstName}
        placeholder={userProfile.firstName}
        onChangeText={(firstName) => {
          setFirstName(firstName);
        }}
      />
      <TextInput
        label="Last Name"
        placeholder={userProfile.lastName}
        keyboardType="default"
        width={300}
        value={lastName}
        onChangeText={(lastName) => {
          setLastName(lastName);
        }}
      />
      <TextInput
        label="Bio"
        placeholder={userProfile.bio}
        keyboardType="default"
        width={300}
        value={bio}
        onChangeText={(bio) => {
          setBio(bio);
        }}
      />
      <TextInput
        label="Location"
        placeholder={userProfile.location}
        keyboardType="default"
        width={300}
        value={location}
        onChangeText={(location) => {
          setLocation(location);
        }}
      />
      <TextInput
        label="Rating"
        placeholder={userProfile.rating}
        keyboardType="default"
        width={300}
        value={rating}
        onChangeText={(rating) => {
          setRating(rating);
        }}
      />

      <Button onPress={handleSaveChanges}>Save Changes</Button>
    </ScrollView>
  );
}

export default EditProfile;
