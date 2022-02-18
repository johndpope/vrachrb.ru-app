import React, { Component, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import VKLogin from 'react-native-vkontakte-login';
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';

const VkLoginButton = () => {

    useEffect(() => {
        VKLogin.initialize(3280318)
    }, [])

    const loginWithVk = async () => {
        try {
            const auth = await VKLogin.login(['first_name', 'last_name', 'photo', 'sex', 'email']);
            console.log(JSON.stringify(auth))

        } catch (e){
            console.log("ERORR")
        }
    }

    return (
        <View>
            <TouchableOpacity 
                style={ styles.btnStyle }
                onPress={() => loginWithVk()}
            >
                <Text style={ styles.textStyle }>Войти через VK</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.BG_COLOR_WHITE,
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: MultiPlatform.AdaptivePixelsSize(320),
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: colors.VK_BTN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})

export default VkLoginButton
