import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const RecoveryPassword = () => {
    return (
        <View style={{
            marginTop: 22
        }}>
            <TouchableOpacity>
                <Text style={ styles.textStyle }>Восстановить пароль</Text>
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

export default RecoveryPassword
