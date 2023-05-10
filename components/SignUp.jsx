import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { database, auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import EditProfile from './EditProfile';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { currentUser, setCurrentUser } = useAuth();
  const [signedUp, setSignedUp] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSignUp = () => {
    setButtonLoading(true);

    if (password !== confirm) {
      alert('Passwords do not match');
    } else if (email === '' || password === '') {
      alert('Please fill out all fields');
    }
    // else if (password.length < 8) {
    //   alert('Password must be at least 8 characters')}
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .then((userCred) => {
          setCurrentUser(userCred.user);
          return setDoc(doc(database, 'userProfilesV2', userCred.user.uid), {
            email: email,
          });
        })
        .then(() => {
          setButtonLoading(false);
          setSignedUp(true);
        })
        .catch((err) => console.log('err :>> ', err));
    }
  };

  return (
    <View style>
      {signedUp ? (
        <EditProfile uid={currentUser.uid} />
      ) : (
        <View>
          <Text> </Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            width={300}
          />
          <TextInput
            label="Password"
            secureTextEntry={true}
            width={300}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <TextInput
            label="Confirm Password"
            secureTextEntry={true}
            width={300}
            value={confirm}
            onChangeText={(confirmedPassword) => {
              setConfirm(confirmedPassword);
            }}
          />

          <Text>{'\n'}</Text>
          <Button
            style={{ padding: 10 }}
            buttonColor="#39C67F"
            mode="contained"
            onPress={handleSignUp}
            loading={buttonLoading}
          >
            Sign Up!
          </Button>
        </View>
      )}
    </View>
  );
}

export default SignUp;
