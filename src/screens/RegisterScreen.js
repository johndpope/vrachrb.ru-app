import React from 'react'
import { View, Image } from 'react-native'
import RegisterFormComponent from "../components/RegisterComponent/RegisterFormComponent";

const RegisterScreen = () => {
    return (
        <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: "#F3F4F6"
        }}>
            <View style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={{
                        width: 243,
                        height: 83
                    }}
                    source={require("../images/logo.png")}
                />
            </View>
            <RegisterFormComponent/>
        </View>
    )
}

export default RegisterScreen
