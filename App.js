import React, {useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from "react-redux";
import { saveUserData } from "./src/store/reducers/LoginSlice";
import { OverflowMenuProvider } from 'react-navigation-header-buttons';
import { MultiPlatform } from './src/components/MultiPlatform';
import { Notifications } from 'react-native-notifications';
import { Platform } from 'react-native';
import Storage from "./src/storage/Storage";
import Routes from './src/requests/Routes';
import Request from './src/requests/Request';
import NotificationAgent from './src/components/NotificationManager/NotificationAgent';
import AuthScreen from './src/screens/AuthScreen';
import MailLoginScreen from './src/screens/MailLoginScreen';
import StartScreen from './src/screens/AnamnezScreens/StartScreen';
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
import OutpatientCardScreen from './src/screens/AnamnezScreens/OutpatientCardScreen'
import NextAppleAuth from "./src/screens/NextAppleAuth";
import { Text, TextInput } from 'react-native'
import {colors} from './src/styles/colors'

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const Stack = createNativeStackNavigator();

global.count = 0

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        Notifications.registerRemoteNotifications();

        let remoteNotify = Notifications.events().registerRemoteNotificationsRegistered((event) => {
            if (global.count == 0){
                Request.post(Routes.SaveDeviceToken, {
                    token: event.deviceToken,
                    type: Platform.OS == 'ios' ? 1 : 2
                })
                global.count += 1
            }
        })

        setTimeout(() => {
            Platform.OS == 'android' && remoteNotify.remove()
        }, 1)

        NotificationAgent.registerNotificationEvents(true)

        Storage.get("userData")
            .then((data) => dispatch(saveUserData(data)))

        global.count = 0
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
                        options={{
                            headerBackVisible: true,
                            title: "",
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20,
                                
                            },
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={RegisterScreen}
                    />
                    <Stack.Screen
                        name="RecoveryPasswordScreen"
                        options={{
                            headerBackVisible: true,
                            title: "",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#F3F4F6',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={RecoveryPasswordScreen}
                    />
                    <Stack.Screen
                        name="MailLoginScreen"
                        options={{
                            headerBackVisible: true,
                            title: "",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#F3F4F6',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={MailLoginScreen}
                    />
                    <Stack.Screen
                        name={"NextAppleAuth"}
                        options={{
                            headerBackVisible: true,
                            title: "",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#F3F4F6',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={NextAppleAuth}
                    />
                    <Stack.Screen
                        name={"MainNavigationScreen"}
                        options={{headerShown: false}}
                        component={MainNavigationScreen}
                    />
                    <Stack.Screen
                        name={"ChatScreen"}
                        options={{
                            headerBackVisible: true,
                            title: "Консультации",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(17),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={ChatScreen}
                    />
                    <Stack.Screen
                        name="StartScreen"
                        options={{
                            headerBackVisible: true,
                            title: "1/2",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(19),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <CancelButton/>
                            ),
                        }}
                        component={StartScreen}
                    />
                    <Stack.Screen
                        name="ModalScreen"
                        options={{
                            headerBackVisible: true,
                            title: "",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={ModalScreen}
                    />
                    <Stack.Screen
                        name="OutpatientCardScreen"
                        options={{
                            title: 'Амбулаторная карта',
                            headerBackVisible: true,
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(18),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={OutpatientCardScreen}
                    />
                    <Stack.Screen
                        name="DisplayAnamnezScreen"
                        options={{
                            title: 'Анамнез',
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerBackVisible: true,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(17),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}
                        component={DisplayAnamnezScreen}
                    />
                    <Stack.Screen
                        name="QuestionsScreen"
                        options={{
                            headerBackVisible: true,
                            title: "2/2",
                            headerBackTitle: "",
                            headerTintColor: colors.HARD_GRAY_COLOR,
                            headerStyle: {
                                backgroundColor: '#FFFFFF',
                                padding: 20
                            },
                            headerTitleStyle: {
                                fontSize: MultiPlatform.AdaptivePixelsSize(19),
                                color: '#434A53',
                                fontWeight: '400'
                            },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <CancelButton/>
                            ),
                        }}
                        component={QuestionsScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </OverflowMenuProvider>
    );
};

export default App;
