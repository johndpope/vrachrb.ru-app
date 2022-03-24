import React from 'react'
import { View, StatusBar } from 'react-native';
import { MultiPlatform } from '../components/MultiPlatform';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CabinetScreen from './CabinetScreen';
import SpecialistScreen from './SpecialistScreen';

const Tab = createMaterialTopTabNavigator();

const MainScreen = (props) => {
    return(
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {
                Platform.OS == 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"}/>
            }
            <Tab.Navigator
                tabBarOptions={{
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "#FFFFFF",
                    allowFontScaling: false,
                    labelStyle: {
                        fontSize: MultiPlatform.AdaptivePixelsSize(17),
                        color: '#AAB2BD',
                        textTransform: "none",
                        fontWeight: "500",
                    },
                    style: {
                        backgroundColor: '#F3F4F6',
                    },
                    tabStyle: {
                        margin: 5,
                    },
                    indicatorStyle: {
                        backgroundColor: '#54B9D1',
                        height: 4,
                        borderRadius: 3,
                        marginLeft: 11,
                        width: '45%',
                    }
                }}
                tabBarLabelStyle={{fontSize: 12}}
            >
                <Tab.Screen name="Кабинет" component={ CabinetScreen } options={{tabBarLabel:'Кабинет'}} />
                <Tab.Screen name="Специалист" component={ SpecialistScreen } />
            </Tab.Navigator>
        </View>
    )
}

export default MainScreen
