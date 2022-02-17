import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useDispatch} from "react-redux";
import {setSpecialistData, setSpecialistRoute} from "../../../store/reducers/SpecSlice";
import {useNavigation} from "@react-navigation/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { MultiPlatform } from '../../MultiPlatform';

const CabinetCardWidget = ({ data }) => {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    function setCabinet(){
        dispatch(setSpecialistRoute("GetSpecialistBySpecialtyID"))
        dispatch(setSpecialistData({specialtyId : data.id}))
        navigation.navigate("Специалист")
    }

    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity onPress={() => setCabinet()}>
                <View style={ styles.wrapperBlock }>
                    <View style={{
                        width: MultiPlatform.AdaptivePercentSize(30)
                    }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={ styles.descriptionText }>{ data.title }</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ ...styles.descriptionText, fontSize: MultiPlatform.AdaptivePixelsSize(13), fontWeight: '400' }}>{ data.description }</Text>
                    </View>
                    <Image 
                        style={{
                            width: MultiPlatform.AdaptivePixelsSize(12), 
                            height: MultiPlatform.AdaptivePixelsSize(19),
                            right: MultiPlatform.AdaptivePercentSize(1)
                        }}
                        source={ require('../../../images/shevron.png') }
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: MultiPlatform.AdaptivePixelsSize(100),
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
    wrapperBlock: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E6E9ED'
    }
});

export default CabinetCardWidget
