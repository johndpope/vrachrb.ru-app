import React, { useState, Component } from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import RegisterComponent from '../AuthComponent/RegisterComponent';
import LoginButton from './LoginButton';
import RecoveryPassword from './RecoveryPassword';

const LoginFormComponent = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
                    style={ styles.textInputStyle }
                    placeholder='Электронная почта'
                    placeholderTextColor="#AAB2BD"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    style={ styles.textInputStyle }
                    placeholder='Пароль'
                    placeholderTextColor="#AAB2BD"
                    onChangeText={passwd => setPassword(passwd)}
                    secureTextEntry={true}
                />
                <RecoveryPassword />
            </View>
            <View style={ styles.btnBottom }>
                <LoginButton isFilledForm={checkFilledField()}/>
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
        borderBottomColor: '#E6E9ED',
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
    overText: {

    }
});

export default LoginFormComponent
