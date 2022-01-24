import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

const MultiTextBase = () => {
    return ( 
        <TextInput 
            style={ styles.textInputStyle }
            multiline={true}
            textAlign='left'
            textAlignVertical='top'
            placeholder='Введите текст'
            placeholderTextColor={"#AAB2BD"}
        /> 
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: '100%',
        height: 120,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        fontSize: 17,
        fontWeight: '400',
        padding: 15,
        color: '#434A53',
        marginTop: 12
    },
})

export default MultiTextBase;