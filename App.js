import React, { useReducer, Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import MainScreen from './src/screens/MainScreen'
import StartScreen from './src/screens/AnamnezScreens/StartScreen';

import TestScreen from './src/screens/TestScreen';
import Header from './src/components/HeaderComponent/Header';
import AnamnezHeader from './src/components/HeaderComponent/AnamnezHeader';
import ModalScreen from './src/screens/ModalScreen';
import QuestionsScreen from './src/screens/AnamnezScreens/QuestionsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          header: props => <Header />,  
          headerShown: true,
          headerBackVisible: false,
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
        {/* <Stack.Screen
          name="TestScreen"
          options={{headerShown: false}}
          component={ TestScreen }
        />   */}
        <Stack.Screen
          name="AuthScreen"
          options={{headerShown: false}}
          component={ AuthScreen }
        /> 
        <Stack.Screen
          name="MainScreen"
          component={ MainScreen }
        />  
        <Stack.Screen
          name="MailLoginScreen"
          options={{headerShown: false}}
          component={ MailLoginScreen }
        />
        <Stack.Screen
          name="StartScreen"
          options={{ header: props => <AnamnezHeader /> }}
          component={ StartScreen }
        />
        <Stack.Screen
          name="ModalScreen"
          options={{headerShown: false}}
          component={ ModalScreen }
        />
        <Stack.Screen
          name="QuestionsScreen"
          options={{ header: props => <AnamnezHeader /> }}
          component={ QuestionsScreen }
        />
      </Stack.Navigator>
    </NavigationContainer>   
  );
};

export default App;