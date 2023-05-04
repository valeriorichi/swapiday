import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './contexts/AuthContext';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginContext, LoginContextProvider } from './contexts/LoggedInContext';
import Landing from './screens/Landing';
import HomeList from './screens/HomeList';
import AddHome from './screens/AddHome';
import ListingPage from './screens/ListingPage';
import UpdateListing from './screens/UpdateListing';
import LoginSignUp from './screens/LoginSignUp';
import UserProfile from './screens/UserProfile';
import Reviews from './screens/Reviews';
import DebugAccount from './screens/DebugAccount';
import Search from './screens/Search';
import Chat from './screens/Chat';
import RateForm from "./screens/RateForm";
import ErrorPage from "./screens/ErrorPage.jsx";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Homes" component={HomeList} />
      <Tab.Screen name="List a home" component={AddHome} />
      <Tab.Screen name="Listing Page" component={ListingPage} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="UpdateListing" component={UpdateListing} />
      <Tab.Screen name="Reviews" component={Reviews} />
      <Tab.Screen name="Debug" component={DebugAccount} />
      <Tab.Screen name="RateForm" component={RateForm} />
      <Tab.Screen name="Errors" component={ErrorPage} />
    </Tab.Navigator>
  );
};

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Login" component={LoginSignUp} />
  </Stack.Navigator>
);

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <LoginContextProvider>
          <Navigation />
        </LoginContextProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};
