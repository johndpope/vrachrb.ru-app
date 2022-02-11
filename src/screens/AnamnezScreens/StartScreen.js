import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {resetAllValues, setQuestionBody} from '../../store/reducers/AnamnezSlice'
import BaseTextInput from "../../components/Widgets/BaseTextInput";
import NoticeService from "../../components/Widgets/NoticeService";
import BaseSendButton from "../../components/AuthComponent/BaseSendButton";
import {MultiPlatform} from "../../components/MultiPlatform";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

const StartScreen = (props) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [choice, setChoice] = useState(1)
    const userAbout    = useSelector(state => state.AnamnezSlice.userAbout)
    const questionBody = useSelector(state => state.AnamnezSlice.questionBody)

    const colors = {
        selectedButtonAccentType: '#54B9D1',
        deselectAccentType: '#FFFFFF'
    }

    useEffect(() => {
        dispatch(resetAllValues())
        dispatch(setQuestionBody(""))
    }, [choice])

    const goAnamnez = () => {
        if(checkFilledFields()) {
            navigation.navigate("QuestionsScreen")
        } else {
            MultiPlatform.ToastShow('Заполните поля')
        }
    }

    const checkFilledFields = () => {
        if(choice === 1 && questionBody) {
            return true
        } else if(questionBody && userAbout["first_name"] && userAbout["second_name"] && userAbout["middle_name"]) {
            return true
        } else {
            return false
        }
    }

    const questionBodyComponent =
        <BaseTextInput customStyle={styles.questionBodyStyle} multiline={true} idDispatch={1} maxLength={100} hint={'Кратко опишите проблему'} />;
    const userAboutComponent =
        <View style={{justifyContent: 'space-between'}}>
            <BaseTextInput customStyle={styles.fioStyle} idDispatch={2} maxLength={30} hint={'Фамилия'} />
            <BaseTextInput customStyle={styles.fioStyle} idDispatch={3} maxLength={30} hint={'Имя'} />
            <BaseTextInput customStyle={styles.fioStyle} idDispatch={4} maxLength={30} hint={'Отчество'} />
        </View>;

    return (
        <View style={ styles.mainContent }>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center', width: '85%'}}
            >    
                <View>
                    <Text style={{
                        ...styles.textStyle,
                        ...styles.additTextStyle
                    }}>Для кого эта консультация?</Text>
                    <View style={{
                        marginBottom: 26,
                    }}>
                        <TouchableOpacity
                            style={{...styles.buttonStyle,
                                marginBottom: choice === 2 ? 8 : 0,
                                borderWidth: choice === 1 ? 0 : 2,
                                backgroundColor: choice === 1 ?
                                colors.selectedButtonAccentType : colors.deselectAccentType,
                            }}
                            onPress={ () => { setChoice(1); dispatch(resetAllValues())} }
                            >
                            <Text style={{ ...styles.textStyle,
                            color: choice === 1 ? "#FFFFFF" : "#434A53" }}>Для себя</Text>
                        </TouchableOpacity>
                        { choice === 1 ? questionBodyComponent : null }
                        <TouchableOpacity
                            style={{
                                ...styles.buttonStyle,
                                borderWidth: choice === 2 ? 0 : 2,
                                marginTop: choice === 1 ? 8 : 0,
                                backgroundColor: choice === 2 ? colors.selectedButtonAccentType
                                    : colors.deselectAccentType,}}
                            onPress={ () => { setChoice(2); dispatch(resetAllValues())} }
                        >
                            <Text style={{ ...styles.textStyle,
                            color: choice === 2 ? "#FFFFFF" : "#434A53", }}>Для близкого человека</Text>
                        </TouchableOpacity>
                        { choice === 2 ? userAboutComponent : null }
                        { choice === 2 ? questionBodyComponent : null }
                    </View>

                    <NoticeService/>
                    <View style={ styles.btnBottom }>
                        <BaseSendButton text={"Дальше"} checkFields={checkFilledFields} onPress={goAnamnez} />
                    </View>
                </View>
            </ScrollView>
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
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
    },
    buttonStyle: {
        height: MultiPlatform.AdaptivePixelsSize(60),
        width: '100%',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#CCD1D9',
        justifyContent: 'center',
        paddingLeft: '6%'
    },
    goButtonStyle: {
        width: '100%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: '#58BE3F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: MultiPlatform.AdaptivePixelsSize(10),
    },
    additTextStyle: {
        marginBottom: 12,
        marginLeft: 3 
    },
    btnBottom: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    questionBodyStyle: {
        width: '100%',
        height: MultiPlatform.AdaptivePixelsSize(120),
    },
    fioStyle: {
        height: MultiPlatform.AdaptivePixelsSize(55),
    },
});

export default StartScreen
