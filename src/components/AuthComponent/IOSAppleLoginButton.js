import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { appleAuth, AppleError } from '@invertase/react-native-apple-authentication';
import {decode, encode} from 'base-64'
import appleImage from '../../images/apple.png'
import Request from "../../requests/Request";
import Routes from "../../requests/Routes";
import {saveUserData} from "../../store/reducers/LoginSlice";
import Storage from "../../storage/Storage";

const IOSAppleLoginButton = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    function parseJwt (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(decode(base64).toString().split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

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
            let jwt
            if (identityToken) {
                jwt = parseJwt(identityToken)
                if(appleAuthRequestResponse?.fullName?.familyName != null){
                    await Storage.save("AppleID-fullname", appleAuthRequestResponse.fullName)
                    console.log("FULLNAME сохранен" + JSON.stringify(appleAuthRequestResponse.fullName))
                }
                console.log("IOS::"+JSON.stringify(appleAuthRequestResponse))
                console.log("PARSE TOKEN1::"+JSON.stringify(jwt))

            } else {
                // no token, failed sign in
                return MultiPlatform.ToastShow("Попытка авторизации безуспешна")
            }

            // получить текущее состояние аутентификации для пользователя
            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            // Проверка на подлинность аутентификации
            if (credentialState === appleAuth.State.AUTHORIZED) {
                // пользователь прошел проверку подлинности
                let response = await Request.post(Routes.signWithApple, {
                        username : jwt?.sub
                    });
                if(response?.next){
                    navigation.navigate("NextAppleAuth", {
                            email: jwt?.email,
                            username: jwt?.sub
                        })
                } else if(response?.userData) {
                    let user = response.userData;
                    let newUser = {
                        auth: user?.auth,
                        isSpecialist: user?.isSpecialist,
                        first_name: user?.first_name,
                        second_name: user?.second_name,
                        middle_name: user?.middle_name,
                        username: user?.first_name + " " + user?.second_name,
                        gender: user?.gender,
                        birth_date: user?.birth_date + " .",
                        email: user?.email,
                        phone: user?.phone,
                        photo: user?.photo
                    }
                    dispatch(saveUserData(newUser))
                    await Storage.save("userData", newUser)
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'MainNavigationScreen'}],
                    })
                } else {
                    return MultiPlatform.ToastShow("Неизвестная ошибка")
                }
            }
        } catch (error) {
            if (error.code === "1001") {
                return MultiPlatform.ToastShow("Отмена авторизации по Apple ID")
            } else {
                return MultiPlatform.ToastShow("Что-то пошло не так")
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
        marginBottom: 6,
        // backgroundColor:'red'
    },
})

export default IOSAppleLoginButton
