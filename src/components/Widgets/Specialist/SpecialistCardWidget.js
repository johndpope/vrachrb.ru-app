import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const SpecialistCardWidget = ({ data }) => {

    const navigation = useNavigation()

    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity 
                onPress={() => navigation.navigate("StartScreen")}
            >
                <View style={ styles.wrapperBlock }>
                    <View style={{
                        position: 'absolute',
                        left: '5%',
                        width: '68%',
                    }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={ styles.descriptionText }>{ data.User.first_name + " " + data.User.second_name + " " + data.User.middle_name }</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ ...styles.descriptionText, fontSize: 13, fontWeight: '400' }}>{ data.about }</Text>
                        <View style={ styles.awardTextStyle }>
                            <Image style={{ width: 13, height: 13 }} source={ require('../../../images/star.png') }/>
                            <Text style={{ 
                                ...styles.descriptionText, 
                                fontSize: 13, 
                                fontWeight: '400',
                                marginRight: 10,
                                color: '#34BC9D',
                                marginLeft: 4
                             }}>{ data.rating }</Text>
                            <Text style={{ 
                                ...styles.descriptionText, 
                                fontSize: 13, 
                                fontWeight: '400',
                                color: '#AAB2BD' }}>{ data.answers_count + " - консультаций" }</Text>
                        </View>
                    </View>
                    <Image 
                        style={ styles.imageStyle }
                        source={ require('../../../images/doctor.jpg') }
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: 120,
    },
    descriptionText: {
        color: '#434A53',
        fontSize: 19,
        fontWeight: '500',
    },
    imageStyle: {
        position: 'absolute',
        right: "5%",
        width: 80,
        height: 80,
        borderRadius: 150,
    },
    awardTextStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    wrapperBlock: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E6E9ED'
    }
});

export default SpecialistCardWidget
