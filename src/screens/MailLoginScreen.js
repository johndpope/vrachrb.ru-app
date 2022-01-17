import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import LoginFormComponent from '../components/LoginComponent/LoginFormComponent'

const MailLoginScreen = () => {
    return (
        <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: "#F3F4F6"
        }}>
            <View style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={require("../images/logo.png")} 
                />
            </View>
            <LoginFormComponent />
        </View>
    )
}

export default MailLoginScreen
