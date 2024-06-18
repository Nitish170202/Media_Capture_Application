import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CameraScreen from '../app/CameraScreen';
import Home from '../app/Home';
import LoginScreen from '../app/Login';
import SignUpScreen from '../app/Signup';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;