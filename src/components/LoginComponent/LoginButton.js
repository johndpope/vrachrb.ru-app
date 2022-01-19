import { useNavigation } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

const LoginButton = ({ isFilledForm }) => {

    const navigation = useNavigation()

    return (
        <View>
            <TouchableOpacity 
                style={{ 
                    ...styles.btnStyle,
                    backgroundColor: isFilledForm ? '#54B9D1' : '#F3F4F6',
                }}
                onPress={() => navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'MainScreen' }],
                            })}
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
