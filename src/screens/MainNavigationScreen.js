import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import MessagesScreen from './MessagesScreen';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProfileScreen from './ProfileScreen';
import {useDispatch, useSelector} from "react-redux";
import { MultiPlatform } from '../components/MultiPlatform';
import { useNavigation } from '@react-navigation/native';
import Request from '../requests/Request';
import { resetUserData } from '../store/reducers/LoginSlice';
import Storage from '../storage/Storage';
import baseApiURL from '../requests/baseApiURL';

const BottomTab = createBottomTabNavigator()

const MainNavigationScreen = () => {

    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)
    const userData = useSelector(state => state.LoginSlice.userData)
    
    const dispatch = useDispatch();

    const navigation = useNavigation()

    const logOut = async () => {
        let response = await Request.get(baseApiURL + "SignOut", {})

        response["response"] && dispatch(resetUserData())
        && navigation.reset({
            index: 0,
            routes: [{ name: 'AuthScreen' }],
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
    console.log(userData?.photo)
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
                        // headerTitleAlign: 'center',
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
                        fontWeight: '700',
                        fontSize: MultiPlatform.AdaptivePixelsSize(21),
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
                component={ MessagesScreen }
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
                        fontWeight: '700',
                        fontSize: MultiPlatform.AdaptivePixelsSize(21),
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity 
                                onPress={() => logOut()}
                                style={{ right: MultiPlatform.AdaptivePixelsSize(12) }}
                            >
                                <Image 
                                    style={{ 
                                        width: MultiPlatform.AdaptivePixelsSize(26), 
                                        height: MultiPlatform.AdaptivePixelsSize(26),
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
                                source={ !userData?.photo ? require('../images/user.png') : { uri: baseURL + "u/i/" + userData.photo }} />
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
