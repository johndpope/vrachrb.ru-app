import React, { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Image } from 'react-native';
import backButtonImage from '../../images/back.png'
import { RFValue } from 'react-native-responsive-fontsize';
import { MultiPlatform } from '../MultiPlatform';

const BackButton = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
                style={{
                    width: MultiPlatform.AdaptivePixelsSize(33),
                    height: MultiPlatform.AdaptivePixelsSize(47),
                    tintColor: '#434A53'
                }}
                source={backButtonImage}
            />
        </TouchableOpacity>
    )
}

export default BackButton;
