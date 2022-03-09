import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import VkLoginButton from './VkLoginButton'
import MainAuthButton from './MainAuthButton'
import SecondAuthButton from './SecondAuthButton'
import IOSAppleLoginButton from "./IOSAppleLoginButton";

const AuthComponent = () => {
    return (
        <View style={ styles.centerComponent }>
            { Platform.OS === "ios" && (
                <IOSAppleLoginButton/>
            )}
            <VkLoginButton />
            <MainAuthButton text={"Электронная почта"} nav={"MailLoginScreen"} />
            <SecondAuthButton text={"Регистрация"} nav={"RegisterScreen"} />
        </View>
    )
}

const styles = StyleSheet.create({
    centerComponent: {
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})

export default AuthComponent
