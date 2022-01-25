import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native'
import ChoicesButtonBase from '../../components/AnamnezBaseComponent/ChoicesButtonBase';
import MultiTextBase from '../../components/AnamnezBaseComponent/MultiTextBase';
import QuestionTitleBase from '../../components/AnamnezBaseComponent/QuestionTitleBase';
import SingleTextBase from '../../components/AnamnezBaseComponent/SingleTextBase';
import baseApiURL from '../../requests/baseApiURL';
import Request from '../../requests/Request';
 

const QuestionsScreen = () => {
    const DATA = []
    const [anamnez, setAnamnez] = useState()
    const [loading, setLoading] = useState(false)
    const [anamnezData, setAnamnezData] = useState(DATA)

    const getAnamnez = async () => {
        setLoading(true)
        let rep = await Request.get(baseApiURL + "Get_anamnes", {spec_id: 12})

        // Заполнение скрина компонентами для отправки листа анамнеза
        rep["response"] && rep["response"].forEach((item) => {
            DATA.push({
                id: item.id,
                header: <QuestionTitleBase question={ item.title.includes("(") ? item.title.split("(")[0] : item.title } additionalField={
                    item.title.includes("(") && item.title.split('(').pop().split(')')[0]
                } />,
                body: item.field_type == "textarea" ? 
                    <MultiTextBase /> : item.field_type == "input" ? 
                    <SingleTextBase /> : item.field_type == "yes_no_input" ? 
                    <ChoicesButtonBase component={<SingleTextBase />} /> : item.field_type == "yes_no_textarea" ? 
                    <ChoicesButtonBase component={<MultiTextBase />} /> : item.field_type == "textarea_upload" ?
                    <ChoicesButtonBase component={<MultiTextBase />} /> : <ChoicesButtonBase component={<MultiTextBase />} />
            })
        })

        setAnamnezData(DATA)
        
        setAnamnez(rep)
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
