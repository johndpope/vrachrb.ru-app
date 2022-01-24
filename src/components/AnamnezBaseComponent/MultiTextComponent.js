import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import QuestionTitleBase from './QuestionTitleBase';
import MultiTextBase from './MultiTextBase'

const MultiTextComponent = ({ question = "Что беспокоит?", additionalField = "" }) => {
    return (
        <View style={ styles.mainContent }>
            <QuestionTitleBase 
                question="Что беспокоит?"
                additionalField="Боли, выделения, одышка, кашель, 
                                покалывание, тремер, раздраженность, 
                                изжога, отеки и т.д."/>
            <MultiTextBase />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: 150,
        width: '100%',
        marginBottom: 100
    },
})

export default MultiTextComponent;
