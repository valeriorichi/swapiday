import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSignUp = () => {
    if (password !== confirm) {
      alert('Passwords do not match');
    } else if (password.length < 8) {
      alert('Password must be at least 8 characters');
    } else {
      const user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
      };
      alert('User created!');
    }
  };

  return (
    <View style>
      <Text> </Text>
      <TextInput
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
      <TextInput
        label="First Name"
        width={300}
        value={firstName}
        onChangeText={(firstName) => {
          setFirstName(firstName);
        }}
      />
      <TextInput
        label="Last Name"
        width={300}
        value={lastName}
        onChangeText={(lastName) => {
          setLastName(lastName);
        }}
      />

      <TextInput
        label="Date of Birth"
        keyboardType="numeric"
        width={300}
        value={dateOfBirth}
        placeholder="DD/MM/YYYY"
        onChangeText={(dateOfBirth) => {
          setDateOfBirth(dateOfBirth);
        }}
      />
      <Text>{'\n'}</Text>
      <Button buttonColor="#39C67F" mode="contained" onPress={handleSignUp}>
        Sign Up!
      </Button>
    </View>
  );
}

export default SignUp;
