import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const MultiChoicesBase = ({ choices = [
    "просто информацию",
    "узнать методы обследования при вашем заболевании",
    "получить рекомендации и в последующем обратиться к врачу на очный прием",
    "получить совет, так как вам некуда обратиться и вы не знаете что делать",
    "узнать, как оказать первую помощь",
    "вы сомневаетесь в назначенном вам лечении у вашего врача и решили убедиться правильное ли оно"
] }) => {
    return(
        <View style={ styles.mainContent }>
            {
                choices.map(choiceText => {
                    return(
                        <TouchableOpacity style={{
                            width: '85%',
                            marginBottom: 10,
                            padding: 18,
                            borderColor: '#CCD1D9',
                            borderWidth: 2,
                            borderRadius: 8
                        }}>
                            <Text style={{ color: 'red' }}>{choiceText}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default MultiChoicesBase;
