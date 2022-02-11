import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import AnamnezCardItem from '../../components/Widgets/Anamnez/AnamnezCardItem';
import baseApiURL from '../../requests/baseApiURL';
import Request from '../../requests/Request'


const DisplayAnamnezScreen = ({ route }) => {

    const [anamnesQuestion, setAnamnesQuestion] = useState()
    const [loading, setLoading] = useState(false)

    const getAnamnesQuestion = () => {
        setLoading(true)
        Request.get(baseApiURL + "Get_question_anamnes", {question_id: route.params.id})
            .then(response => { setAnamnesQuestion(response["response"]), setLoading(false)})
    }

    useEffect(() => {
        getAnamnesQuestion()
    }, [])

    return (
        <View style={ styles.mainContent }>
            {
                loading ? <ActivityIndicator size={'large'}/> : (
                    <FlatList 
                        style={{  width: '85%' }}
                        data={anamnesQuestion}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <AnamnezCardItem key={index} item={ item } />
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
})

export default DisplayAnamnezScreen;
