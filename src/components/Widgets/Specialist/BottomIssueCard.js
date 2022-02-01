import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

const BottomIssueCard = () => {

    const navigation = useNavigation()

    return (
        <View style={ styles.mainContent }> 
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
                            <Image style={{ width: 45, height: 45 }} source={ require('../../../images/shevron_gradient.png') }/>
                        </View>
                </LinearGradient>
            </TouchableOpacity>  
        </View> 
    )
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 3,
        paddingTop: 5,
        borderRadius: 16,
    },
    gradientOptions: {
        height: 88,
        borderRadius: 16,
        justifyContent: 'center'
    },
    wrapView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: 19,
        width: '60%',
        fontWeight: '500',
        color: '#FFFFFF'
    }
});

export default BottomIssueCard
