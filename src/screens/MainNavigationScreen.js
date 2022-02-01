import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import MessagesScreen from './MessagesScreen';
import { Image, TouchableOpacity } from 'react-native';
import BackButton from '../components/HeaderComponent/BackButton';
import { useNavigation } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator()

const MainNavigationScreen = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen 
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
                        fontSize: 21,
                    },
                    tabBarActiveTintColor: "#54B9D1",
                    tabBarInactiveTintColor: "#AAB2BD",
                    headerTitle: "Консультация врача",
                    headerShadowVisible: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image 
                                style={{ width: 22, height: 22, tintColor: focused ? "#54B9D1" : "#AAB2BD" }}
                                source={ require('../images/notepad.png') }
                            />
                        )
                    },
                }}                
            />
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
                        fontSize: 21,
                    },
                    tabBarActiveTintColor: "#54B9D1",
                    tabBarInactiveTintColor: "#AAB2BD",
                    headerBackVisible: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image 
                                style={{ width: 18, height: 24, tintColor: focused ? "#54B9D1" : "#AAB2BD"  }} 
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
        </BottomTab.Navigator>
    )
}

export default MainNavigationScreen;