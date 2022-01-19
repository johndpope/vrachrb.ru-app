import React, { useReducer, Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import MainScreen from './src/screens/MainScreen'
import StartScreen from './src/screens/AnamnezScreens/StartScreen';

import { ContextApp, Reducer } from './src/store/reducers/Reducer';
import TestScreen from './src/screens/TestScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  const [state, dispatch] = useReducer(Reducer, {
    auth: false
  })

  return (
    <ContextApp.Provider value={{ dispatch }}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{
            // header: props => state.auth.header,  
            headerShown: state.auth.auth,
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: "#F3F4F6",
            },
            headerTitleStyle: {
              color: "#434A53"
            },
            headerTitle: "Консультация врача",
            headerShadowVisible: false,
          }}
        >     
          <Stack.Screen
            name="AuthScreen"
            component={ AuthScreen }
          /> 
          <Stack.Screen
            name="MainScreen"
            component={ MainScreen }
          />  
          <Stack.Screen
            name="MailLoginScreen"
            component={ MailLoginScreen }
          />
          <Stack.Screen
            name="StartScreen"
            component={ StartScreen }
          />
        </Stack.Navigator>
      </NavigationContainer>      
    </ContextApp.Provider>
  );
};

export default App;