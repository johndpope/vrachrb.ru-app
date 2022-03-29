import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { TouchableOpacity as IOSTouchableOpacity } from 'react-native-gesture-handler'
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
        let day = date.getUTCDate(),
            month = date.getUTCMonth()+1,
            year = date.getUTCFullYear();
        day = day < 10 ? "0"+day : day;
        month = month < 10 ? "0"+month : month;
        let dateRU = day+"."+month+"."+year

        setText(dateRU)
        console.log("Выбранная дата : ", dateRU);
        setValue(date)
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            {
                text !== "" &&
                (<Text style={styles.textStyle}>{ hint }</Text>)
            }
            {
                Platform.OS == 'ios' ?
                <IOSTouchableOpacity activeOpacity={1} onPress={() => showDatePicker()}>
                    <View>
                        <TextInput
                            editable={false}
                            value={text}
                            style={{...styles.textInputStyle,
                                borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED"
                            }}
                            placeholder={hint}
                            placeholderTextColor="#AAB2BD"
                        />
                    </View>
                </IOSTouchableOpacity> :
                <TouchableOpacity activeOpacity={1} onPress={() => showDatePicker()}>
                    <View>
                        <TextInput
                            editable={false}
                            value={text}
                            style={{...styles.textInputStyle,
                                borderBottomColor: response['error'] ? "#F27C83" : "#E6E9ED"
                            }}
                            placeholder={hint}
                            placeholderTextColor="#AAB2BD"
                        />
                    </View>
                </TouchableOpacity>
            }
            <DateTimePickerModal
                date={new Date()}
                isVisible={isDatePickerVisible}
                mode={"date"}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                cancelTextIOS={"Закрыть"}
                confirmTextIOS={"Подтвердить"}
                display={Platform.OS === 'ios' ? "inline" : "default"}
                locale={"ru_Ru"}
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
