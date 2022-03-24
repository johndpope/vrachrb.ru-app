import React from 'react'
import {Image, KeyboardAvoidingView, StatusBar, View} from 'react-native'
import AppleFormComponent from "../components/AuthComponent/AppleFormComponent";
import {MultiPlatform} from "../components/MultiPlatform";

const NextAppleAuth = ({ route }) => {
    // console.log("NEXTAPPLE::" + JSON.stringify(route.params))
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{
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
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        height: MultiPlatform.AdaptivePixelsSize(83),
                        resizeMode: 'contain',
                    }}
                    source={require("../images/logo.png")}
                />
            </View>
            <AppleFormComponent email={route.params?.email} username={route.params?.username}/>
        </KeyboardAvoidingView>
    )
}

export default NextAppleAuth
