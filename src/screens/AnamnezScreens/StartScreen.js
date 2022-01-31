import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {clearUserAbout, resetAllValues} from '../../store/reducers/AnamnezSlice'
import BaseTextInput from "../../components/Widgets/BaseTextInput";
import NoticeService from "../../components/Widgets/NoticeService";

const StartScreen = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [choice,setChoice] = useState(1)
    const userAbout    = useSelector(state => state.AnamnezSlice.userAbout)
    const questionBody = useSelector(state => state.AnamnezSlice.questionBody)

    const colors = {
        selectedButtonAccentType: '#54B9D1',
        deselectAccentType: '#FFF'
    }

    useEffect(() => {
        choice === 1 ? dispatch(clearUserAbout()) : null
    }, [choice])

    const goAnamnez = () => {
        if(choice === 1 && questionBody) {
            navigation.navigate("QuestionsScreen")
        } else if(questionBody && userAbout["first_name"] && userAbout["second_name"] && userAbout["middle_name"]) {
            navigation.navigate("QuestionsScreen")
        }
    }

    const questionBodyComponent =
        <BaseTextInput customStyle={styles.questionBodyStyle} multiline={true} idDispatch={1} maxLength={100} hint={'Кратко опишите проблему'} />;
    const userAboutComponent =
        <View style={{justifyContent: 'space-between'}} flexDirection={'row'}>
            <BaseTextInput customStyle={styles.fioStyle} idDispatch={2} maxLength={30} hint={'Фамилия'} />
            <BaseTextInput customStyle={styles.fioStyle} idDispatch={3} maxLength={30} hint={'Имя'} />
            <BaseTextInput customStyle={styles.fioStyle} idDispatch={4} maxLength={30} hint={'Отчество'} />
        </View>;

    return (
        <View style={ styles.mainContent }>
            <View style={{
                width: '85%',
            }}>
                <Text style={{
                    ...styles.textStyle,
                    ...styles.additTextStyle
                }}>Для кого эта консультация?</Text>
                <View style={{
                    marginBottom: 26,
                }}>
                    <TouchableOpacity
                        style={{...styles.buttonStyle,
                            marginBottom: 8,
                            backgroundColor: choice === 1 ?
                               colors.selectedButtonAccentType : colors.deselectAccentType,
                        }}
                        onPress={ () => { setChoice(1); dispatch(resetAllValues())} }
                        >
                        <Text style={ styles.textStyle }>Для себя</Text>
                    </TouchableOpacity>
                    { choice === 1 ? questionBodyComponent : null }
                    <TouchableOpacity
                        style={{...styles.buttonStyle,
                            backgroundColor: choice === 2 ? colors.selectedButtonAccentType
                                : colors.deselectAccentType,}}
                        onPress={ () => { setChoice(2); dispatch(resetAllValues())} }
                    >
                        <Text style={ styles.textStyle }>Для близкого человека</Text>
                    </TouchableOpacity>
                    { choice === 2 ? userAboutComponent : null }
                    { choice === 2 ? questionBodyComponent : null }
                </View>

                <NoticeService/>

                <TouchableOpacity onPress={() => goAnamnez()} style={ styles.goButtonStyle }>
                    <Text style={{ color: '#FFFFFF', fontSize: 17 }}> Дальше </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
        color: '#434A53',
        fontSize: 17,
    },
    buttonStyle: {
        height: 60,
        width: '100%',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#CCD1D9',
        justifyContent: 'center',
        paddingLeft: '6%'
    },
    goButtonStyle: {
        width: '100%',
        height: 60,
        backgroundColor: '#58BE3F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
    },
    additTextStyle: {
        marginBottom: 12,
        marginLeft: 3 
    },

    questionBodyStyle: {
        width: '100%',
        height: 120,
    },
    fioStyle: {
        width: '30%',
        height: 50,
    },
});

export default StartScreen
