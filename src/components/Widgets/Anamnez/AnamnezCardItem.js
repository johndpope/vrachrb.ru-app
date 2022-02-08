import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import baseURL from '../../../requests/baseURL'

const AnamnezCardItem = ({ item }) => {

    const itemsToRender = JSON.parse(item.value)

    return (
        <View style={ styles.mainContent }>
            <Text style={{ color: '#434A53', fontSize: 17, fontWeight: '700' }}>
                { item.title }
            </Text>
            {
                itemsToRender["bool"] ? 
                    (
                        itemsToRender["bool"] == "Нет" ?
                            <Text style={ styles.belowtextStyle }>Нет</Text> : 
                            <Text style={ styles.belowtextStyle }>Да, { itemsToRender.val }</Text>
                    ) : 
                itemsToRender["choices"] ?
                    (
                        itemsToRender["choices"].map((item) => {
                            return (
                                <Text style={ styles.belowtextStyle }>{ "- " + item }</Text>
                            )
                        })
                    ) : 
                ( <Text style={ styles.belowtextStyle }>{ itemsToRender.val }</Text> ,
                    itemsToRender.file && itemsToRender.file.split(";").map((item) => (
                        <Image source={{ uri: baseURL + "u/i/" + item }} style={{ width: 150, height: 150 }} />
                    )) 
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10
    }, 
    belowtextStyle: {
        fontSize: 15,
        color: '#434A53'
    }
})

export default AnamnezCardItem;
