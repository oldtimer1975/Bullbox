
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importáld a képernyőket, amiket használni akarsz
import AuthStack from './AuthStack';
import CreatePackageScreen from '../screens/CreatePackageScreen';
// Ha lesznek főoldalak: import ClientHome from '../screens/ClientHome'; stb.

const Stack = createStackNavigator();
<Stack.Screen name="Activity" component={ActivityScreen} options={{ title: 'Activity' }} />
<Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth stack */}
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* Csomagfeladás */}
        <Stack.Screen name="CreatePackage" component={CreatePackageScreen} />
        {/* Itt jöhetnek további képernyők, pl. főoldalak */}
        {/* <Stack.Screen name="ClientHome" component={ClientHome} /> */}
        {/* <Stack.Screen name="CourierHome" component={CourierHome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
