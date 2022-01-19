import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CabinetCardWidget = ({ data }) => {
    return (
        <View style={ styles.mainContent }>
            <TouchableOpacity>
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
                        left: '27%',
                    }}>
                        <Text style={ styles.descriptionText }>{ data.doctorName }</Text>
                        <Text style={{ ...styles.descriptionText, fontSize: 13, fontWeight: '400' }}>{ data.description }</Text>
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
        left: "5%",
        width: 80,
        height: 80,
        borderRadius: 150,
    }
});

export default CabinetCardWidget
