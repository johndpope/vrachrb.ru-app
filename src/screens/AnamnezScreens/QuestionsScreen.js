import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native'
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
import AnamnezSlice, { numOfRequiredFields } from '../../store/reducers/AnamnezSlice'

const QuestionsScreen = () => {

    const dispatch = useDispatch()
    const specialistID = useSelector(state => state.AnamnezSlice.selectedSpecialistID)

    const DATA = []
    const [loading, setLoading] = useState(false)
    const [anamnezData, setAnamnezData] = useState(DATA)

    const getAnamnez = async () => {
        setLoading(true)
        let rep = await Request.get(baseApiURL + "Get_anamnes", {spec_id: specialistID})

        // Заполнение скрина компонентами для отправки листа анамнеза
        rep["response"] && rep["response"].forEach((item, index) => {
            item.is_required == "1" && dispatch(numOfRequiredFields({
                index: index,
                value: null
            }))
            DATA.push({
                id: item.id,
                // Здесь отделение идет на additionalText и mainText
                header: <QuestionTitleBase question={ item.title.includes("(") ? item.title.split("(")[0] : item.title } additionalField={
                    item.title.includes("(") && item.title.split('(').pop().split(')')[0]
                } />,
                body: item.field_type == "textarea" ? 
                    <MultiTextBase index={ index } data={ item } isRequired={ item.is_required } /> : item.field_type == "input" ? 
                    <SingleTextBase index={ index } data={ item } isRequired={ item.is_required } /> : item.field_type == "yes_no_input" ? 
                    <ChoicesButtonBase index={ index } data={ item } component={<SingleTextBase index={ index } data={ item } isRequired={ item.is_required } />} /> : item.field_type == "yes_no_textarea" ? 
                    <ChoicesButtonBase index={ index } data={ item } component={<MultiTextBase index={ index } data={ item } isRequired={ item.is_required } />} /> : item.field_type == "textarea_upload" ?
                    <UploadFileBase index={ index } data={ item } component={<MultiTextBase index={ index } data={ item } isRequired={ item.is_required } />} /> : 
                    <MultiChoicesBase index={ index } data={ item } choices={ item.field_options.choices }/>
            })
        })

        DATA.push({
            id: 2500,
            body: <SendButtonBase />
        })

        setAnamnezData(DATA)
        
        setLoading(false)
    }

    useEffect(() => {
        getAnamnez()
    }, [])

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
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return(
                                    <View style={{
                                        marginBottom: 25,
                                        marginTop: 25
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
    }
})

export default QuestionsScreen;
