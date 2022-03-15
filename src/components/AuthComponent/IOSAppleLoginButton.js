import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {appleAuth, AppleError} from '@invertase/react-native-apple-authentication';
import appleImage from '../../images/apple.png'

const IOSAppleLoginButton = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    async function onAppleButtonPress() {
        try {
            // выполняет запрос на вход в систему
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });
            const {
                identityToken,
            } = appleAuthRequestResponse;
            console.log("IOS: ", JSON.stringify(appleAuthRequestResponse))
            // if (identityToken) {
            //
            //     // send data to server for verification and sign in
            //     const { ack, response } = await authFetch({
            //         url: 'sign-in-with-apple',
            //         body: {
            //             ...appleAuthRequestResponse,
            //             deviceId: deviceId
            //         }
            //     });
            //     if (ack === 'success') {
            //         // successfully verified, handle sign in
            //         await handleSignIn(response);
            //     }
            // } else {
            //     // no token, failed sign in
            // }

            // получить текущее состояние аутентификации для пользователя
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            // Проверка на подлинность аутентификации
            if (credentialState === appleAuth.State.AUTHORIZED) {
                // пользователь прошел проверку подлинности
                // console.log("APPLE IOS::" + JSON.stringify(appleAuthRequestResponse))
            }

        } catch (error) {
            if (error.code === AppleError.CANCELED) {
                // user cancelled Apple Sign-in
            } else {
                // other unknown error
            }
        }
    }

    return (
        <TouchableOpacity style={ {...styles.container, marginBottom: MultiPlatform.AdaptivePixelsSize(10)} }
                          onPress={() => { onAppleButtonPress() }}>
            <View style={ styles.btnStyle }>
                <Image style={ styles.imageStyle} source={appleImage}/>
                <Text style={ styles.textStyle }>Войти с Apple</Text>
                {/* НИЖЕ ЗАГЛУШКА для центрирования текста */}
                <Image style={{...styles.imageStyle, opacity: 0}} source={appleImage}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.BG_COLOR_WHITE,
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        // backgroundColor: 'red'
    },
    container: {
        width: '80%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: colors.APPLE_AUTH_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    btnStyle: {
        flex: 1,
        justifyContent: 'space-evenly', // space-evenly
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageStyle: {
        width: MultiPlatform.AdaptivePixelsSize(30),
        height: MultiPlatform.AdaptivePixelsSize(20),
        resizeMode: 'contain',
    },
})

export default IOSAppleLoginButton
