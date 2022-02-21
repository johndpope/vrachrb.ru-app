import React, { Component, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, View, StyleSheet, Text } from 'react-native'
import { MultiPlatform } from '../../components/MultiPlatform'
import MessageCard from '../../components/Widgets/Chat/MessageCard'
import Request from '../../requests/Request'
import Routes from "../../requests/Routes";

const OutpatientCardScreen = ({ route }) => {

    const DATA = []
    console.log(route.params.id)
    const [response, setResponse] = useState({})
    const [loading, setLoading] = useState(false)
    const [patientCardData, setPatientCard] = useState(DATA)

    const getOutpatientCards = async () => {
        setLoading(true)
        let response = await Request.get(Routes.getPatientCardURL, {user_id: route.params.id})
        // console.log(response)
        response["response"] && response["response"].forEach(element => {
            DATA.push({
                id: element.id,
                body: element.body,
                closedBy: null,
                specialist_photo: element.specialist_photo,
                user_id: element.user_id,
                specialty: element["Specialists"][0]["Specialty"].title,
                first_name: element["Specialists"][0]["User"].first_name,
                second_name: element["Specialists"][0]["User"].second_name[0],
                middle_name: element["Specialists"][0]["User"].middle_name[0]
            })
        });

        setResponse(response)
        setPatientCard(DATA)
        setLoading(false)
    }

    useEffect(() => {
        getOutpatientCards()
    }, [])

    return (
        <View style={ styles.mainContent }>
        { response['error'] &&
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => getOutpatientCards()}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: 10}}>
                <Text style={{ color: "#F27C83", fontSize: MultiPlatform.AdaptivePixelsSize(30), }}>Нет карты</Text>
            </ScrollView>
        }
        { loading ?
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size={'large'}/>
            </View> :
            (
                <FlatList
                    data={patientCardData}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => getOutpatientCards()}
                        />
                    }
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return(
                            <MessageCard outPatient={true} item={ item }/>
                        )
                    }}
                />
            )
        }
    </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderBottomColor: '#E6E9ED',
        borderBottomWidth: 1,
    },
})

export default OutpatientCardScreen
