import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';
import { LoginContext } from '../contexts/LoggedInContext';

function LoginSignUp() {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

  const signInAs = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setCurrentUser(userCredential.user);
    });
  };

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
      <Text> </Text>
      <Text> </Text>
      <Button
        buttonColor="red"
        mode="contained"
        onPress={() => {
          signInAs('1@1.com', 'test1234');
          setIsLoggedIn(true);
        }}
      >
        Log in as test account 1
      </Button>
      <Button
        buttonColor="red"
        mode="contained"
        title="log in as david"
        onPress={() => {
          signInAs('m@m.com', 'test1234');
          setIsLoggedIn(true);
        }}
      >
        Log in as test account 2
      </Button>
    </ScrollView>
  );
}

export default LoginSignUp;
