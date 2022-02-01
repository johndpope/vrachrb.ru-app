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


const RegisterFormComponent = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const [name, setName]            = useState("")
    const [familia, setFamilia]      = useState("")
    const [last_name, setLast_name]  = useState("")
    const [gender, setGender]        = useState("")
    const [birth_date, setBirth_date]= useState("")
    const [phone, setPhone]          = useState("")
    const [email, setEmail]          = useState("")
    const [password, setPassword]    = useState("")

    const [response, setResponse]    = useState("")
    const [loading, setLoading] = useState(false)

    const register = async () => {
        setLoading(true)
        let data = {
            name:       name,
            familia:    familia,
            last_name:  last_name,
            gender:     gender,
            birth_date: birth_date,
            phone:      phone,
            email:      email,
            password:   password,
        }
        // console.log(JSON.stringify(data))
        let request = await Request.post(baseApiURL + "Register", data);

        setResponse(request)

        request['response'] &&
        dispatch(saveUserData(request))

        request['response'] &&
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
            })

        // Alert.alert(
        //     "Условия пользования сервисом",
        //     "Вы согласны с действующими требованиями" + <Text></Text>,
        //     [
        //         {
        //             text: "Cancel",
        //             onPress: () => console.log("Cancel Pressed"),
        //             style: "cancel"
        //         },
        //         { text: "OK", onPress: () => console.log("OK Pressed") }
        //     ]
        // );
        setLoading(false)
    }

    const checkFilledField = () => {
        if (name && familia && last_name && gender && birth_date && phone && email && password){
            return true
        } else {
            return false
        }
    }

    return (
        <View style={ styles.mainBlock }>
            <View>
                <BaseTextInput response={response} hint={"Имя"} setValue={setName}/>
                <BaseTextInput response={response} hint={"Фамилия"} setValue={setFamilia}/>
                <BaseTextInput response={response} hint={"Отчество"} setValue={setLast_name}/>
                <BaseTextInput response={response} hint={"Пол"} setValue={setGender}/>
                <BaseTextInput response={response} hint={"Дата рождения"} setValue={setBirth_date}/>
                <BaseTextInput response={response} hint={"Номер телефона"} setValue={setPhone}/>
                <BaseTextInput response={response} hint={"Электронная почта"} setValue={setEmail}/>
                <BaseTextInput response={response} hint={"Пароль"} setValue={setPassword} pass={true}/>
                { response['error'] &&
                    <Text style={{ color: "#F27C83", fontSize: 15 }}>{response['error']}</Text>
                }
            </View>
            <View style={ styles.btnBottom }>
                <TouchableOpacity 
                    style={{ 
                        ...styles.btnStyle,
                        backgroundColor: checkFilledField() ? '#54B9D1' : '#F3F4F6',
                    }}
                    onPress={
                        () => register()
                    }
                    disabled={!checkFilledField()}
                >
                    <Text style={{ 
                        ...styles.textStyle,
                        color: checkFilledField() ? "#FFFFFF" : "#AAB2BD"
                    }}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <SecondAuthButton text={"Авторизоваться"} nav={"MailLoginScreen"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBlock: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInputStyle: {
        borderBottomWidth: 2,
        width: 350,
        marginTop: 5,
        fontSize: 17,
        borderRadius: 1,
        color: '#434A53'
    },
    btnBottom: {
        // flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
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

export default RegisterFormComponent
