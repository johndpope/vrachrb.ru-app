import React, { useEffect, useContext, Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CabinetScreen from './CabinetScreen';
import SpecialistScreen from './SpecialistScreen';
import { ContextApp } from '../store/reducers/Reducer';

const Tab = createMaterialTopTabNavigator();



const MainScreen = (props) => {

    const { dispatch } = useContext(ContextApp)

    useEffect(() => dispatch({ type: 'AUTH' }), [])

    return(
        <Tab.Navigator 
            tabBarOptions={{ 
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "#FFFFFF",  
                labelStyle: { 
                    fontSize: 17,
                    color: '#AAB2BD',
                },
                style: { 
                    backgroundColor: '#F3F4F6',
                    elevation: 0,
                    shadowColor: "#000000",
                    shadowOffset: { width: 0, height: 10 }, // change this for more shadow
                    shadowOpacity: 0.4,
                    shadowRadius: 6
                },               
                tabStyle: { 
                    margin: 5,
                },
                indicatorStyle: { 
                    backgroundColor: '#54B9D1', 
                    height: 4, 
                    borderRadius: 3,
                    marginLeft: 11,
                    width: '45%'
                },
                
            }}
        >
            <Tab.Screen name="Кабинет" component={ CabinetScreen } />
            <Tab.Screen name="Специалист" component={ SpecialistScreen } />
        </Tab.Navigator> 
    )
}

export default MainScreen
