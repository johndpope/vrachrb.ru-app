import React from 'react';
import { StyleSheet, TextInput } from 'react-native';


const BaseTextInput = ({ response, setValue, hint, pass=false }) => {

    return (
        <TextInput
            style={{
                ...styles.textInputStyle,
                borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED"
            }}
            placeholder={hint}
            placeholderTextColor="#AAB2BD"
            onChangeText={value => setValue(value)}
            secureTextEntry={pass}
        />
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        borderBottomWidth: 2,
        width: "100%",
        marginTop: 5,
        fontSize: 17,
        borderRadius: 1,
        color: '#434A53'
    },
})

export default BaseTextInput;