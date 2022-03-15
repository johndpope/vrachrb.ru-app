import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MultiPlatform } from '../MultiPlatform'

const BaseSendButton = ({ checkFields, onPress, text, loading }) => {

    return (
        <TouchableOpacity
            style={{
                ...styles.btnStyle,
                backgroundColor: checkFields() ? '#54B9D1' : '#F3F4F6',
            }}
            onPress={
                () => onPress()
            }
            disabled={!checkFields()}
        >
            { loading ? <ActivityIndicator color={'#fff'} size={'large'} /> : (
                <Text style={{
                    ...styles.textStyle,
                    color: checkFields() ? "#FFF" : "#AAB2BD"
                }}>{text}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#434A53',
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: '100%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})

export default BaseSendButton
