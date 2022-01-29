import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { resetAllValues } from '../../store/reducers/AnamnezSlice'

const StartScreen = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    return (
        <View style={ styles.mainContent }>
            <View style={{
                width: '85%'
            }}>
                <Text style={{ 
                    ...styles.textStyle,
                    ...styles.additTextStyle
                }}>Для кого эта консультация?</Text>
                <View style={{
                    marginBottom: 26,
                }}>
                    <TouchableOpacity 
                        style={{
                            ...styles.buttonStyle,
                            marginBottom: 8
                        }}
                        onPress={ dispatch(resetAllValues()) ,() => navigation.navigate("QuestionsScreen") }
                        >
                        <Text style={ styles.textStyle }>Для себя</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={
                        styles.buttonStyle
                    }>
                        <Text style={ styles.textStyle }>Для близкого человека</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ 
                    ...styles.textStyle,
                    ...styles.additTextStyle
                }}>
                    Консультация в сервисе 
                    <Text> </Text>   
                    <Text
                        onPress={() => Linking.openURL('https://vrachrb.ru/')}
                        style={{ ...styles.textStyle, color: '#54B9D1' }}
                    >
                         «Врач Онлайн 
                        в Республике Башкортостан»
                    </Text>
                    <Text
                        style={ styles.textStyle }
                    > —  не является 
                        медицинской услугой. Специалисты сервиса 
                        не ставят диагноз и не назначают лечение: 
                        это возможно только в медицинском 
                        учреждении на очной консультации врача.
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
        color: '#434A53',
        fontSize: 17,
    },
    buttonStyle: {
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#CCD1D9',
        justifyContent: 'center',
        paddingLeft: '6%'
    },
    additTextStyle: {
        marginBottom: 12,
        marginLeft: 3 
    }
});

export default StartScreen
