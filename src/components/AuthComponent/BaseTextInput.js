import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../styles/colors';
import { MultiPlatform } from '../MultiPlatform';


const BaseTextInput = ({ response, setValue, hint, pass=false }) => {

    const [isEnteredText, setIsEntered] = useState("")

    return (
        <View style={{ paddingTop: MultiPlatform.AdaptivePixelsSize(15) }}>
            {
                isEnteredText !== "" && 
                (<Text style={{ color: colors.HARD_GRAY_COLOR, fontSize: MultiPlatform.AdaptivePixelsSize(15) }}>{ hint }</Text>)
            }
            <TextInput
                style={{
                    ...styles.textInputStyle,
                    borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED",
                }}
                placeholder={hint}
                placeholderTextColor="#AAB2BD"
                onChangeText={value => { setValue(value.trim()), setIsEntered(value.trim()) }}
                secureTextEntry={pass}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInputStyle: {
        borderBottomWidth: 2,
        paddingBottom: MultiPlatform.AdaptivePixelsSize(10),
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        borderRadius: 1,
        color: '#434A53'
    },
})

export default BaseTextInput;