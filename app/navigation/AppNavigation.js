import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import i18n from '../app_language/I18n';
import MyProfile from '../screens/MyProfile';
import MyCamera from '../screens/MyCamera';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    i18n.locale = 'en';
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'MyProfile'}
      >
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="MyCamera" component={MyCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
