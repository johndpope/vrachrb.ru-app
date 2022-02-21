import React, { useState, Component } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import Request from '../../requests/Request';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import BaseTextInput from "../AuthComponent/BaseTextInput";
import BaseSendButton from "./BaseSendButton";
import { MultiPlatform } from '../MultiPlatform';
import Routes from "../../requests/Routes";


const RecoveryPasswordComponent = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [email, setEmail]       = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const register = async () => {
        setLoading(true)

        let data = {
            email: email,
        }
        // console.log(JSON.stringify(data))
        let request = await Request.post(Routes.recoverPasswordURL, data);

        setResponse(request)
        // request['response'] &&
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'AuthScreen' }],
        // })

        setLoading(false)
    }

    const checkFilledField = () => {
        if (email){
            return true
        } else {
            return false
        }
    }

    return (
        <View style={ styles.mainBlock }>
            <ScrollView                
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', width: '85%', padding: 10}}
            >
                <View style={{width: MultiPlatform.AdaptivePixelsSize(350)}}>
                    <BaseTextInput response={response} hint={"Электронная почта"} setValue={setEmail}/>
                    { response['error'] &&
                    <Text style={styles.negativeResponseStyle}>{response['error']}</Text>
                    }
                    { response['response'] &&
                    <Text style={styles.positiveResponseStyle}>{response['response']}</Text>
                    }
                </View>
                <View style={ styles.btnBottom }>
                    <BaseSendButton text={"Восстановить"} checkFields={checkFilledField} onPress={register} loading={loading}/>
                    <SecondAuthButton text={"Вернуться"} nav={"AuthScreen"} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        backgroundColor: 'white',
        flex: 0.5,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBottom: {
        marginTop: MultiPlatform.AdaptivePixelsSize(25),
        width: MultiPlatform.AdaptivePixelsSize(350),
        justifyContent: 'center',
        alignItems: 'center'
    },
    positiveResponseStyle: {
        width: MultiPlatform.AdaptivePixelsSize(350),
        color: "#58BE3F",
        fontSize: MultiPlatform.AdaptivePixelsSize(15)
    },
    negativeResponseStyle: {
        width: MultiPlatform.AdaptivePixelsSize(350),
        color: "#F27C83",
        fontSize: MultiPlatform.AdaptivePixelsSize(15)
    },
});

export default RecoveryPasswordComponent
