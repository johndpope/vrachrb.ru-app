import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';


const BaseTextInput = ({ response, setValue, hint, pass=false }) => {

    const [text, setText] = useState("")

    function doTrim(value) {
        if(value.trim().length > 0) {
            setText(value)
            setValue(value)
        } else {
            setText("")
            setValue("")
        }
    }

    return (
        <View style={styles.container}>
            {
                text !== "" &&
                (<Text style={styles.textStyle}>{ hint }</Text>)
            }
            <TextInput
                value={text}
                style={{
                    ...styles.textInputStyle,
                    borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED",
                }}
                placeholder={hint}
                placeholderTextColor="#AAB2BD"
                onChangeText={ value => doTrim(value) }
                secureTextEntry={ pass }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: MultiPlatform.AdaptivePixelsSize(15)
    },
    textStyle:{
        color: colors.HARD_GRAY_COLOR,
        fontSize: MultiPlatform.AdaptivePixelsSize(15)
    },
    textInputStyle: {
        borderBottomWidth: MultiPlatform.AdaptivePixelsSize(2),
        paddingBottom: MultiPlatform.AdaptivePixelsSize(10),
        paddingTop: Platform.OS === "android" ? 0 : 10,
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        borderRadius: 1,
        color: '#434A53'
    },
})

export default BaseTextInput;