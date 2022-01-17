import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const LoginButton = ({ isFilledForm }) => {
    return (
        <View>
            <TouchableOpacity 
                style={{ 
                    ...styles.btnStyle,
                    backgroundColor: isFilledForm ? '#54B9D1' : '#F3F4F6',
                }}
            >
                <Text style={{ 
                    ...styles.textStyle,
                    color: isFilledForm ? "#FFFFFF" : "#AAB2BD"
                }}>Войти</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})
export default LoginButton
