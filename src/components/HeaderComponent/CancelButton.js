import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { resetAllValues } from '../../store/reducers/AnamnezSlice';
import { MultiPlatform } from '../MultiPlatform';

const CancelButton = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            onPress={() => {
                navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainNavigationScreen' }],
                    }) 
                }}
            style={{
            }}>
            <Text style={{
                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                color: '#434A53',
                fontWeight: '700'
            }}>Отмена</Text>
        </TouchableOpacity>
    )
}

export default CancelButton;
