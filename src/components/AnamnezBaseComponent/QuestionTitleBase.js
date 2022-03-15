import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MultiPlatform } from '../MultiPlatform';

const QuestionTitleBase = ({ question, additionalField = "" }) => {
    return (
            <View style={{
                marginLeft: 3,
                flexDirection: 'column'
            }}>
                <Text style={ styles.questionStyle }>{ question }</Text>
                { additionalField != "" && 
                    <Text style={ styles.additionalFieldStyle }>{ additionalField }</Text> 
                }
            </View>
    )
}

const styles = StyleSheet.create({
    questionStyle: {
        color: '#434A53',
        fontSize: MultiPlatform.AdaptivePixelsSize(19),
        fontWeight: '500',
    },
    additionalFieldStyle: {
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        color: '#AAB2BD',
        fontWeight: '400',
    }
})

export default QuestionTitleBase;