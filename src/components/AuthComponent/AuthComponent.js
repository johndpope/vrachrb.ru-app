import React from 'react'
import { View, StyleSheet } from 'react-native'
import VkLoginButton from './VkLoginButton'
import MainAuthButton from './MainAuthButton'
import SecondAuthButton from './SecondAuthButton'
import IOSAppleLoginButton from "./IOSAppleLoginButton";
import appleAuth from "@invertase/react-native-apple-authentication";

const AuthComponent = () => {
    return (
        <View style={ styles.centerComponent }>
            { Platform.OS === "ios" && appleAuth.isSupported && (
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
