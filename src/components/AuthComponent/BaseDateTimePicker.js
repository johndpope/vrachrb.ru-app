import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from 'react-native-gesture-handler'
import { MultiPlatform } from '../MultiPlatform';
import {colors} from "../../styles/colors";


const BaseDateTimePicker = ({ response, setValue, hint }) => {

    const [text, setText] = useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setText(date.getUTCDate()+"."+(date.getUTCMonth()+1)+"."+date.getUTCFullYear())
        console.log("Выбранная дата : ", date.toString());
        setValue(date)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            {
                text !== "" &&
                (<Text style={styles.textStyle}>{ hint }</Text>)
            }
            <TextInput
                onPressOut={() => showDatePicker()}
                editable={false}
                value={text}
                style={{...styles.textInputStyle,
                    borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED",
                }}
                placeholder={hint}
                placeholderTextColor="#AAB2BD"
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
        // <View style={styles.container}>
        //     <TouchableOpacity style={styles.btnStyle} onPress={() => showDatePicker()}>
        //         <Text style={ styles.textStyle }> {text} </Text>
        //     </TouchableOpacity>
        //     <DateTimePickerModal
        //         isVisible={isDatePickerVisible}
        //         mode="date"
        //         onConfirm={handleConfirm}
        //         onCancel={hideDatePicker}
        //     />
        // </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: MultiPlatform.AdaptivePixelsSize(15),
    },
    textStyle:{
        color: colors.HARD_GRAY_COLOR,
        fontSize: MultiPlatform.AdaptivePixelsSize(15),
    },
    textInputStyle: {
        borderBottomWidth: MultiPlatform.AdaptivePixelsSize(2),
        paddingBottom: MultiPlatform.AdaptivePixelsSize(10),
        paddingTop: Platform.OS === "android" ? 0 : 10,
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        borderRadius: 1,
        color: '#434A53',
    },
    btnStyle:{
        flex: 1,
        // backgroundColor: 'red'
    },

    // btnStyle: {
    //     width: '100%',
    //     height: MultiPlatform.AdaptivePixelsSize(60),
    //     backgroundColor: '#F3F4F6',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 16,
    // },
})

export default BaseDateTimePicker;