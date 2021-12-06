import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding1Screen from 'src/screens/guest/Onboarding1Screen';
import Onboarding2Screen from 'src/screens/guest/Onboarding2Screen';
import Onboarding3Screen from 'src/screens/guest/Onboarding3Screen';

const Stack = createNativeStackNavigator();

export const GuestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Stack.Screen name="onboarding-1" component={Onboarding1Screen} />
      <Stack.Screen name="onboarding-2" component={Onboarding2Screen} />
      <Stack.Screen
        name="onboarding-3"
        component={Onboarding3Screen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
