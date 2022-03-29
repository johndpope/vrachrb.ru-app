import React from 'react'
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { MultiPlatform } from '../MultiPlatform'
import {colors} from '../../styles/colors'

const BaseSearchComponent = ({ searchItem, value, setValue }) => {
    return (
        <View style={ styles.mainContent }>
            <TextInput 
                defaultValue={value}
                style={ styles.textInputStyle } 
                placeholder='Поиск...'
                placeholderTextColor={"#AAB2BD"}
                onChangeText={text => { text !== "" ? setValue(text) : "", searchItem(text) }}
            />
            {
                value !== "" ?
                <TouchableOpacity
                    onPress={() => { setValue(""), searchItem("") }} 
                    style={{
                        position: 'absolute',
                        width: 30,
                        height: 30, 
                        right: MultiPlatform.AdaptivePixelsSize(20),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Image style={{
                        width: 15,
                        height: 15,
                        tintColor: colors.MEDIUM_GRAY_COLOR,
                    }} source={ require('../../images/delete_cross.png') }/>
                </TouchableOpacity> : <View></View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: { 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: MultiPlatform.AdaptivePixelsSize(10),
        paddingLeft: MultiPlatform.AdaptivePixelsSize(13),
        paddingRight: MultiPlatform.AdaptivePixelsSize(13)
    },
    textInputStyle: { 
        backgroundColor: '#F3F4F6',  
        paddingLeft: MultiPlatform.AdaptivePixelsSize(15),
        width: '100%',
        height: 40, 
        borderRadius: 30, 
        color: '#434A53', 
        fontSize: 15 
    }
})

export default BaseSearchComponent