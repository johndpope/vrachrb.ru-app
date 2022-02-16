import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import baseURL from '../../../requests/baseURL'
import ImageView from "react-native-image-viewing";
import uuid from 'react-native-uuid';
import { MultiPlatform } from '../../MultiPlatform';

const AnamnezCardItem = ({ item }) => {

    const imageDataList = []

    const itemsToRender = JSON.parse(item.value)
    const [showViewer, setShowViewer] = useState(false)
    const [imageList, setImageList] = useState(imageDataList)
    const [currentIndex, setCurrentIndex] = useState()

    useEffect(() => {
        (itemsToRender.file && typeof itemsToRender.file === 'string') && itemsToRender.file.split(';').forEach(element => {
            imageDataList.push(
                { uri: baseURL + "u/i/" + element }
            )
        });

        setImageList(imageDataList)
    }, [])

    // Многострочное, однострочное и многострочное с файлами

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
                        <Text style={{ color: '#434A53', fontSize: MultiPlatform.AdaptivePixelsSize(19), fontWeight: '700' }}>
                            { item.title }
                        </Text>
                        {
                            itemsToRender["bool"] ? 
                                (
                                    itemsToRender["bool"] == "Нет" ?
                                        <Text style={ styles.belowtextStyle }>Нет</Text> : 
                                        <Text style={ styles.belowtextStyle }>Да{ itemsToRender.val !== "" ? ", " + itemsToRender.val : itemsToRender.val }</Text>
                                ) : 
                            itemsToRender["choices"] ?
                                (
                                    <View>
                                        {
                                            Object.entries(itemsToRender["choices"]).map(([key, value]) => {
                                                return (
                                                    <Text key={key} style={ styles.belowtextStyle }>{ "- " + value }</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    
                                ) : 
                            (   <View>
                                    <Text style={ styles.belowtextStyle }>{ itemsToRender.val }</Text>
                                {
                                    itemsToRender.file !== undefined ?
                                    <View style={{ width: '100%', marginTop: 10 }}>
                                    {
                                        <FlatList 
                                            style={{
                                                width: '100%',
                                            }}
                                            horizontal={true}
                                            data={itemsToRender.file != [] && itemsToRender.file.split(';')}
                                            keyExtractor={(index) => index}
                                            renderItem={({ item, index }) => {
                                                return(
                                                    <TouchableOpacity 
                                                        onPress={() => { setCurrentIndex(index), setShowViewer(true) }} 
                                                        style={{ marginRight: 5 }}
                                                    >
                                                        <Image 
                                                            source={{ uri: baseURL + "u/i/" + item }} 
                                                            style={{ width: MultiPlatform.AdaptivePixelsSize(150), 
                                                            height: MultiPlatform.AdaptivePixelsSize(150), borderRadius: 12 }} />
                                                    </TouchableOpacity> 
                                                )
                                            }}
                                        />
                                    }
                                </View> : <View></View>
                                }
                                </View> ) 
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
        fontSize: MultiPlatform.AdaptivePixelsSize(17),
        color: '#434A53'
    }
})

export default AnamnezCardItem;