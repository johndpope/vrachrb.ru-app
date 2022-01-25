import React, { useState, Component } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import RegisterComponent from '../AuthComponent/RegisterComponent';
import baseApiURL from '../../requests/baseApiURL';
import Request from '../../requests/Request';
import RecoveryPassword from './RecoveryPassword';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserData } from '../../store/reducers/LoginSlice';
import LoginSlice from '../../store/reducers/LoginSlice';


const LoginFormComponent = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse] = useState("")

    const login = async (user, passwd) => {
        let data = {user: user, password: passwd}
        let request = await Request.post(baseApiURL + "SignIn", data=data);
        
        console.log(request)

        setResponse(request)

        request['auth'] && dispatch(saveUserData(request))

        request['auth'] && 
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
            })
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
            <View>
                <TextInput 
                    style={{
                        ...styles.textInputStyle,
                        borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED"
                    }}
                    placeholder='Электронная почта'
                    placeholderTextColor="#AAB2BD"
                    onChangeText={text => setEmail(text)}
                />
                { response['error'] &&
                    <Text style={{ color: "#F27C83", fontSize: 15 }}>Неверный логин или пароль</Text>
                }
                <TextInput 
                    style={{
                        ...styles.textInputStyle,
                        borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED"
                    }}
                    placeholder='Пароль'
                    placeholderTextColor="#AAB2BD"
                    onChangeText={passwd => setPassword(passwd)}
                    secureTextEntry={true}
                />
                <RecoveryPassword />
            </View>
            <View style={ styles.btnBottom }>
                <TouchableOpacity 
                    style={{ 
                        ...styles.btnStyle,
                        backgroundColor: checkFilledField() ? '#54B9D1' : '#F3F4F6',
                    }}
                    onPress={
                        () => login(email, password)
                    }
                    disabled={!checkFilledField()}
                >
                    <Text style={{ 
                        ...styles.textStyle,
                        color: checkFilledField() ? "#FFFFFF" : "#AAB2BD"
                    }}>Войти</Text>
                </TouchableOpacity>
                <RegisterComponent />
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
    }
});

export default LoginFormComponent
