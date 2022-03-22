import React from 'react'
import { View, Image, KeyboardAvoidingView, StatusBar } from 'react-native'
import RecoveryPasswordComponent from "../components/AuthComponent/RecoveryPasswordComponent";
import BackButton from '../components/HeaderComponent/BackButton';
import { MultiPlatform } from '../components/MultiPlatform';

const RecoveryPasswordScreen = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: "#F3F4F6",
        }}>
            {
                Platform.OS == 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"}/>
            }
            <View style={{ width: '100%', paddingLeft: 15, paddingTop: 5 }}>
                <BackButton />
            </View>
            <View style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    style={{
                        width: MultiPlatform.AdaptivePixelsSize(250),
                        height: MultiPlatform.AdaptivePixelsSize(83)
                    }}
                    source={require("../images/logo.png")}
                />
            </View>
            <RecoveryPasswordComponent/>
        </KeyboardAvoidingView>
    )
}

export default RecoveryPasswordScreen
