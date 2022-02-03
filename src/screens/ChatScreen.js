import { useNavigation } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { GiftedChat, InputToolbar, Message, Send, SystemMessage } from 'react-native-gifted-chat';
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';

const customSend = props => {
    return (
        <Send
            {...props}
            containerStyle={{
                height: 34,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
        </Send>
    )
}

const ChatScreen = ({ route }) => {

    const DATA = []

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState()

    const getAllMessages = async () => {
        setLoading(true)
        let response = await Request.get(baseApiURL + "Get_answers_by_questionid", {question_id: route.params.id})
        
        if (response['response']){
            setUserID(response['response'][0]["user_id"])
            response['response'][0]['Answer'].forEach(element => {
                DATA.push(
                    {
                        _id: element.id,
                        text: element.body,
                        createdAt: element.created_at,
                        user: {
                            _id: element.user_id,
                            name: 'Доктор',
                        },
                    },
                )
            })

            response['response'][0]['Answer'].lenght != 0 && DATA.push(
                {
                    _id: response['response'][0].id,
                    text: response['response'][0].body,
                    createdAt: response['response'][0].created_at,
                    user: {
                        _id: response['response'][0].user_id,
                        name: 'Доктор',
                    },
                },
            )
        }

        setMessages(DATA)
        setLoading(false)
    }

    useEffect(() => {
        navigation.setOptions({
            title: route.params.spec_name + " (" + route.params.speciality + ")",
            headerRight: () => (
                <Image 
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 100
                    }}
                    source={ require('../images/doctor.jpg') }
                />
            )
        })
    }, [])

    useEffect(() => {
        getAllMessages()
    }, [])
  
    const onSend = useCallback( async (messages = []) => {
        let response = await Request.post(baseApiURL + "SendMessage", {question_id: route.params.id, body: messages[0].text})
        
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return ( loading ? (
            <ActivityIndicator size={'large'}/>
        ) : (
            <GiftedChat
                textInputStyle={{ color: 'black' }}
                containerStyle={{ backgroundColor: '#F3F4F6' }}
                messagesContainerStyle={{ backgroundColor: '#FFFFFF'}}
                placeholder='Сообщение'
                renderSend={props => customSend(props)}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                }}
            />
        )
    )
}

export default ChatScreen;
