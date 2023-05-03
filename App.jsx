import { StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from './screens/Landing';
import HomeList from './screens/HomeList';
import AddHome from './screens/AddHome';
import LoginSignUp from './screens/LoginSignUp';
import UserProfile from './screens/UserProfile';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import DebugAccount from './screens/DebugAccount';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Landing" component={Landing} />
            <Tab.Screen name="Homes" component={HomeList} />
            <Tab.Screen name="List a home" component={AddHome} />
            <Tab.Screen name="Login/Sign up" component={LoginSignUp} />
            <Tab.Screen name="My Profile" component={UserProfile} />
            <Tab.Screen name="Debug" component={DebugAccount} />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
