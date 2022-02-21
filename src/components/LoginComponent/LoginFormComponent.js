import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import Storage from "../../storage/Storage";
import Request from '../../requests/Request';
import RecoveryPassword from './RecoveryPassword';
import BaseSendButton from "../AuthComponent/BaseSendButton";
import BaseTextInput from "../AuthComponent/BaseTextInput";
import SecondAuthButton from '../AuthComponent/SecondAuthButton';
import { MultiPlatform } from '../MultiPlatform';
import Routes from "../../requests/Routes";


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
        let request = await Request.post(Routes.signInURL, data);

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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', width: '85%', padding: 10}}
            >     
                <View style={{width: MultiPlatform.AdaptivePixelsSize(350)}}>
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        backgroundColor: 'white',
        flex: MultiPlatform.AdaptivePixelsSize(0.7),
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputStyle: {
        borderBottomWidth: 2,
        width: MultiPlatform.AdaptivePixelsSize(350),
        marginTop: 20,
        fontSize: 17,
        borderRadius: 1,
        color: '#434A53',
    },
    btnBottom: {
        width: MultiPlatform.AdaptivePixelsSize(350),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    textStyle: {
        color: '#FFFFFF',
        fontSize: 17
    }
});

export default LoginFormComponent
