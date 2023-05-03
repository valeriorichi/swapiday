import { Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import { useState } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

function LoginSignUp() {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const showLoginScreen = () => {
    setLogin(true);
    setSignUp(false);
  };
  const showSignupScreen = () => {
    setSignUp(true);
    setLogin(false);
  };

  return (
    <ScrollView>
      {login ? (
        <Login />
      ) : (
        <Button
          buttonColor="#39C67F"
          mode="contained"
          onPress={showLoginScreen}
        >
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
        <Button
          buttonColor="#39C67F"
          mode="contained"
          onPress={showSignupScreen}
        >
          Click here to sign up
        </Button>
      )}
    </ScrollView>
  );
}

export default LoginSignUp;
