import React, { Component, useState } from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker'

const ImagesCustomAction = ({ data, textInput }) => {

    const [imageData, setImageData] = useState([])

    const deleteImage = async (id) => {
        let imageDataPrev = [...imageData]

        imageDataPrev.splice(id, 1)

        setImageData(imageDataPrev)
    }

    const imagePick = async () => {
        const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.images]
        });
        console.log(imageData)
        setImageData(imageDataPrev)

        let imageDataPrev = [...imageData]

        imageDataPrev.push(
            {
                id: imageDataPrev.length + 1,
                image: result[0].uri
            }
        )
        console.log(imageData.length)
        setImageData(imageDataPrev)
        // await upload(result[0])
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {
                (imageData && imageData.length !== 0) && (
                    <View style={{ width: Dimensions.get('screen').width, height: 70 }}>
                        <FlatList
                            data={imageData}
                            horizontal={true}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 5}}>
                                        <TouchableOpacity 
                                            onPress={() => deleteImage(index)}
                                            style={{ width: 20, height: 20, zIndex: 1, 
                                                backgroundColor: 'red', bottom: -15, left: 5, 
                                                borderRadius: 10, justifyContent: 'center',
                                                alignItems: 'center', 
                                                backgroundColor: '#F27C83', }}
                                        >  
                                            <Image style={{ width: '50%', height: '50%' }} source={ require('../../../images/delete_cross.png') }/>
                                        </TouchableOpacity>
                                        <Image source={{ uri: item.image }} style={{ height: 65, width: 65, marginLeft: 10, borderRadius: 8 }}/>
                                    </View>
                                )
                            }}
                        />
                    </View>
                )
            }
            {
                textInput == "" && (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => imagePick()}>
                            <Image source={ require('../../../images/attach.png') } style={{ width: 23, height: 23, tintColor: '#AAB2BD' }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10 }} >
                            <Image source={ require('../../../images/camera.png') } style={{ width: 23, height: 23, tintColor: '#AAB2BD' }}/>
                        </TouchableOpacity>
                        {
                            (imageData && imageData.length !== 0) && (
                                <TouchableOpacity style={{ padding: 10 }} onPress={() => data.onSend(
                                    {
                                        "image": ""
                                    }
                                )}>
                                    <Image source={ require('../../../images/paper-plane.png') } style={{ width: 23, height: 23, tintColor: '#AAB2BD' }}/>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )
            }
        </View>
    )
}

export default ImagesCustomAction;
