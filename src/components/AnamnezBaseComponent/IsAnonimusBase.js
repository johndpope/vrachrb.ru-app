import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultiPlatform } from '../MultiPlatform';
import {useDispatch} from "react-redux";
import {selectAnonymous} from "../../store/reducers/AnamnezSlice";
import { colors } from '../../styles/colors';

const IsAnonimusBase = () => {

    const dispatch = useDispatch();
    const [bool, setBool] = useState();

    function onPress(value){
        dispatch(selectAnonymous(value))
        setBool(value)
    }

    return (
        <View style={styles.checkboxContainer}>
            <BouncyCheckbox
                style={styles.checkbox}
                size={MultiPlatform.AdaptivePixelsSize(35)}
                fillColor="#58BE3F"
                unfillColor="#FFFFFF"
                text={"Задать вопрос Анонимно?"}
                textStyle={styles.label}
                iconStyle={{ borderColor: "#58BE3F" }}
                onPress={(isChecked) => onPress(isChecked)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        alignItems: 'center',
        width: '100%',
        height: 60,
        flexDirection: "row",
    },
    checkbox: {
        marginLeft: MultiPlatform.AdaptivePixelsSize(2),
    },
    label: {
        fontSize: MultiPlatform.AdaptivePixelsSize(14),
        color: colors.HARD_GRAY_COLOR,
        textDecorationLine: "none",
    },
})

export default IsAnonimusBase;