import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image } from 'react-native';
import backButtonImage from '../../images/back.png'
import { MultiPlatform } from '../MultiPlatform';

const BackButton = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingRight: 30, paddingTop: 10, paddingBottom: 10 }}
        >
            <Image
                style={{
                    width: MultiPlatform.AdaptivePixelsSize(27),
                    height: MultiPlatform.AdaptivePixelsSize(25),
                    tintColor: '#434A53'
                }}
                source={backButtonImage}
            />
        </TouchableOpacity>
    )
}

export default BackButton;
