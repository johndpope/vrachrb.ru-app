import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
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
            style={{ paddingLeft: 30, paddingTop: 10, paddingBottom: 10 }}
        >
            <Text style={{
                fontSize: MultiPlatform.AdaptivePixelsSize(21),
                color: '#434A53',
                fontWeight: '400'
            }}>Отмена</Text>
        </TouchableOpacity>
    )
}

export default CancelButton;
