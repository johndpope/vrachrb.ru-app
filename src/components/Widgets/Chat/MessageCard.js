import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const MessageCard = ({ item }) => {

    const navigation = useNavigation()
    
    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity
                onPress={() => { 
                    navigation.navigate("ChatScreen", { id: item.id, 
                                                speciality: item.specialty, 
                                                spec_name: item.first_name + " " 
                                                + item.second_name + "." }) 
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
                        width: '55%',
                        justifyContent: 'space-between',
                    }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textSpeciality }>{ item.specialty }</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textName }>{ item.first_name + " " 
                                                                                                + item.second_name + "." 
                                                                                                + item.middle_name }</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textPreviewMessage }>{ item.body }</Text>
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
        borderRadius: 100,
        marginRight: 10
    }
})

export default MessageCard;
