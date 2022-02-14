import React, { Component, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import CameraPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import { MultiPlatform } from '../../MultiPlatform';

const ImagesCustomAction = ({ data, textInput }) => {

    const [imageData, setImageData] = useState([])
    const [serverImage, setServerImage] = useState([])
    const [loading, setLoading] = useState(false)

    const deleteImage = async (id) => {
        let imageDataPrev = [...imageData]

        imageDataPrev.splice(id, 1)

        setImageData(imageDataPrev)
    }

    const imagePick = async () => {
        CameraPicker.openPicker({
            cropping: true,
            compressImageQuality: 0.8,
          })
        .then(image => {  
            setImageData(imageDataPrev)

            let imageDataPrev = [...imageData]

            imageDataPrev.push(
                {
                    id: imageDataPrev.length + 1,
                    uri: image.path
                }
            )
            console.log(imageData.length)
            setImageData(imageDataPrev)
        })
    }

    const photoPickFromCamera = () => {
        try {
            CameraPicker.openCamera({
                cropping: true,
                compressImageQuality: 0.5,
              })
            .then(image => {
                setImageData(imageDataPrev)
                let imageDataPrev = [...imageData]
                console.log(image)
                imageDataPrev.push(
                    {
                        id: imageDataPrev.length + 1,
                        uri: image.path
                    }
                )
                console.log(imageData.length)
                setImageData(imageDataPrev)
            })
        } catch (e){
            console.log("ERROR")
        }
    }

    const upload = async (resp) => {
        let data = new FormData();
        try {
            data.append('file', {
                uri: resp.path,
                type: resp.mime,
                name: resp.path.split("/").reverse()[0]
            });
            const response = await fetch(baseURL + 'uploader?key=analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            });
            const text = await response.text();
            console.log('text', text);
            let json = JSON.parse(text);
            if (json.state === 'success') {
                return json.filename 
            } else {
                Alert.alert(json.message);
            }
        } catch (e) {
            Alert.alert(e);
        }
    }

    const uploadAllFiles = async (photos) => {
        setLoading(true)
        let serverImagePrev = [...serverImage]

        try {
            for (let i = 0; i < photos.length; i++){
                let response = await upload({path: photos[i].uri, mime: "image/jpeg"})
                serverImagePrev.push(
                    response
                )
            }
        } catch (e){
            console.log("ERROR")
        }

        setServerImage(serverImagePrev)
        setLoading(false)
    }

    useEffect(() => {
        serverImage.length !== 0 && data.onSend(
            {
                "image": serverImage,
                "text": "Фотография"
            }
        )
    }, [serverImage])

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
                                        <Image source={{ uri: item.uri }} style={{ height: 65, width: 65, marginLeft: 10, borderRadius: 8 }}/>
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
                            <Image source={ require('../../../images/attach.png') } style={{ width: MultiPlatform.AdaptivePixelsSize(23), height: MultiPlatform.AdaptivePixelsSize(23), tintColor: '#AAB2BD' }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10 }} onPress={
                            () => photoPickFromCamera()
                        }>
                            <Image source={ require('../../../images/camera.png') } style={{ width: MultiPlatform.AdaptivePixelsSize(23), height: MultiPlatform.AdaptivePixelsSize(23), tintColor: '#AAB2BD' }}/>
                        </TouchableOpacity>
                        {
                            !loading ? 
                                (imageData && imageData.length !== 0) && (
                                    <TouchableOpacity 
                                        style={{ padding: 10 }} 
                                        onPress={async () => {
                                            await uploadAllFiles(imageData),
                                            setImageData([])}}>
                                        <Image source={ require('../../../images/paper-plane.png') } 
                                        style={{ width: MultiPlatform.AdaptivePixelsSize(23), height: MultiPlatform.AdaptivePixelsSize(23), tintColor: '#54B9D1' }}/>
                                    </TouchableOpacity>
                                ) :
                                (
                                    <View style={{ padding: 10, }}>
                                        <ActivityIndicator size={'small'}/>
                                    </View>
                                )
                        }
                    </View>
                )
            }
        </View>
    )
}

export default ImagesCustomAction;
