import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { MultiPlatform } from '../../MultiPlatform'

const CustomComposer = ({ data }) => {
    return (
        <View
            {...data}
            style={{
                width: '100%',
                height: MultiPlatform.AdaptivePixelsSize(48),
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: '#F27C83', fontSize: MultiPlatform.AdaptivePixelsSize(17) }}>Вопрос закрыт</Text>
        </View>
    )
}

export default CustomComposer