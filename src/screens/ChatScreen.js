import { useNavigation } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { GiftedChat, InputToolbar, Message, Send, SystemMessage } from 'react-native-gifted-chat';

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

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            title: route.params.item.name,
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

    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
            _id: 2,
            text: 'Hello developer2',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
            },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            textInputStyle={{
                color: 'black',
                padding: 10
            }}
            renderSend={props => customSend(props)}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
            _id: 1,
            }}
        />
    )
}

export default ChatScreen;
