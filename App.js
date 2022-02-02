import React, { Component} from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import SplashScreen from './src/screens/SplashScreen';
import CancelButton from './src/components/HeaderComponent/CancelButton';
import BackButton from './src/components/HeaderComponent/BackButton';
import MessagesScreen from './src/screens/MessagesScreen'
import ChatScreen from './src/screens/ChatScreen'
import { Image, TouchableOpacity } from 'react-native';
import MainNavigationScreen from './src/screens/MainNavigationScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
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
                name={ "MainNavigationScreen" }
                options={{ headerShown: false }}
                component={ MainNavigationScreen }
            />
            <Stack.Screen
                name={ "ChatScreen" }
                options={{
                    title: "Консультации",
                    headerStyle: {
                        backgroundColor: '#FFFFFF'
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: "#434A53",
                        fontWeight: '700',
                        fontSize: 21,
                    },
                    headerBackVisible: false,
                    headerLeft: () => (
                        <BackButton />
                    ),
                    headerRight: () => (
                        null
                    )
                }}
                component={ ChatScreen }
            />
            <Stack.Screen
                name="MailLoginScreen"
                options={{headerShown: false}}
                component={ MailLoginScreen }
            />
            <Stack.Screen
                name="StartScreen"
                // options={{ header: props => <AnamnezHeader page={1} /> }}
                options={{
                    title: '1/2',
                    headerBackVisible: false,
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        padding: 20
                    },
                    headerTitleStyle: {
                        fontSize: 21,
                        color: '#434A53',
                        fontWeight: '700'
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <CancelButton />
                    ),
                    headerLeft: () => (
                        <BackButton />
                    )
                }}
                component={ StartScreen }
            />
            <Stack.Screen
                name="ModalScreen"
                options={{headerShown: false}}
                component={ ModalScreen }
            />
            <Stack.Screen
                name="QuestionsScreen"
                // options={{ header: props => <AnamnezHeader page={2} /> }}
                options={{
                    title: '2/2',
                    headerBackVisible: false,
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                    },
                    headerTitleStyle: {
                        fontSize: 21,
                        color: '#434A53',
                        fontWeight: '700'
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <CancelButton />
                    ),
                    headerLeft: () => (
                        <BackButton />
                    )
                }}
                component={ QuestionsScreen }
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
