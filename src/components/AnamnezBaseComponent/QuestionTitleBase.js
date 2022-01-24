import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        fontSize: 17,
        fontWeight: '500',
    },
    additionalFieldStyle: {
        fontSize: 15,
        color: '#AAB2BD',
        fontWeight: '400',
    }
})

export default QuestionTitleBase;