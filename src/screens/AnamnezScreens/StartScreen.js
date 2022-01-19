import React, { useEffect, useContext, Component } from 'react'
import { View, Text } from 'react-native'
import { ContextApp } from '../store/reducers/Reducer';

const StartScreen = (props) => {
    return (
        <View>
            <Text style={{ color: 'black' }}>Hello</Text>
        </View>
    )
}

export default StartScreen
