import { Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

function LoginSignUp() {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    setSignUp(false);
  };
  const handleSignUp = () => {
    setSignUp(true);
    setLogin(false);
  };

  return (
    <ScrollView>
      {login ? (
        <Login />
      ) : (
        <Button buttonColor="#39C67F" mode="contained" onPress={handleLogin}>
          {' '}
          Click here to log in{' '}
        </Button>
      )}
      <Text> </Text>
      <Text> </Text>
      <Text> </Text>
      {signUp ? (
        <SignUp />
      ) : (
        <Button buttonColor="#39C67F" mode="contained" onPress={handleSignUp}>
          Click here to sign up
        </Button>
      )}
    </ScrollView>
  );
}

export default LoginSignUp;
