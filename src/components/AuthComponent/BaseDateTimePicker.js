import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const BaseDateTimePicker = ({ setValue, text }) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        date = date.getUTCFullYear()+"."+(date.getUTCMonth()+1)+"."+date.getUTCDate()
        console.log("Выбранная дата : ", date);
        setValue(date)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnStyle} onPress={() => showDatePicker()}>
                <Text style={ styles.textStyle }> {text} </Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    textStyle: {
        color: '#434A53',
        fontSize: 17
    },
    btnStyle: {
        width: 320,
        height: 60,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
})

export default BaseDateTimePicker;