import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image } from 'react-native';
import backButtonImage from '../../images/back.png'

const BackButton = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
                style={{
                    width: 35,
                    height: 50,
                    tintColor: '#434A53'
                }}
                source={backButtonImage}
            />
        </TouchableOpacity>
    )
}

export default BackButton;
