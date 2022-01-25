import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import baseApiURL from '../../requests/baseApiURL'
import Request from '../../requests/Request'

const LoginButton = ({ isFilledForm, email, password }) => {

    const navigation = useNavigation()


    return (
        <View>

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
