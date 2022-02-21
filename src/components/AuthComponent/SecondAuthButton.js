import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { MultiPlatform } from '../MultiPlatform';
import {colors} from '../../styles/colors';

const SecondAuthButton = ({text, nav}) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: MultiPlatform.AdaptivePixelsSize(25) }}>
            <TouchableOpacity onPress={() => navigation.navigate(nav)}>
                <Text style={ styles.textStyle }>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.BLUE_ACCENT_COLOR,
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
})

export default SecondAuthButton
