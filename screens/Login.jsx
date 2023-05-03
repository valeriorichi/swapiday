import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text>{'\n'} </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        width={300}
      />
      <Text>{'\n'}</Text>
      <TextInput
        label="Password"
        width={300}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Text>{'\n'}</Text>
      <Button buttonColor="#39C67F" mode="contained">
        {' '}
        Log In!{' '}
      </Button>
    </View>
  );
}

export default Login;
