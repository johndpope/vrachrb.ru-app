import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { MultiPlatform } from '../../MultiPlatform';

const BottomIssueCard = ({ show = false }) => {

    const navigation = useNavigation()

    return (
        <View style={{ ...styles.mainContent, flex: show ? 0 : 1, opacity: show ? 1 : 0 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ModalScreen")}
            >
                <LinearGradient
                        style={ styles.gradientOptions }
                        colors={['#F29F7C', '#F27C83' ]}
                        start={{ x: 0, y: 0.3 }}
                    >
                        <View style={ styles.wrapView }>
                            <Text style={ styles.textStyle }>Не знаю, какой врач мне нужен?</Text>
                            <Image style={{ width: MultiPlatform.AdaptivePixelsSize(45), height: MultiPlatform.AdaptivePixelsSize(45) }} source={ require('../../../images/shevron_gradient.png') }/>
                        </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
        paddingLeft: MultiPlatform.AdaptivePixelsSize(10),
        paddingRight: MultiPlatform.AdaptivePixelsSize(10),
        paddingBottom: MultiPlatform.AdaptivePixelsSize(10),
        backgroundColor: '#FFF'
    },
    gradientOptions: {
        paddingTop: MultiPlatform.AdaptivePixelsSize(13),
        paddingBottom: MultiPlatform.AdaptivePixelsSize(13),
        borderRadius: 16,
        justifyContent: 'center'
    },
    wrapView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: MultiPlatform.AdaptivePixelsSize(19),
        width: '60%',
        fontWeight: '500',
        color: '#FFFFFF'
    }
});

export default BottomIssueCard
