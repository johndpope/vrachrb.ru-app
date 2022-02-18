import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import VkLoginButton from './VkLoginButton'
import MainAuthButton from './MainAuthButton'
import SecondAuthButton from './SecondAuthButton'

const AuthComponent = ({ navigation }) => {
    return (
        <View style={ styles.centerComponent }>
            <VkLoginButton />
            <MainAuthButton text={"Электронная почта"} nav={"MailLoginScreen"} />
            <SecondAuthButton text={"Регистрация"} nav={"RegisterScreen"} />
        </View>
    )
}

const styles = StyleSheet.create({
    centerComponent: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

export default AuthComponent
