import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image } from 'react-native';
import backButtonImage from '../../images/back.png'

const BackButton = () => {

    const navigation = useNavigation()

    return (
        <View style={{
            height: '100%',
            justifyContent: 'center',
            position: 'absolute',
            left: 14
        }}>
            <TouchableOpacity
                onPress={ () => navigation.goBack() }
            >
                <Image  
                    style={{
                        width: 30,
                        height: 25,
                        tintColor: '#434A53'
                    }}
                    source={ backButtonImage }
                />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton;
