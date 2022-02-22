import React, { Component, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import VKLogin from 'react-native-vkontakte-login';
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';
import Modal from "react-native-modal";
import AgreementComponent from './AgreementComponent';
import QuestionTitleBase from '../AnamnezBaseComponent/QuestionTitleBase';

const VkLoginButton = () => {

    const [isModalVisible, setModalVisible] = useState(false)
    const [agr1, setAgr1] = useState(false)
    const [agr2, setAgr2] = useState(false)
    const [agr3, setAgr3] = useState(false)

    useEffect(() => {
        VKLogin.initialize(8086048)
    }, [])

    const loginWithVk = async () => {
        try {
            VKLogin.logout()
            const auth = await VKLogin.login(['first_name', 'last_name', 'photo', 'sex', 'email', 'nohttps']);
            console.log(JSON.stringify(auth))
        } catch (e){
            console.log("ERORR")
        }
    }

    return (
        <View>
            {
                isModalVisible && (
                    <Modal
                        style={{ justifyContent: 'flex-end', margin: 0}} 
                        isVisible={isModalVisible} 
                        swipeDirection={['down']}
                        backdropTransitionOutTiming={0}
                        backdropTransitionInTiming={0}
                        onSwipeComplete={() => setModalVisible(!isModalVisible)}
                        swipeThreshold={80}
                        propagateSwipe={false}
                    >
                        <View            
                            style={{ 
                                backgroundColor: 'white', 
                                borderTopRightRadius: 20, 
                                borderTopLeftRadius: 20,
                                alignItems: 'center', 
                                paddingLeft: 35,
                                paddingRight: 35
                            }}
                        >
                            <View style={{ width: '30%', height: MultiPlatform.AdaptivePixelsSize(6), backgroundColor: '#AAB2BD', top: MultiPlatform.AdaptivePixelsSize(-8), borderRadius: 100, opacity: 0.8, marginBottom: 20 }} />
                            <QuestionTitleBase question="Примите пользовательское соглашение" /> 
                            <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <AgreementComponent setValue={setAgr1} index={0}/>
                                <AgreementComponent setValue={setAgr2} index={1}/>
                                <AgreementComponent setValue={setAgr3} index={2}/>
                            </View>
                            <TouchableOpacity style={{ marginBottom: 20, height: 60, width: '85%', backgroundColor: 'red'  }}>
                                <Text>Согласен</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                )
            }
            <TouchableOpacity 
                style={ styles.btnStyle }
                onPress={() => { loginWithVk(), setModalVisible(!isModalVisible) }}
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
