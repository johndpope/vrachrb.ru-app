import React, {useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './src/screens/AuthScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import StartScreen from './src/screens/AnamnezScreens/StartScreen';

import TestScreen from './src/screens/TestScreen';
import ModalScreen from './src/screens/ModalScreen';
import QuestionsScreen from './src/screens/AnamnezScreens/QuestionsScreen';
import SplashScreen from './src/screens/SplashScreen';
import CancelButton from './src/components/HeaderComponent/CancelButton';
import BackButton from './src/components/HeaderComponent/BackButton';
import ChatScreen from './src/screens/ChatScreen'
import MainNavigationScreen from './src/screens/MainNavigationScreen';
import RegisterScreen from "./src/screens/RegisterScreen";
import RecoveryPasswordScreen from "./src/screens/RecoveryPasswordScreen";
import DisplayAnamnezScreen from './src/screens/AnamnezScreens/DisplayAnamnezScreen';
import Storage from "./src/storage/Storage";
import {useDispatch} from "react-redux";
import {saveUserData} from "./src/store/reducers/LoginSlice";
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { MultiPlatform } from './src/components/MultiPlatform';
import OutpatientCardScreen from './src/screens/AnamnezScreens/OutpatientCardScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Storage.get("userData")
            .then((data) => dispatch(saveUserData(data)))
    },[])

    return (
        <OverflowMenuProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={"SplashScreen"}
                        options={{headerShown: false}}
                        component={SplashScreen}
                    />
                    <Stack.Screen
                        name={"AuthScreen"}
                        options={{headerShown: false}}
                        component={AuthScreen}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        options={{headerShown: false}}
                        component={RegisterScreen}
                    />
                    <Stack.Screen
                        name="RecoveryPasswordScreen"
                        options={{headerShown: false}}
                        component={RecoveryPasswordScreen}
                    />
                    <Stack.Screen
                        name="MailLoginScreen"
                        options={{headerShown: false}}
                        component={MailLoginScreen}
                    />
                    <Stack.Screen
                        name={"MainNavigationScreen"}
                        options={{headerShown: false}}
                        component={MainNavigationScreen}
                    />
                    <Stack.Screen
                        name={"ChatScreen"}
                        options={{
                            title: "Консультации",
                            headerStyle: {
                                backgroundColor: '#FFFFFF'
                            },
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                color: "#434A53",
                                fontWeight: '700',
                                fontSize: MultiPlatform.AdaptivePixelsSize(17),
                            },
                            headerBackVisible: false,
                            headerLeft: () => (
                                <BackButton/>
                            ),
                        }}
                        component={ChatScreen}
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
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '700'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <CancelButton/>
                            ),
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={StartScreen}
                    />
                    <Stack.Screen
                        name="ModalScreen"
                        options={{headerShown: false}}
                        component={ModalScreen}
                    />
                    <Stack.Screen
                        name="OutpatientCardScreen"
                        options={{
                            title: 'Амбулаторная карта',
                            headerBackVisible: false,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '700'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={OutpatientCardScreen}
                    />
                    <Stack.Screen
                        name="DisplayAnamnezScreen"
                        options={{
                            title: 'Анамнез',
                            headerBackVisible: false,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '700'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={DisplayAnamnezScreen}
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
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '700'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <CancelButton/>
                            ),
                            headerLeft: () => (
                                <BackButton/>
                            )
                        }}
                        component={QuestionsScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </OverflowMenuProvider>
    );
};

export default App;
