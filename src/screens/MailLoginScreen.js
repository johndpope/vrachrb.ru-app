import React from 'react'
import { View, Image, KeyboardAvoidingView, StatusBar, Platform, ScrollView } from 'react-native'
import LoginFormComponent from '../components/LoginComponent/LoginFormComponent'
import { MultiPlatform } from '../components/MultiPlatform'

const MailLoginScreen = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={MultiPlatform.AdaptivePixelsSize(65)}
            style={{
                flex: 1,
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: "#F3F4F6"
            }}>
            {
                Platform.OS == 'ios' &&
                <StatusBar backgroundColor={"#F3F4F6"}/>
            }
            <View style={{
                height: '100%',
                width: '100%',
                flex: 0.35,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ScrollView
                    style={{width: '100%',}}
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    alwaysBounceVertical={false}
                >
                    <Image
                        style={{
                            height: MultiPlatform.AdaptivePixelsSize(83),
                            resizeMode: 'contain',
                        }}
                        source={require("../images/logo.png")}
                    />
                </ScrollView>
            </View>
            <LoginFormComponent/>
        </KeyboardAvoidingView>
    )
}

export default MailLoginScreen
