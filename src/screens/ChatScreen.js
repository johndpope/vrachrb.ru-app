import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet, View, Text, Image } from 'react-native';
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import Request from '../requests/Request';
import ImageView from "react-native-image-viewing";
import ImagesCustomAction from '../components/Widgets/Chat/ImagesCustomAction';
import {
    HeaderButtons,
    HiddenItem,
    OverflowMenu,
  } from 'react-navigation-header-buttons';
import { MultiPlatform } from '../components/MultiPlatform';
import CustomComposer from '../components/Widgets/Chat/CustomComposer';
import { useSelector } from 'react-redux';
import Routes from "../requests/Routes";
import NotificationAgent from '../components/NotificationManager/NotificationAgent';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const ImageProgress = createImageProgress(FastImage);

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
            <Image style={{ width: MultiPlatform.AdaptivePixelsSize(23),
                height: MultiPlatform.AdaptivePixelsSize(23), tintColor: '#54B9D1', marginTop: 5, marginBottom: 10 }} source={ require('../images/paper-plane.png') }/>
        </Send>
    )
}

const ChatScreen = ({ route }) => {

    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)

    let DATA = []

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    const [userID, setUserID] = useState()
    const [isModalOpen, setModalOpen] = useState(false)
    const [images, setImages] = useState([])
    const [disableButton, setDisableButton] = useState("")
    const [indexPhoto, setIndexPhoto] = useState(0)
    const [isOpened, setIsOpened] = useState(false)
    const [closed, setClosed] = useState(route.params.closed_by)

    const renderCustomToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#ffffff',
                    paddingHorizontal: 0,
                    justifyContent: 'flex-end',
                }}
                disableInputToolBar={true}
                renderActions={closed == null ? (props => <ImagesCustomAction setIsOpened={setIsOpened} data={props} textInput={disableButton}/>) : null}
            />
        )
    }

    const renderMessageImage = (props) => {
        const imagesChat = props.currentMessage.image

        let imagesPrev = []
        imagesChat.map(element => {
            imagesPrev.push(
                {
                    uri: Routes.imageURL + element
                }
            )
        })

        return(
            <View>
                {
                    imagesChat[0] == "../images/text-document.png" && (
                        <View>
                            <TouchableOpacity
                                style={{ width: 150, height: 100, justifyContent: 'center',
                                    alignItems: 'center', backgroundColor: 'white', borderRadius: 13, margin: 3, }}
                                onPress={() => navigation.navigate("DisplayAnamnezScreen", {id: route.params.id})}
                            >
                                <Image source={ require('../images/text-document.png') } style={{ width: 50, height: 50 }}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: 150, height: 100, justifyContent: 'center',
                                    alignItems: 'center', backgroundColor: 'white', borderRadius: 13, margin: 3, }}
                                onPress={() => navigation.navigate("OutpatientCardScreen", {id: route.params.user_id})}
                            >
                                <Image source={ require('../images/form.png') } style={{ width: 50, height: 50 }}/>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    imagesChat[0] !== "../images/text-document.png" &&
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{ padding: 5 }} onPress={() => { setModalOpen(true), setImages(imagesPrev), setIndexPhoto(0) }}>
                            <ImageProgress
                                imageStyle={styles.image}
                                style={styles.image}
                                source={{ uri: Routes.imageURL + imagesChat[0] }}

                            />

                        </TouchableOpacity>
                        { imagesChat && imagesChat.length > 1 &&
                            <TouchableOpacity style={{ padding: 5 }} onPress={() => { setModalOpen(true), setImages(imagesPrev), setIndexPhoto(1) }}>
                                <ImageProgress
                                    imageStyle={styles.image}
                                    source={{ uri: Routes.imageURL + imagesChat[1] }}
                                    style={styles.image}
                                />
                                {   imagesChat && imagesChat.length > 2 &&
                                    <View
                                        style={{ marginLeft: 5, marginTop: 5,
                                            position: 'absolute', width: 130, height: 130, borderRadius: 13,
                                            backgroundColor: '#00000095',
                                            justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white', fontSize: MultiPlatform.AdaptivePixelsSize(27) }}>{ "+ " + (imagesChat.length - 2) }</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        }
                    </View>
                }
            </View>
        );
    }

    const getAllMessages = () => {
        setLoading(true)
        DATA = []
        setMessages(DATA)
        Request.get(Routes.getAnswersByQuestionIdURL, {question_id: route.params.id})
            .then(response => {
                response['response'] &&
                setUserID(response['response'][0]["my_id"])
                setClosed(response['response'][0]["closed_by"])
                response['response'][0]['Answer'].forEach(element => {
                    DATA.push(
                        {
                            _id: element.id,
                            text: element.body,
                            image: element["attachment"] && element["attachment"].split(';'),
                            createdAt: element.created_at,
                            user: {
                                _id: element.user_id,
                                name: isSpecialist ? "Пользователь" : 'Доктор',
                            },
                        },
                    )
                }),

                response['response'][0]['Answer'].lenght != 0 && DATA.push(
                    {
                        _id: response['response'][0].id - 1,
                        text: response['response'][0].body,
                        image: ['../images/text-document.png'],
                        createdAt: response['response'][0].created_at,
                        user: {
                            _id: response['response'][0].user_id,
                            name: isSpecialist ? "Пользователь" : 'Доктор',
                        },
                    },
                ),

                setMessages(DATA)
                setLoading(false)
            })
    }

    const closeQuestion = async () => {
        await Request.post(Routes.closeQuestionURL, {question_id: route.params.id})

        // navigation.navigate("MessagesScreen")

        setClosed("test")
    }

    const onSend = useCallback( async (messages = [], isTextInput = true) => {
        if (isTextInput){
            let response = await Request.post(Routes.sendMessageURL, {
                question_id: route.params.id,
                body: messages[0].text,
                attachment: messages[0].image ? messages[0].image.join(";") : ""
            })

            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

            if(response["error"]) {
                navigation.navigate("MessagesScreen")
                return MultiPlatform.ToastShow(response["error"])
            }
        }

        if (messages[0].chat_id == route.params.id){
            setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({
            title: route.params.spec_name + route.params.speciality,
            headerRight: isSpecialist ? () => (
                <HeaderButtons>
                    <OverflowMenu
                        OverflowIcon={({ color }) =>
                            <Image
                                style={{ width: MultiPlatform.AdaptivePixelsSize(19), height: MultiPlatform.AdaptivePixelsSize(19) }}
                                source={ require('../images/dots.png') }
                            />}
                    >
                        <HiddenItem
                            onPress={closed == null ? () => closeQuestion() : () => MultiPlatform.ToastShow("Вы уже закрыли вопрос")}
                            titleStyle={{
                                color: '#F27C83',
                            }}
                            title="Закрыть беседу"
                        />
                    </OverflowMenu>
                </HeaderButtons>
            ) : () => <View></View>
        })
        getAllMessages()

        NotificationAgent.registerNotificationEvents(false, onSend)
    }, [])

    return (
        loading ?
        (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <ActivityIndicator size={'large'}/>
            </View>
        ) :
        isModalOpen ?
        (
            <ImageView
                images={images}
                imageIndex={indexPhoto}
                supportedOrientations={
                    [
                        'portrait',
                        'portrait-upside-down',
                        'landscape',
                        'landscape-left',
                        'landscape-right'
                    ]
                }
                visible={isModalOpen}
                swipeToCloseEnabled={false}
                onRequestClose={() => setModalOpen(false)}
            />
        ) :
        (
            <GiftedChat
                textInputStyle={{ color: 'black' }}
                messagesContainerStyle={{ backgroundColor: '#FFFFFF', overflow: 'scroll'}}
                placeholder={closed ? 'Вопрос закрыт' : 'Сообщение'}
                onInputTextChanged={props => setDisableButton(props)}
                renderMessageImage={props => renderMessageImage(props)}
                renderSend={props => customSend(props)}
                renderComposer={closed !== null ? (props => <CustomComposer questionId={route.params.id} isSpecialist={isSpecialist} data={props}/>) : null}
                renderInputToolbar={props => renderCustomToolbar(props)}
                messages={messages}
                disableComposer={closed ? true : false}
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
      width: 130,
      height: 130,
      borderRadius: 13,
    //   margin: 3,
      resizeMode: 'cover',
    },
});

export default ChatScreen;