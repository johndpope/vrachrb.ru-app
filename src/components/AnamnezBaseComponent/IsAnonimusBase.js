import React, {useState} from 'react';
import { Linking, StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultiPlatform } from '../MultiPlatform';
import {useDispatch} from "react-redux";
import {selectAnonymous} from "../../store/reducers/AnamnezSlice";

const IsAnonimusBase = () => {

    const dispatch = useDispatch();

    return (
        <View style={styles.checkboxContainer}>
            <BouncyCheckbox
                size={MultiPlatform.AdaptivePixelsSize(35)}
                fillColor="#58BE3F"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#58BE3F" }}
                onPress={(isChecked) => { dispatch(selectAnonymous(isChecked)) }}
            />
            <Text style={styles.label}>
                Задать вопрос Анонимно?
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        alignItems: 'center',
        width: '100%',
        height: 60,
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 10
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        paddingRight: 40,
        color:'#54B9D1'
    },
})

export default IsAnonimusBase;