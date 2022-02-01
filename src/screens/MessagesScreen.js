import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MessageCard from '../components/Widgets/Chat/MessageCard'

const DATA1 = {
    "response": [
        {
            "id": "14128",
            "username": "CLIENT",
            "Question": [
                {
                    "id": "11",
                    "body": "Hello1",
                    "closed_by": null,
                    "Answer": [
                        {
                            "id": "17",
                            "user_id": "14129",
                            "question_id": "11",
                            "body": "Hello1",
                            "type": "",
                            "comment_id": null,
                            "attachment": "",
                            "created_at": "2022-01-31 08:01:17",
                            "updated_at": "2022-01-31 08:01:17"
                        },
                        {
                            "id": "18",
                            "user_id": "14128",
                            "question_id": "11",
                            "body": "Test",
                            "type": "",
                            "comment_id": null,
                            "attachment": "",
                            "created_at": "2022-01-31 08:01:39",
                            "updated_at": "2022-01-31 08:01:39"
                        }
                    ],
                    "Specialtys": [
                        {
                            "id": "6",
                            "title": "Хирург",
                            "description": ""
                        }
                    ],
                    "Specialists": [
                        {
                            "id": "125",
                            "user_id": "14129",
                            "specialty_id": "6",
                            "title_url": "specialist1_specialist1_specialist1",
                            "rating": null,
                            "answers_count": null,
                            "about": "SPECIALIST1",
                            "education": "<p>SPECIALIST1<span id=\"pastemarkerend\">&nbsp;</span></p>\r\n",
                            "live_reception": false,
                            "certificate": "",
                            "question_count": null,
                            "prompt_count": null,
                            "article_count": null,
                            "User": {
                                "id": "14129",
                                "username": "SPECIALIST1",
                                "first_name": "SPECIALIST1",
                                "second_name": "SPECIALIST1",
                                "middle_name": "SPECIALIST1",
                                "gender": "м",
                                "birth_date": "2000-01-05 00:00:00",
                                "email": "specialist1@specialist1.com",
                                "phone": "2352",
                                "salt": "c81ea96c48d840499ca7f52ebe6747d7c9bffa62",
                                "password": "35ecf7b137c731f449e0b6ce44d1177db3076d86",
                                "photo": "",
                                "is_active": true,
                                "is_super_admin": false,
                                "last_login": "2022-01-31 07:59:36",
                                "password_check": null,
                                "created_at": "2022-01-31 07:59:29",
                                "updated_at": "2022-01-31 07:59:36"
                            }
                        }
                    ]
                }, 
            ]
        }
    ]
}

const DATA = [
    {
        id: 1,
        speciality: "Невролог",
        name: "Иванова Н. В.",
        message: "Срочно требуется сделать ре..."
    },
    {
        id: 2,
        speciality: "Невролог",
        name: "Иванова Н. В.",
        message: "Срочно требуется сделать ре..."
    },
    {
        id: 3,
        speciality: "Невролог",
        name: "Иванова Н. В.",
        message: "Срочно требуется сделать ре..."
    },    
    {
        id: 4,
        speciality: "Невролог",
        name: "Иванова Н. В.",
        message: "Срочно требуется сделать рентген жопы"
    }
]
        
const MessagesScreen = () => {
    return (
        <View style={ styles.mainContent }>
            <FlatList 
                data={DATA}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return(
                        <MessageCard item={ item } />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    }
})

export default MessagesScreen;
