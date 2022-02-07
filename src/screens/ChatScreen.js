import { useNavigation } from '@react-navigation/native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, Image, ActivityIndicator, StyleSheet, Modal, View, Text } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import baseApiURL from '../requests/baseApiURL';
import baseURL from '../requests/baseURL';
import Request from '../requests/Request';
import ImageView from "react-native-image-viewing";

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
    const [isModalOpen, setModalOpen] = useState(false)
    const [images, setImages] = useState([])

    const renderMessageImage = (props) => {
        const images = [
          props.currentMessage.image,
        ];
        return(
            <View style={{ padding: 3 }}>
                <TouchableOpacity 
                    style={{ width: 150, height: 100, justifyContent: 'center', 
                        alignItems: 'center', backgroundColor: 'white', borderRadius: 13 }}
                    onPress={() => navigation.navigate("DisplayAnamnezScreen")}
                >
                    <Image source={ require('../images/text-document.png') } style={{ width: 50, height: 50 }}/>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => { setModalOpen(true), setImages(images) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image 
                            source={{ uri: props.currentMessage.image }}
                            style = {styles.image}
                        />
                        <Image 
                            source={{ uri: props.currentMessage.image }}
                            style = {styles.image}
                        />
                    </View>
                </TouchableOpacity> */}
            </View>
        );
    }

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
                    image: baseURL + "u/i/2/7/a/1.png",
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
        await Request.post(baseApiURL + "SendMessage", {question_id: route.params.id, body: messages[0].text})
        
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return ( loading ? (
            <ActivityIndicator size={'large'}/>
        ) : isModalOpen ? (                
        <ImageView 
            images={[{ uri: "http://192.168.2.66:8080/u/i/2/7/a/1.png"}, { uri: "http://192.168.2.66:8080/u/i/2/7/a/1.png"}]} 
            imageIndex={0}
            visible={isModalOpen}
            swipeToCloseEnabled={false}
            onRequestClose={() => setModalOpen(false)}
        />) : (
            <GiftedChat
                textInputStyle={{ color: 'black' }}
                containerStyle={{ backgroundColor: '#F3F4F6', height: '10%' }}
                messagesContainerStyle={{ backgroundColor: '#FFFFFF', height: '95%'}}
                placeholder='Сообщение'
                renderMessageImage={props => renderMessageImage(props)}
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


const styles = StyleSheet.create({
    image: {
      width: 110,
      height: 110,
      borderRadius: 13,
      margin: 3,
      resizeMode: 'cover',
    },
});

export default ChatScreen;
