import React, { Component, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import VKLogin from 'react-native-vkontakte-login';
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';
import Request from '../../requests/Request'
import Routes from '../../requests/Routes';
import AgreementWidget from '../Widgets/Login/AgreementWidget';
import Storage from '../../storage/Storage';
import { saveUserData } from '../../store/reducers/LoginSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const VkLoginButton = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [isModalVisible, setModalVisible] = useState(false)
    const [vkAuthData, setVkAuthData] = useState()

    useEffect(() => {
        VKLogin.initialize(8086048)
    }, [])

    const loginWithVk = async () => {
        try {
            // VKLogin.logout()
            const auth = await VKLogin.login(['first_name', 'last_name', 'photo', 'sex', 'email']);
            setVkAuthData(auth)
            console.log(JSON.stringify(auth))
            const resp = await Request.post(Routes.signInVK, 
                {
                    user_id: auth.user_id, 
                    access_token: auth.access_token,
                    email: auth.email ? auth.email : "null"
                })
            
            if (resp?.error){ 
                return MultiPlatform.ToastShow(resp.error) 
            }

            console.log(resp)

            if (resp?.auth) { 
                dispatch(saveUserData(resp.userData))
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainNavigationScreen' }],
                })
                await Storage.save("userData", resp.userData)
            } else {
                setModalVisible(true)
            }
        } catch (e){
            console.log("ERORR")
        }
    }

    return (
        <TouchableOpacity style={ styles.container }
                          onPress={() => { loginWithVk() }}>
            {
                isModalVisible && (
                    <AgreementWidget isLogin={false} vkData={vkAuthData} isVisible={isModalVisible} setVisible={setModalVisible} />
                )
            }
            <View style={ styles.btnStyle }>
                <Text style={ styles.textStyle }>Войти через VK</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.BG_COLOR_WHITE,
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    container: {
        width: '80%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: colors.VK_BTN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    btnStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default VkLoginButton
