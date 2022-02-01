import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useDispatch} from "react-redux";
import {setSpecialistData, setSpecialistRoute} from "../../../store/reducers/SpecSlice";
import {useNavigation} from "@react-navigation/native";

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
                <View style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#E6E9ED'
                }}>
                    <Image 
                        style={ styles.imageStyle }
                        source={ require('../../../images/doctor.jpg') }
                    />
                    <View style={{
                        position: 'absolute',
                        marginLeft: 'auto',
                        left: '26%',
                        width: '60%'
                    }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={ styles.descriptionText }>{ data.title }</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ ...styles.descriptionText, fontSize: 13, fontWeight: '400' }}>{ data.description }</Text>
                    </View>
                    <Image 
                        style={{
                            width: 10, 
                            height: 19,
                            position: 'absolute',
                            right: '5%'
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
        height: 100,
    },
    descriptionText: {
        color: '#434A53',
        fontSize: 19,
        fontWeight: '500',
    },
    imageStyle: {
        position: 'absolute',
        left: "3%",
        width: 80,
        height: 80,
        borderRadius: 150,
    }
});

export default CabinetCardWidget
