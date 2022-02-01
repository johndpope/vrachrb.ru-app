import React, { Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import MainScreen from './src/screens/MainScreen'
import StartScreen from './src/screens/AnamnezScreens/StartScreen';

import TestScreen from './src/screens/TestScreen';
import Header from './src/components/HeaderComponent/Header';
import AnamnezHeader from './src/components/HeaderComponent/AnamnezHeader';
import ModalScreen from './src/screens/ModalScreen';
import QuestionsScreen from './src/screens/AnamnezScreens/QuestionsScreen';
import SplashScreen from './src/screens/SplashScreen';
import RecoveryPasswordScreen from "./src/screens/RecoveryPasswordScreen";


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
            name={ "SplashScreen" }
            options={{headerShown: false}}
            component={ SplashScreen }
          /> 
          <Stack.Screen
            name={ "AuthScreen" }
            options={{headerShown: false}}
            component={ AuthScreen }
          />
          <Stack.Screen
              name={ "RecoveryPasswordScreen" }
              options={{headerShown: false}}
              component={ RecoveryPasswordScreen }
          />
          <Stack.Screen
            name={ "MainScreen" }
            component={ MainScreen }
          />
          <Stack.Screen
              name="RegisterScreen"
              options={{headerShown: false}}
              component={ RegisterScreen }
          />
          <Stack.Screen
            name="MailLoginScreen"
            options={{headerShown: false}}
            component={ MailLoginScreen }
          />
          <Stack.Screen
            name="StartScreen"
            options={{ header: props => <AnamnezHeader page={1} /> }}
            component={ StartScreen }
          />
          <Stack.Screen
              name="QuestionsScreen"
              options={{ header: props => <AnamnezHeader page={2} /> }}
              component={ QuestionsScreen }
          />
          <Stack.Screen
            name="ModalScreen"
            options={{headerShown: false}}
            component={ ModalScreen }
          />
        </Stack.Navigator>
      </NavigationContainer>  
  );
};

export default App;