import React from 'react'
import { View, Image } from 'react-native'
import RecoveryPasswordComponent from "../components/AuthComponent/RecoveryPasswordComponent";
import { MultiPlatform } from '../components/MultiPlatform';

const RecoveryPasswordScreen = () => {
    return (
        <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: "#F3F4F6"
        }}>
            <View style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        width: MultiPlatform.AdaptivePixelsSize(243),
                        height: MultiPlatform.AdaptivePixelsSize(83)
                    }}
                    source={require("../images/logo.png")}
                />
            </View>
            <RecoveryPasswordComponent/>
        </View>
    )
}

export default RecoveryPasswordScreen
