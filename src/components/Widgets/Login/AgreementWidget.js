import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { useDispatch } from 'react-redux';
import Request from '../../../requests/Request';
import Routes from '../../../requests/Routes';
import Storage from '../../../storage/Storage';
import { saveUserData } from '../../../store/reducers/LoginSlice';
import { colors } from '../../../styles/colors';
import QuestionTitleBase from '../../AnamnezBaseComponent/QuestionTitleBase';
import AgreementComponent from '../../AuthComponent/AgreementComponent';
import { MultiPlatform } from '../../MultiPlatform';

const AgreementWidget = ({ isVisible, setVisible, vkData }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [agr1, setAgr1] = useState(false)
    const [agr2, setAgr2] = useState(false)
    const [agr3, setAgr3] = useState(false)

    const sendAgreement = async () => {
        const resp = await Request.post(Routes.signInVK, 
            {
                user_id: vkData.user_id, 
                access_token: vkData.access_token,
                email: vkData.email != null ? vkData.email : "null",
                agreement: true
            })

        if (resp?.auth) { 
            dispatch(saveUserData(resp.userData))
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigationScreen' }],
            })
            await Storage.save("userData", resp.userData)
        } else {
            MultiPlatform.ToastShow("Ошибка авторизации")
        }
    }

    return (
        <Modal
            style={{ justifyContent: 'flex-end', margin: 0}} 
            isVisible={isVisible} 
            swipeDirection={['down']}
            backdropTransitionOutTiming={0}
            backdropTransitionInTiming={0}
            onSwipeComplete={() => setVisible(!isVisible)}
            swipeThreshold={80}
            propagateSwipe={false}
        >
            <View            
                style={{ 
                    backgroundColor: 'white', 
                    borderTopRightRadius: 20, 
                    borderTopLeftRadius: 20,
                    alignItems: 'center', 
                    paddingLeft: MultiPlatform.AdaptivePixelsSize(18),
                    paddingRight: MultiPlatform.AdaptivePixelsSize(18)
                }}
            >
                <View style={{ width: '30%', height: MultiPlatform.AdaptivePixelsSize(6), backgroundColor: '#AAB2BD', top: MultiPlatform.AdaptivePixelsSize(-8), borderRadius: 100, opacity: 0.8, marginBottom: 20 }} />
                <QuestionTitleBase question="Примите пользовательское соглашение" /> 
                <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <AgreementComponent setValue={setAgr1} index={0}/>
                    <AgreementComponent setValue={setAgr2} index={1}/>
                    <AgreementComponent setValue={setAgr3} index={2}/>
                </View>
                <TouchableOpacity
                    disabled={!(agr3 && agr2 && agr1)} 
                    onPress={() => sendAgreement()}
                    style={{ ...styles.btnAgreementStyle, 
                        backgroundColor: (agr3 && agr2 && agr1) ? '#58BE3F' : '#F3F4F6' }}
                >
                    <Text style={{ ...styles.btnTextStyle, color: (agr3 && agr2 && agr1) ? colors.BG_COLOR_WHITE : colors.MEDIUM_GRAY_COLOR }}>Согласен</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    btnAgreementStyle: { 
        marginBottom: 20, 
        height: 60, 
        width: '100%', 
        borderRadius: 16,   
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTextStyle: {
        fontSize: MultiPlatform.AdaptivePixelsSize(17) 
    }
})

export default AgreementWidget