import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const CancelButton = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
            onPress={() => {
                navigation.reset({
                        index: 0,
                        routes: [{ name: 'MainScreen' }],
                    }) 
                }}
            style={{
            }}>
            <Text style={{
                fontSize: 21,
                color: '#434A53',
                fontWeight: '700'
            }}>Отмена</Text>
        </TouchableOpacity>
    )
}

export default CancelButton;
