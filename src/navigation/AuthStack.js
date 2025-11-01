import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Bejelentkezés' }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Regisztráció' }} />
  </Stack.Navigator>
);

export default AuthStack;
