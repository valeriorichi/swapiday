import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => alert('Login success'))
        .catch((err) => alert(`Login err: ${err}`));
    } else if (email === '' || password === '') {
      alert('Please fill out all fields');
    }
  };

  const showUser = () => {
    return <Text>{auth.currentUser.email}</Text>;
  };

  return (
    <View>
      {showUser() /* test to see which user is logged in */}
      <Text>{'\n'} </Text>
      <TextInput
        label="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        onChangeText={(email) => setEmail(email)}
        width={300}
      />
      <Text>{'\n'}</Text>
      <TextInput
        label="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        width={300}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Text>{'\n'}</Text>
      <Button onPress={handleLogin} buttonColor="#39C67F" mode="contained">
        {' '}
        Log In!{' '}
      </Button>
    </View>
  );
}

export default Login;
