import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View, Text, ScrollView } from 'react-native';
import MessageCard from '../components/Widgets/Chat/MessageCard'
import Request from '../requests/Request';
import {useSelector} from "react-redux";
import { MultiPlatform } from '../components/MultiPlatform';
import { useNavigation } from '@react-navigation/native';
import Routes from "../requests/Routes";

const MessagesScreen = () => {

    const [response, setResponse] = useState({})
    const [userChats, setUserChats] = useState() 
    const [loading, setLoading] = useState(false)
    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)
    const route = isSpecialist ? Routes.getSpecialistQuestionsURL : Routes.getUserQuestionsURL
    
    const navigation = useNavigation()

    const getChats = async () => {
        
        const DATA = []

        setResponse({})
        setLoading(true)
        let response = await Request.get(route, {});
        
        if(isSpecialist) {
            response["response"] && response["response"][0]["Questions"].forEach(element => {
                DATA.push({
                    id: element.id,
                    body: element.body,
                    specialty: "",
                    specialist_photo: element["User"].photo,
                    closedBy: element.closed_by,
                    user_id: element.user_id,
                    first_name: element.is_anonymous || element["User"]?.first_name == "" || element["User"]?.first_name == null
                                    ? "Anonymous" : element["User"]?.first_name + " ",
                    second_name: element.is_anonymous || element["User"]?.second_name == "" || element["User"]?.second_name == null
                                    ? "" : element["User"]?.second_name[0] + ". ",
                    middle_name: element.is_anonymous || element["User"]?.middle_name == "" || element["User"]?.middle_name == null 
                                    ? "" : element["User"]?.middle_name[0] + "."
                })
            });
        } else {
            response["response"] && response["response"][0]["Question"].forEach(element => {
                DATA.push({
                    id: element.id,
                    body: element.body,
                    specialist_photo: element["Specialists"][0]["User"].photo,
                    closedBy: element.closed_by,
                    user_id: element.user_id,
                    specialty: element["Specialtys"][0].title,
                    first_name: element["Specialists"][0]["User"]?.first_name == "" || element["Specialists"][0]["User"]?.first_name == null ? "" : element["Specialists"][0]["User"]?.first_name + " ",
                    second_name: element["Specialists"][0]["User"]?.second_name == "" || element["Specialists"][0]["User"]?.second_name == null ? "" : element["Specialists"][0]["User"]?.second_name[0] + ". ",
                    middle_name: element["Specialists"][0]["User"]?.middle_name == "" || element["Specialists"][0]["User"]?.middle_name == null ? "" : element["Specialists"][0]["User"]?.middle_name[0] + "."
                })
            });
        }

        setResponse(response)
        setUserChats(DATA)
        setLoading(false)
    }

    useEffect(() => {
        navigation.addListener(
            'focus',
            payload => {
                getChats()
            }
        );
    }, [])

    return (
        <View style={ styles.mainContent }>
            { response['error'] &&
                <ScrollView 
                    refreshControl={
                        <RefreshControl 
                            refreshing={loading}
                            onRefresh={() => getChats()}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                    <Text style={{ color: "#F27C83", fontSize: MultiPlatform.AdaptivePixelsSize(30), }}>{response['error']}</Text>
                </ScrollView>
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
                                <MessageCard outPatient={false} item={ item }/>
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
        height: '100%',
        justifyContent: 'center',
    }
})

export default MessagesScreen;
