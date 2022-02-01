import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const MessageCard = ({ item }) => {

    const navigation = useNavigation()

    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity
                onPress={() => { 
                    navigation.navigate("ChatScreen", { item: item }) 
                }}
            >
                <View style={ styles.additionView }>
                    <View>
                        <Image 
                            style={ styles.imageStyle }
                            source={ require('../../../images/doctor.jpg') }
                        />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        width: '60%',
                    }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textSpeciality }>{ item.speciality }</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textName }>{ item.name }</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textPreviewMessage }>{ item.message }</Text>
                    </View>
                    <View style={ styles.markRead } />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: 110,
        width: '100%',
        borderBottomColor: '#E6E9ED',
        borderBottomWidth: 1,
    },   
    additionView: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 150,
    },
    textSpeciality: {
        color: '#AAB2BD',
        fontSize: 13
    },
    textName: {
        fontSize: 19,
        fontWeight: '500',
        color: '#434A53'
    },
    textPreviewMessage: {
        color: '#434A53',
        fontSize: 17,
        fontWeight: '400'    
    },
    markRead: {
        width: 10,
        height: 10,
        backgroundColor: '#54B9D1',
        borderRadius: 100
    }
})

export default MessageCard;
