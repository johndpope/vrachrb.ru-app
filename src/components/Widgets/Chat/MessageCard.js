import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { MultiPlatform } from '../../MultiPlatform';
import Routes from "../../../requests/Routes";

const MessageCard = ({ item, outPatient }) => {

    const isSpecialist = useSelector(state => state.LoginSlice.userData.isSpecialist)
    const navigation = useNavigation()

    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity
                onPress={() => { outPatient ? console.log("outPatient: " + outPatient) :
                    navigation.navigate("ChatScreen", { id: item.id, 
                                                user_id: item.user_id,
                                                closed_by: item.closedBy,
                                                speciality: isSpecialist ? "" : " (" + item.specialty + ")" ,  
                                                spec_name:  item.first_name + item.second_name }) 
                }}
            >
                <View style={ styles.additionView }>
                    <View>
                        <Image 
                            style={styles.imageStyle}
                            source={ item?.specialist_photo ? {uri: Routes.imageURL + item.specialist_photo} : require('../../../images/user.png') }
                        />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        width: '55%',
                        justifyContent: 'space-between',
                    }}>
                        { !isSpecialist &&
                            <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textSpeciality }>{ item.specialty }</Text>
                        }
                        <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textName }>{ item.first_name + item.second_name + item.middle_name }</Text>
                        { item.closedBy == null ?
                            <Text numberOfLines={1} ellipsizeMode='tail' style={ styles.textPreviewMessage }>{ item.body }</Text>
                            :
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ ...styles.textPreviewMessage, color: '#F27C83' }}>Вопрос закрыт</Text>
                        }
                    </View>
                    { !outPatient &&
                        <View style={ styles.markRead } />
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: MultiPlatform.AdaptivePixelsSize(110),
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
        width: MultiPlatform.AdaptivePixelsSize(80),
        height: MultiPlatform.AdaptivePixelsSize(80),
        borderRadius: 150,
    },
    textSpeciality: {
        color: '#AAB2BD',
        fontSize: MultiPlatform.AdaptivePixelsSize(13)
    },
    textName: {
        fontSize: MultiPlatform.AdaptivePixelsSize(19),
        fontWeight: '500',
        color: '#434A53'
    },
    textPreviewMessage: {
        color: '#434A53',
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        fontWeight: '400'    
    },
    markRead: {
        width: MultiPlatform.AdaptivePixelsSize(10),
        height: MultiPlatform.AdaptivePixelsSize(10),
        backgroundColor: '#54B9D1',
        borderRadius: 100,
        marginRight: MultiPlatform.AdaptivePixelsSize(10)
    }
})

export default MessageCard;
