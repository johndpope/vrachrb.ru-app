import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const MainScreen = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ Screen1 } />
            <Tab.Screen name="Settings" component={ Screen2 } />
        </Tab.Navigator> 
    )
}

export default MainScreen
