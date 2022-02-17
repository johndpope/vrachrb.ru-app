import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'
import ChoicesButtonBase from '../../components/AnamnezBaseComponent/ChoicesButtonBase';
import MultiTextBase from '../../components/AnamnezBaseComponent/MultiTextBase';
import QuestionTitleBase from '../../components/AnamnezBaseComponent/QuestionTitleBase';
import SingleTextBase from '../../components/AnamnezBaseComponent/SingleTextBase';
import baseApiURL from '../../requests/baseApiURL';
import Request from '../../requests/Request';
import UploadFileBase from '../../components/AnamnezBaseComponent/UploadFileBase'
import MultiChoicesBase from '../../components/AnamnezBaseComponent/MultiChoicesBase';
import SendButtonBase from '../../components/AnamnezBaseComponent/SendButtonBase';
import { useDispatch, useSelector } from 'react-redux'
import {addAnamnezAnswer, resetAllValues} from '../../store/reducers/AnamnezSlice'
import IsAnonimusBase from "../../components/AnamnezBaseComponent/IsAnonimusBase";


const QuestionsScreen = () => {

    const dispatch = useDispatch()
    const specialtyID = useSelector(state => state.AnamnezSlice.selectedSpecialtyID)

    const DATA = []
    const [loading, setLoading] = useState(false)
    const [anamnezData, setAnamnezData] = useState(DATA)

    useEffect(() => {
        dispatch(resetAllValues())
        getAnamnez()
    }, [])

    const getAnamnez = async () => {
        setLoading(true)
        let rep = await Request.get(baseApiURL + "Get_anamnes", { spec_id:specialtyID })
        console.log("ANAMNES::"+JSON.stringify(rep))

        // Заполнение скрина компонентами для отправки листа анамнеза
        rep["response"] && rep["response"].forEach((item, index) => {
            switch (item.field_type){
                case "textarea":
                    dispatch(addAnamnezAnswer({
                        index: index,
                        sh_field_type: {
                            sh_field: item.id,
                            val: "",
                            isRequired: item.is_required == "1" ? true : false
                        }
                    }))
                    break
                case "input":
                    dispatch(addAnamnezAnswer({
                        index: index,
                        sh_field_type: {
                            sh_field: item.id,
                            val: "",
                            isRequired: item.is_required == "1" ? true : false
                        }
                    }))
                    break
                case "yes_no_textarea":
                    dispatch(addAnamnezAnswer({
                        index: index,
                        sh_field_type: {
                            sh_field: item.id,
                            bool: "Нет",
                            val: "",
                            isRequired: item.is_required == "1" ? true : false
                        },
                    }))
                    break
                case "yes_no_input":
                    dispatch(addAnamnezAnswer({
                        index: index,
                        sh_field_type: {
                            sh_field: item.id,
                            bool: "Нет",
                            val: "",
                            isRequired: item.is_required == "1" ? true : false
                        }
                    }))
                    break
                case "choices":
                    dispatch(addAnamnezAnswer({
                        index: index,
                        sh_field_type: {
                            sh_field: item.id,
                            choices: [],
                            isRequired: item.is_required == "1" ? true : false
                        }
                    }))
                    break
                case "textarea_upload":
                    dispatch(addAnamnezAnswer({
                        index: index,
                        sh_field_type: {
                            sh_field: item.id,
                            file: "",
                            val: "",
                            isRequired: item.is_required == "1" ? true : false
                        }
                    }))
                    break
            }


            DATA.push({
                id: item.id,
                // Здесь отделение идет на additionalText и mainText
                header: <QuestionTitleBase question={ item.title.includes("(") ? item.title.split("(")[0] : item.title } additionalField={
                    item.title.includes("(") && item.title.split('(').pop().split(')')[0]
                } />,
                body: item.field_type == "textarea" ?
                    <MultiTextBase index={ index } data={ item } /> : item.field_type == "input" ?
                        <SingleTextBase index={ index } data={ item } /> : item.field_type == "yes_no_input" ?
                            <ChoicesButtonBase index={ index } data={ item } component={<SingleTextBase index={ index } data={ item } />} /> : item.field_type == "yes_no_textarea" ?
                                <ChoicesButtonBase index={ index } data={ item } component={<MultiTextBase index={ index } data={ item } />} /> : item.field_type == "textarea_upload" ?
                                    <UploadFileBase index={ index } data={ item } component={<MultiTextBase index={ index } data={ item } />} /> :
                                    <MultiChoicesBase index={ index } data={ item } choices={ item.field_options.choices }/>
            })
        })
        DATA.push({
            id: 2499,
            body: <IsAnonimusBase />
        })
        DATA.push({
            id: 2500,
            body: <SendButtonBase />
        })

        setAnamnezData(DATA)
        setLoading(false)
    }

    return (
        <View style={ styles.mainContent }>
            {
                loading ? <ActivityIndicator size={"large"}/> : (
                    <View style={{
                        width: '90%',
                    }}>
                        <FlatList
                            data={anamnezData}
                            style={{
                                width: '100%',
                            }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return(
                                    <View style={{
                                        marginBottom: 10,
                                        marginTop: 10
                                    }}>
                                        { item.header }
                                        { item.body }
                                    </View>
                                )
                            }}
                        />
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center'
    },
    checkboxContainer: {
        width: "90%",
        flexDirection: "row",
        alignItems: 'center'
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        color: '#000',
    },
})


export default QuestionsScreen;
