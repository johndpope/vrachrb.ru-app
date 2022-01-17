import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const RegisterComponent = () => {
    return (
        <View style={{
            marginTop: 22
        }}>
            <TouchableOpacity>
                <Text style={ styles.textStyle }>Зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#54B9D1',
        fontSize: 17
    },
})

export default RegisterComponent
