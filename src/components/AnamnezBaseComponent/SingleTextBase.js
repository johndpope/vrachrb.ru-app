import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const SingleTextBase = ({ addText = "" }) => {
    return ( 
        <View>
            <TextInput 
                style={ styles.textInputStyle }
                multiline={true}
                textAlign='left'
                textAlignVertical='top'
                placeholder='Введите текст'
                placeholderTextColor={"#AAB2BD"}
            /> 
            { addText != "" && 
                <Text style={ styles.additionalFieldStyle }>{ addText }</Text> 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: '100%',
        height: 55,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        fontSize: 17,
        fontWeight: '400',
        padding: 15,
        color: '#434A53',
        marginTop: 12
    },
    additionalFieldStyle: {
        fontSize: 15,
        color: '#434A53',
        fontWeight: '400',
        marginLeft: 3
    }
})


export default SingleTextBase;
