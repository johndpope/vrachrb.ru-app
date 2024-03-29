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
import UtilitySlice from '../store/reducers/UtilitySlice';

const BottomTab = createBottomTabNavigator()

global.deviceToken = ""
global.countSended = 0

const MainNavigationScreen = () => {

    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)
    const userData = useSelector(state => state.LoginSlice.userData)
    const setBottomNavigationEnd = useSelector(state => state.UtilitySlice.bottomNavigationEnd)

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
                    position: 'absolute',
                    backgroundColor: '#FFF',
                    height: MultiPlatform.AdaptivePixelsSize(60),
                    left: '25%',
                    right: '25%',
                    bottom: 15,
                    borderRadius: 75,
                    borderTopWidth: 0,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: setBottomNavigationEnd ? 0 : 9,
                    },
                    shadowOpacity: setBottomNavigationEnd ? 0 : 0.48,
                    shadowRadius: setBottomNavigationEnd ? 0 : 11.95,
                    elevation: setBottomNavigationEnd ? 0 : 18,
                }
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
                        headerTitleAlign: 'left',
                        tabBarLabelStyle: {
                            fontSize: MultiPlatform.AdaptivePixelsSize(13)
                        },
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Image
                                    style={{ width: MultiPlatform.AdaptivePixelsSize(23),
                                        height: MultiPlatform.AdaptivePixelsSize(23), tintColor: focused ? "#54B9D1" : "#AAB2BD" }}
                                    source={ require('../images/navigation/notepad.png') }
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
                                style={{ width: MultiPlatform.AdaptivePixelsSize(24), 
                                    height: MultiPlatform.AdaptivePixelsSize(24), tintColor: focused ? "#54B9D1" : "#AAB2BD" }}
                                source={ require('../images/navigation/messages.png') }/>
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
                                style={{ padding: MultiPlatform.AdaptivePixelsSize(12) }}
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
                                style={ !userData?.photo ? { ...styles.imageStyle, tintColor: focused ? "#54B9D1" : "#AAB2BD" } : {width: 25, height: 25, borderRadius: 100}}
                                source={ !userData?.photo ? require('../images/navigation/profile.png') : { uri: Routes.imageURL + userData.photo }} />
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
        width: MultiPlatform.AdaptivePixelsSize(24),
        height: MultiPlatform.AdaptivePixelsSize(24),
    }
})

export default MainNavigationScreen;
