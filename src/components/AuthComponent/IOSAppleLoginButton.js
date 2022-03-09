import React, { Component, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {AppleButton} from "@invertase/react-native-apple-authentication";
import { appleAuth } from '@invertase/react-native-apple-authentication';


const IOSAppleLoginButton = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    async function onAppleButtonPress() {
        // выполняет запрос на вход в систему
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        // получить текущее состояние аутентификации для пользователя
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // Проверка на подлинность аутентификации
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // пользователь прошел проверку подлинности
            console.log("APPLE IOS::"+appleAuthRequestResponse)
        }
    }

    return (
        <View style={ styles.btnStyle }>
            <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={styles.appleStyle}
                onPress={() => onAppleButtonPress()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        width: '80%',
        height: MultiPlatform.AdaptivePixelsSize(60),
    },
    appleStyle: {
        width: '100%',
        height: '100%',
    }
})

export default IOSAppleLoginButton
