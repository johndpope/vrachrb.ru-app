import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const VkLoginButton = () => {
    return (
        <View>
            <TouchableOpacity 
                style={ styles.btnStyle }
            >
                <Text style={ styles.textStyle }>Войти через VK</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#FFFFFF',
        fontSize: 17
    },
    btnStyle: {
        width: 320,
        height: 60,
        backgroundColor: '#3375F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})

export default VkLoginButton
