import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { MultiPlatform } from '../MultiPlatform';
import {colors} from '../../styles/colors';

const SecondAuthButton = ({text, nav}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.btnStyle }
            onPress={() => navigation.navigate(nav)}>
            <Text allowFontScaling={false} style={ styles.textStyle }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.BLUE_ACCENT_COLOR,
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
})

export default SecondAuthButton
