import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import MessageCard from '../components/Widgets/Chat/MessageCard'

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
