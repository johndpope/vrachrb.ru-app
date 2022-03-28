import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomNavigationComponent = (props) => {

    const navigation = useNavigation()

    return (
        <View {...props} style={ styles.mainComponent }>
            <View style={ styles.navigationWrapper }>
                <TouchableOpacity onPress={() => { navigation.navigate("MainScreen") }}>
                    <Image style={ styles.imageStyle } source={ require("../../images/navigation/notepad.png") }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("MessageScreen") }}>
                    <Image style={ styles.imageStyle } source={ require("../../images/navigation/messages.png") }/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { console.log("HELLO") }}>
                    <Image style={ styles.imageStyle } source={ require("../../images/navigation/profile.png") }/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainComponent: {
        backgroundColor: '#00000000',
        position: 'absolute',
        width: '100%',
        padding: 15,
        bottom: 0,
        alignItems: 'center',
    },
    navigationWrapper: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 76,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    imageStyle: {
        width: 23,
        height: 23,
        margin: 15,
    }
})

export default CustomNavigationComponent;