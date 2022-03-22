import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import MessagesScreen from './MessagesScreen';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { useDispatch, useSelector } from "react-redux";
import { MultiPlatform } from '../components/MultiPlatform';
import { useNavigation } from '@react-navigation/native';
import Request from '../requests/Request';
import { resetUserData, saveDeviceToken, setAgreements } from '../store/reducers/LoginSlice';
import Storage from '../storage/Storage';
import Routes from "../requests/Routes";
import { Notifications } from 'react-native-notifications';
import LoginSlice from '../store/reducers/LoginSlice';

const BottomTab = createBottomTabNavigator()

global.deviceToken = ""
global.countSended = 0

const MainNavigationScreen = () => {

    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)
    const userData = useSelector(state => state.LoginSlice.userData)

    const dispatch = useDispatch();
    const navigation = useNavigation()

    const logOut = async () => {
        Request.get(Routes.signOutURL, {}).then((response) => {
            response["response"] && Request.get(Routes.getAgreementsURL, {})
            .then(result => {
                dispatch(setAgreements(result["response"])),
                Request.post(Routes.SaveDeviceToken, {
                    token: global.deviceToken,
                    type: Platform.OS == 'ios' ? 1 : 2
                }),
                dispatch(resetUserData()),
                navigation.reset({
                    index: 0,
                    routes: [{name: 'AuthScreen'}],
                })
            })
        })

        await Storage.save("userData", {
            auth: false,
            isSpecialist: false,
            first_name: "",
            second_name: "",
            middle_name: "",
            username: "",
            gender: "",
            birth_date: "",
            email: "",
            phone: "",
            photo: ""
        })
    }

    const navigateToSrcreenType = (notification) => {
        switch(notification.payload?.type){
            case "resume":
            case "message":
                navigation.navigate("ChatScreen",
                    {
                        id: notification.payload.chat_id,
                        user_id: notification.payload.user_id,
                        closed_by: null,
                        speciality: isSpecialist ? "" : " (" + notification.payload.speciality + ")" ,
                        spec_name: notification.payload.isAnonymous ? notification.payload.first_name : notification.payload.first_name + " " + notification.payload.second_name[0] + "."
                    })
                break;
            case "closed":
                navigation.navigate("ChatScreen",
                    {
                        id: notification.payload.chat_id,
                        user_id: notification.payload.user_id,
                        closed_by: true,
                        speciality: isSpecialist ? "" : " (" + notification.payload.speciality + ")" ,
                        spec_name: notification.payload.isAnonymous ? notification.payload.first_name : notification.payload.first_name + " " + notification.payload.second_name[0] + "."
                    })
                break;
            case "review":
                Linking.openURL(Routes.reviewURL)
                break;
            default: 
                console.log("default")
        }
    }

    useEffect(() => { 
        Notifications.registerRemoteNotifications();  

        global.countSended == 0 &&
        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            global.deviceToken = event.deviceToken
            Request.post(Routes.SaveDeviceToken, {
                token: event.deviceToken,
                type: Platform.OS == 'ios' ? 1 : 2
            })
            global.countSended += 1
        })
        
        Notifications.events().registerNotificationOpened((notification, completion, action) => {
            if (notification?.payload){
                navigateToSrcreenType(notification)
            }
        })

        Notifications.getInitialNotification().then(
            (notification) => {
                if (notification?.payload){
                    navigateToSrcreenType(notification)
                }
            }
        )
    }, [])

    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: MultiPlatform.AdaptivePixelsSize(50),
                },
            }}
        >
            {   !isSpecialist &&
                (<BottomTab.Screen
                    name="MainScreen"
                    component={ MainScreen }
                    options={{
                        title: "Кабинеты",
                        headerShown: true,
                        headerBackVisible: true,
                        headerStyle: {
                            backgroundColor: "#F3F4F6",
                        },
                        headerTitleStyle: {
                            color: "#434A53",
                            fontWeight: '700',
                            fontSize: MultiPlatform.AdaptivePixelsSize(21),
                        },
                        tabBarActiveTintColor: "#54B9D1",
                        tabBarInactiveTintColor: "#AAB2BD",
                        headerTitle: "Консультация врача",
                        headerShadowVisible: false,
                        tabBarLabelStyle: {
                            fontSize: MultiPlatform.AdaptivePixelsSize(13)
                        },
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    style={{ width: MultiPlatform.AdaptivePixelsSize(22),
                                        height: MultiPlatform.AdaptivePixelsSize(22), tintColor: focused ? "#54B9D1" : "#AAB2BD" }}
                                    source={ require('../images/notepad.png') }
                                />
                            )
                        },
                    }}
                />)
            }
            <BottomTab.Screen
                name="MessagesScreen"
                component={ MessagesScreen }
                options={{
                    title: "Консультации",
                    headerStyle: {
                        backgroundColor: '#FFFFFF'
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: "#434A53",
                        fontWeight: '500',
                        fontSize: MultiPlatform.AdaptivePixelsSize(19),
                    },
                    tabBarActiveTintColor: "#54B9D1",
                    tabBarInactiveTintColor: "#AAB2BD",
                    headerBackVisible: false,
                    tabBarLabelStyle: {
                        fontSize: MultiPlatform.AdaptivePixelsSize(13)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={{ width: MultiPlatform.AdaptivePixelsSize(18), height: MultiPlatform.AdaptivePixelsSize(24), tintColor: focused ? "#54B9D1" : "#AAB2BD"  }}
                                source={ require('../images/notification.png') }/>
                        )
                    },
                    tabBarIconStyle: {
                        tabBarActiveTintColor: "#54B9D1",
                        tabBarInactiveTintColor: "#AAB2BD",
                    }
                }}
            />
            <BottomTab.Screen
                name="ProfileScreen"
                component={ ProfileScreen }
                options={{
                    title: "Профиль",
                    headerStyle: {
                        backgroundColor: '#FFFFFF'
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: "#434A53",
                        fontWeight: '500',
                        fontSize: MultiPlatform.AdaptivePixelsSize(19),
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => logOut()}
                                style={{ paddingRight: 12 }}
                            >
                                <Image
                                    style={{
                                        width: MultiPlatform.AdaptivePixelsSize(24),
                                        height: MultiPlatform.AdaptivePixelsSize(24),
                                        tintColor: '#434A53'
                                    }}
                                    source={ require('../images/signout.png') }
                                />
                            </TouchableOpacity>
                        )
                    },
                    tabBarActiveTintColor: "#54B9D1",
                    tabBarInactiveTintColor: "#AAB2BD",
                    headerBackVisible: false,
                    tabBarLabelStyle: {
                        fontSize: MultiPlatform.AdaptivePixelsSize(13)
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={ !userData?.photo ? { ...styles.imageStyle, tintColor: focused ? "#54B9D1" : "#AAB2BD" } : {...styles.imageStyle}}
                                source={ !userData?.photo ? require('../images/user.png') : { uri: Routes.imageURL + userData.photo }} />
                        )
                    },
                    tabBarIconStyle: {
                        tabBarActiveTintColor: "#54B9D1",
                        tabBarInactiveTintColor: "#AAB2BD",
                    }
                }}
            />
        </BottomTab.Navigator>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: MultiPlatform.AdaptivePixelsSize(26),
        height: MultiPlatform.AdaptivePixelsSize(26),
        borderRadius: 100,
    }
})

export default MainNavigationScreen;
