import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import baseURL from '../../../requests/baseURL'
import ImageView from "react-native-image-viewing";
import uuid from 'react-native-uuid';

const AnamnezCardItem = ({ item }) => {

    const imageDataList = []

    const itemsToRender = JSON.parse(item.value)
    const [showViewer, setShowViewer] = useState(false)
    const [imageList, setImageList] = useState(imageDataList)
    const [currentIndex, setCurrentIndex] = useState()

    useEffect(() => {
        itemsToRender.file && itemsToRender.file.split(';').forEach(element => {
            imageDataList.push(
                { uri: baseURL + "u/i/" + element }
            )
        });

        setImageList(imageDataList)
    }, [])

    return (
        <View style={ styles.mainContent }>
            {
                showViewer ? (
                    <ImageView 
                        images={imageList}
                        imageIndex={currentIndex}
                        visible={showViewer}
                        swipeToCloseEnabled={false}
                        onRequestClose={() => setShowViewer(false)}
                    />
                ) : 
                (
                    <View>
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
                                itemsToRender.file && 
                                <View style={{ width: '100%', marginTop: 10 }}>
                                    {
                                        <FlatList 
                                            style={{
                                                width: '100%',
                                            }}
                                            horizontal={true}
                                            data={itemsToRender.file.split(";")}
                                            keyExtractor={(index) => index}
                                            renderItem={({ item, index }) => {
                                                return(
                                                    <TouchableOpacity 
                                                        onPress={() => { setCurrentIndex(index), setShowViewer(true) }} 
                                                        style={{ marginRight: 5 }}
                                                    >
                                                        <Image 
                                                            source={{ uri: baseURL + "u/i/" + item }} 
                                                            style={{ width: 150, height: 150, borderRadius: 12 }} />
                                                    </TouchableOpacity> 
                                                )
                                            }}
                                        />
                                    }
                                </View>
                            )
                        }
                    </View>
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
