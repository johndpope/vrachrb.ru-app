import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const SecondAuthButton = ({text, nav}) => {
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: 22 }}>
            <TouchableOpacity onPress={() => navigation.navigate(nav)}>
                <Text style={ styles.textStyle }>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#54B9D1',
        fontSize: 17
    },
})

export default SecondAuthButton
