import React, { PropTypes, Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import MainScreen from './src/screens/MainScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >     
        <Stack.Screen
          name="MainScreen"
          component={ MainScreen }
        />   
        <Stack.Screen
          name="AuthScreen"
          component={ AuthScreen }
        />
        <Stack.Screen
          name="MailLoginScreen"
          component={ MailLoginScreen }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;