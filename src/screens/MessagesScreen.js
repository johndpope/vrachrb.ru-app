import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text } from 'react-native';
import MessageCard from '../components/Widgets/Chat/MessageCard'
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';
import {useSelector} from "react-redux";
import { RFValue } from 'react-native-responsive-fontsize';

const MessagesScreen = () => {

    const [response, setResponse] = useState({})
    const [userChats, setUserChats] = useState() 
    const [loading, setLoading] = useState(false)
    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)
    const route = isSpecialist ? "Get_specialist_questions" : "Get_user_questions"

    const DATA = []

    const getChats = async () => {
        setResponse({})
        setLoading(true)
        let response = await Request.get(baseApiURL + route, {});

        if(isSpecialist) {
            response["response"] && response["response"][0]["Questions"].forEach(element => {
                DATA.push({
                    id: element.id,
                    body: element.body,
                    specialty: "",
                    first_name: element["User"].first_name,
                    second_name: element["User"].second_name[0],
                    middle_name: element["User"].middle_name[0]
                })
            });
        } else {
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
        }

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
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: "#F27C83", fontSize: RFValue(30), }}>{response['error']}</Text>
                </View>
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
        justifyContent: 'center',
    }
})

export default MessagesScreen;
