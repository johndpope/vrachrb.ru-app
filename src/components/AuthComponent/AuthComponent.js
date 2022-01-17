import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import VkLoginButton from './VkLoginButton'
import MailLoginButton from './MailLoginButton'
import RegisterComponent from './RegisterComponent'

const AuthComponent = ({ navigation }) => {
    return (
        <View style={ styles.centerComponent }>
            <VkLoginButton />
            <MailLoginButton />
            <View>
                <RegisterComponent />
            </View>
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
