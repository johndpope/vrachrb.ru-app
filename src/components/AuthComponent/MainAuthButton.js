import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MultiPlatform } from '../MultiPlatform';
import {colors} from '../../styles/colors';

const MainAuthButton = ({text, nav}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={ styles.btnStyle }
            onPress={() => navigation.navigate(nav)}
        >
            <Text allowFontScaling={false} style={ styles.textStyle }>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.HARD_GRAY_COLOR,
        fontSize: MultiPlatform.AdaptivePixelsSize(17)
    },
    btnStyle: {
        width: '80%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: colors.BG_COLOR_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderColor: colors.EMAIL_LOGIN_BORDER_COLOR,
        borderWidth: 2,
        marginTop: MultiPlatform.AdaptivePixelsSize(10)
    }
})

export default MainAuthButton
