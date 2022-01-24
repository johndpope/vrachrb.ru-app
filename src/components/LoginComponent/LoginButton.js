import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import baseApiURL from '../../requests/baseApiURL'
import Request from '../../requests/Request'

const LoginButton = ({ isFilledForm, email, password }) => {

    const navigation = useNavigation()

    const login = async () => {
        let request = await Request.post(baseApiURL + "Signin", data={
            user: 'hello',
            password: 'wegweg'
        })

        console.log(request)
    }

    return (
        <View>
            <TouchableOpacity 
                style={{ 
                    ...styles.btnStyle,
                    backgroundColor: isFilledForm ? '#54B9D1' : '#F3F4F6',
                }}
                // onPress={() => navigation.reset({
                //                     index: 0,
                //                     routes: [{ name: 'MainScreen' }],
                //             })}
                onPress={() => login()}
                disabled={!isFilledForm}
            >
                <Text style={{ 
                    ...styles.textStyle,
                    color: isFilledForm ? "#FFFFFF" : "#AAB2BD"
                }}>Войти</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
})
export default LoginButton
