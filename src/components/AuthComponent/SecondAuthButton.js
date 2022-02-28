import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { MultiPlatform } from '../MultiPlatform';
import {colors} from '../../styles/colors';

const SecondAuthButton = ({text, nav}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ marginTop: MultiPlatform.AdaptivePixelsSize(30) }} onPress={() => navigation.navigate(nav)}>
            <Text style={ styles.textStyle }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.BLUE_ACCENT_COLOR,
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
})

export default SecondAuthButton
