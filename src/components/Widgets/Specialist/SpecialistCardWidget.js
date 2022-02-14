import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, PixelRatio, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { selectSpecialistID, selectSpecialtyID } from '../../../store/reducers/AnamnezSlice';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { MultiPlatform } from '../../MultiPlatform';

const SpecialistCardWidget = ({ data }) => {

    const dispatch = useDispatch()

    const navigation = useNavigation()
    
    const moveToNextScreen = () => {
        dispatch(selectSpecialistID(data.id))
        dispatch(selectSpecialtyID(data.specialty_id))
        navigation.navigate("StartScreen")
    }

    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity 
                onPress={() => moveToNextScreen()}
            >
                <View style={ styles.wrapperBlock }>
                    <View style={{ left: MultiPlatform.AdaptivePercentSize(2), width: '70%' }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={ styles.descriptionText }>{ data.User.first_name + " " + data.User.second_name + " " + data.User.middle_name }</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={{ ...styles.descriptionText, fontSize: MultiPlatform.AdaptivePixelsSize(13), fontWeight: '400' }}>{ data.about }</Text>
                        <View style={ styles.awardTextStyle }>
                            <Image style={{ width: MultiPlatform.AdaptivePixelsSize(13), height: MultiPlatform.AdaptivePixelsSize(13) }} source={ require('../../../images/star.png') }/>
                            <Text style={{ 
                                ...styles.descriptionText, 
                                fontSize: MultiPlatform.AdaptivePixelsSize(13), 
                                fontWeight: '400',
                                color: '#34BC9D',
                                marginRight: 10,
                                marginLeft: 4
                             }}>{ data.rating }</Text>
                            <Text style={{ 
                                ...styles.descriptionText, 
                                fontSize: MultiPlatform.AdaptivePixelsSize(13), 
                                fontWeight: '400',
                                color: '#AAB2BD' }}>{ data.answers_count + " - консультаций" }</Text>
                        </View>
                    </View>
                    <Image
                        style={ styles.imageStyle }
                        source={ data.User.photo === "" ? require('../../../images/user.png') : { uri: baseURL + "u/i/"+ data.User.photo }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: MultiPlatform.AdaptivePixelsSize(120),
    },
    descriptionText: {
        color: '#434A53',
        fontSize: MultiPlatform.AdaptivePixelsSize(19),
        fontWeight: '500',
    },
    imageStyle: {
        width: MultiPlatform.AdaptivePixelsSize(80),
        height: MultiPlatform.AdaptivePixelsSize(80),
        borderRadius: 150,
    },
    awardTextStyle: {
        
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5
    },
    wrapperBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E6E9ED',
        padding: 5
    }
});

export default SpecialistCardWidget
