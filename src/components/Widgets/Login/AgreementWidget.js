import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import Request from '../../../requests/Request';
import Routes from '../../../requests/Routes';
import Storage from '../../../storage/Storage';
import { saveUserData } from '../../../store/reducers/LoginSlice';
import { colors } from '../../../styles/colors';
import QuestionTitleBase from '../../AnamnezBaseComponent/QuestionTitleBase';
import AgreementComponent from '../../AuthComponent/AgreementComponent';
import { MultiPlatform } from '../../MultiPlatform';

const AgreementWidget = ({ setResponse = null, isLogin = false, isVisible, setVisible, vkData }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [agreement, setAgreement] = useState()

    const sendAgreement = async () => {
        const resp = isLogin ? 
            await Request.post(Routes.signInURL, vkData) :
            await Request.post(Routes.signInVK, 
                {
                    user_id: vkData.user_id, 
                    access_token: vkData.access_token,
                    email: vkData.email != null ? vkData.email : "null",
                    agreement: true
                })

        if (resp?.auth) { 
            console.log("resp.userData ", resp)
            dispatch(saveUserData(isLogin ? resp : resp.userData))
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigationScreen' }],
            })
            await Storage.save("userData", isLogin ? resp : resp.userData)
        } else {
            setVisible(false)
            setResponse !== null && setResponse(resp)
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
                    paddingRight: MultiPlatform.AdaptivePixelsSize(18),
                    paddingLeft: MultiPlatform.AdaptivePixelsSize(18)
                }}
            >
                <View style={{ width: '30%', height: MultiPlatform.AdaptivePixelsSize(6), backgroundColor: '#AAB2BD', top: MultiPlatform.AdaptivePixelsSize(-8), borderRadius: 100, opacity: 0.8, marginBottom: 20 }} />
                <QuestionTitleBase question="Примите пользовательское соглашение" /> 
                <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <AgreementComponent setValue={setAgreement}/>
                </View>
                <TouchableOpacity
                    disabled={!agreement} 
                    onPress={() => sendAgreement()}
                    style={{ ...styles.btnAgreementStyle, 
                        backgroundColor: agreement ? '#58BE3F' : '#F3F4F6' }}
                >
                    <Text style={{ ...styles.btnTextStyle, color: agreement ? colors.BG_COLOR_WHITE : colors.MEDIUM_GRAY_COLOR }}>Согласен</Text>
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