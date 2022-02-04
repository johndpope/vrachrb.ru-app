import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

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
        fontSize: 17
    },
    btnStyle: {
        width: 320,
        height: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})

export default BaseSendButton
