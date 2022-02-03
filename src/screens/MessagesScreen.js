import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import MessageCard from '../components/Widgets/Chat/MessageCard'
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';

const MessagesScreen = () => {

    const [userChats, setUserChats] = useState() 
    const [loading, setLoading] = useState(false)

    const DATA = []

    const getChats = async () => {
        setLoading(true)
        let response = await Request.get(baseApiURL + "Get_user_questions", {});

        response["response"] && response["response"][0]["Question"].forEach(element => {
            DATA.push({
                id: element.id,
                body: element.body,
                specialty: element["Specialtys"][0].title,
                first_name: element["Specialists"][0]["User"].first_name,
                second_name: element["Specialists"][0]["User"].second_name[0],
                middle_name: element["Specialists"][0]["User"].middle_name[0]
            })
        });

        setUserChats(DATA)
        setLoading(false)
    }

    useEffect(() => {
        getChats()
    }, [])

    return (
        <View style={ styles.mainContent }>
            { loading ? <ActivityIndicator size={'large'} /> : 
                (
                    <FlatList 
                        data={userChats}
                        refreshControl={
                            <RefreshControl 
                                refreshing={loading}
                                onRefresh={() => getChats()}
                            />
                        }
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return(
                                <MessageCard item={ item }/>
                            )
                        }}
                    />
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center'
    }
})

export default MessagesScreen;
