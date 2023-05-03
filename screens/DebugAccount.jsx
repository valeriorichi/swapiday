import { Button, Text, View } from 'react-native';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function DebugAccount() {
  const { currentUser, setCurrentUser } = useAuth();

  const signInAs = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setCurrentUser(userCredential.user);
      console.log(userCredential.user.email);
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="log in as quinn"
        onPress={() => {
          signInAs('quinnlord404@gmail.com', 'test123');
        }}
      ></Button>
      <Button
        title="log in as david"
        onPress={() => {
          signInAs('daivdmaizil@gmail.com', 'test123');
        }}
      ></Button>
      <Button
        title="log in as adam"
        onPress={() => {
          signInAs('adamlindley98@gmail.com', 'test123');
        }}
      ></Button>
      <Button
        title="log in as mike"
        onPress={() => {
          signInAs('michael.dobinson@gmail.com', 'test123');
        }}
      ></Button>
      <Button
        title="log in as val"
        onPress={() => {
          signInAs('val@email.com', 'test123');
        }}
      ></Button>
    </View>
  );
}

export default DebugAccount;
