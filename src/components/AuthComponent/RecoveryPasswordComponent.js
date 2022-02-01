import React, { useState, Component, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import baseApiURL from '../../requests/baseApiURL';
import Request from '../../requests/Request';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import MainAuthButton from "../AuthComponent/MainAuthButton";
import BaseTextInput from "../AuthComponent/BaseTextInput";
import BaseSendButton from "./BaseSendButton";


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
        let request = await Request.post(baseApiURL + "Recover_password", data);

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
            <View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        backgroundColor: 'white',
        flex: 0.7,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textInputStyle: {
        borderBottomWidth: 2,
        width: 350,
        marginTop: 20,
        fontSize: 17,
        borderRadius: 1,
        color: '#434A53'
    },
    btnBottom: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 17
    },
    btnStyle: {
        width: 320,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    positiveResponseStyle: {
        width: 350,
        color: "#58BE3F",
        fontSize: 15
    },
    negativeResponseStyle: {
        width: 350,
        color: "#F27C83",
        fontSize: 15
    },
});

export default RecoveryPasswordComponent
