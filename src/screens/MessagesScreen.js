import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import MessageCard from '../components/Widgets/Chat/MessageCard'
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';

const MessagesScreen = () => {

    const [response, setResponse] = useState({})
    const [userChats, setUserChats] = useState() 
    const [loading, setLoading] = useState(false)

    const DATA = []

    const getChats = async () => {
        setResponse({})
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

        setResponse(response)
        setUserChats(DATA)
        setLoading(false)
    }

    useEffect(() => {
        getChats()
    }, [])

    return (
        <View style={ styles.mainContent }>
            { response['error'] &&
            <Text style={{ color: "#F27C83", fontSize: 30, alignItems: 'center', justifyContent: 'center',}}>{response['error']}</Text>
            }
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
                )
            }
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
