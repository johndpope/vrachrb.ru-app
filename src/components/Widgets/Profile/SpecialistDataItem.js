import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { MultiPlatform } from '../../MultiPlatform'

const SpecialistDataItem = ({ item, count, imageType }) => {
    return (
        <View style={ styles.mainContent }>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                style={{ width: MultiPlatform.AdaptivePixelsSize(19), height: MultiPlatform.AdaptivePixelsSize(19), tintColor: imageType == 'star' ? '#34BC9D' : '#AAB2BD' }} 
                source={ imageType == 'star' ? require('../../../images/star_count.png') : require('../../../images/edit.png') } 
            />
            <Text style={{ color: '#434A53', fontSize: MultiPlatform.AdaptivePixelsSize(19), marginLeft: 5 }}>{ count }</Text>
            </View>
            <Text style={{ color: '#434A53', fontSize: MultiPlatform.AdaptivePixelsSize(19) }}>{ item }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: { 
        width: MultiPlatform.AdaptivePixelsSize(130), 
        height: MultiPlatform.AdaptivePixelsSize(80), 
        alignItems: 'center', 
        justifyContent: 'center', 
    }
})

export default SpecialistDataItem