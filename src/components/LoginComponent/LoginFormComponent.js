import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import Storage from "../../storage/Storage";
import baseApiURL from '../../requests/baseApiURL';
import Request from '../../requests/Request';
import RecoveryPassword from './RecoveryPassword';
import BaseSendButton from "../AuthComponent/BaseSendButton";
import BaseTextInput from "../AuthComponent/BaseTextInput";
import SecondAuthButton from '../AuthComponent/SecondAuthButton';


const LoginFormComponent = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async () => {
        setLoading(true)
        let data = { user: email, password: password }
        let request = await Request.post(baseApiURL + "SignIn", data);

        setResponse(request)

        request['auth'] && dispatch(saveUserData(request))
        && navigation.reset({
            index: 0,
            routes: [{ name: 'MainNavigationScreen' }],
        })
        await Storage.save("userData", request)
        setLoading(false)
    }

    const checkFilledField = () => {
        if (email && password){
            return true
        } else {
            return false
        }
    }

    return (
        <View style={ styles.mainBlock }>
            <View style={{width: 350}}>
                <BaseTextInput response={response} hint={"Электронная почта"} setValue={setEmail}/>
                { response['error'] &&
                    <Text style={{ color: "#F27C83", fontSize: 15 }}>Неверный логин или пароль</Text>
                }
                <BaseTextInput response={response} hint={"Пароль"} setValue={setPassword} pass={true}/>
                <RecoveryPassword />
            </View>
            <View style={ styles.btnBottom }>
                <BaseSendButton text={"Войти"} checkFields={checkFilledField} onPress={login} loading={loading}/>
                <SecondAuthButton text={"Зарегистрироваться"} nav={"RegisterScreen"}/>
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
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'scroll',
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
        alignItems: 'center',
        marginTop: 25
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
    }
});

export default LoginFormComponent
