import React from 'react'
import { View, Image, KeyboardAvoidingView, StatusBar } from 'react-native'
import { MultiPlatform } from '../components/MultiPlatform';
import RegisterFormComponent from "../components/RegisterComponent/RegisterFormComponent";

const RegisterScreen = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={MultiPlatform.AdaptivePixelsSize(65)}
            style={{
                flex: 1,
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: "#F3F4F6"}}>
            {
                Platform.OS === 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"}/>
            }
            <RegisterFormComponent/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen
