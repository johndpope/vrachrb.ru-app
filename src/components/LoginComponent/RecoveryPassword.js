import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import { MultiPlatform } from '../MultiPlatform';

const RecoveryPassword = () => {
    const navigation = useNavigation();

    return (
        <View style={{marginTop: 22}}>
            <TouchableOpacity onPress={() => navigation.navigate("RecoveryPasswordScreen")}>
                <Text style={ styles.textStyle }>Восстановить пароль</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#54B9D1',
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
})

export default RecoveryPassword
