import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Image, Platform} from 'react-native';
import uuid from 'react-native-uuid';
import { addAnamnezPhoto } from "../../store/reducers/AnamnezSlice";
import { MultiPlatform } from "../MultiPlatform";
import { useDispatch, useSelector } from "react-redux";
import CameraPicker from "react-native-image-crop-picker";

const UploadFileBase = ({ component, index, data }) => {

    let rawImagesData = [{
        index: 0,
        type: "",
        uri: "",
        name: "",
    }]

    let ImagesData = [{
        index: 0,
        id: uuid.v4(),
        setted: false,
        defaultImage: true,
        image: '../../images/plus.png'
    }]
    let imageURLs = ""

    const dispatch = useDispatch()

    const anamnezData = useSelector(state => state.AnamnezSlice.anamnezData[index])
    const [rawImage, setRawImage] = useState(rawImagesData)
    const [imageData, setImageData] = useState(ImagesData)

    useEffect(() => {
        // console.log("anamnezData["+index+"]::"+JSON.stringify(anamnezData))
    }, [anamnezData])

    useEffect(() => {
        // console.log("imageData::"+JSON.stringify(imageData))
    }, [imageData])

    useEffect(() => {
        // console.log("rawImage::"+JSON.stringify(rawImage))

        let rawImageData = [...rawImage]
        rawImageData.splice(rawImageData.length-1, 1)
        // console.log("addAnamnezPhoto::"+JSON.stringify(rawImageData));

        dispatch(addAnamnezPhoto({
            index: index,
            file: rawImageData
        }))
    },[rawImage])

    const deleteImage = async (id) => {
        let imageDataPrev = [...imageData]
        let rawImageData = [...rawImage]
        id = imageDataPrev.findIndex(el => el.index === id);

        imageDataPrev.splice(id, 1)
        rawImageData.splice(id,1)

        setImageData(imageDataPrev)
        setRawImage(rawImageData)
    }

    const imagePick = async (id) => {
        let imageDataPrev = [...imageData]
        id = imageDataPrev.findIndex(el => el.index === id);
        console.log("[ID]::" + id)

        if(imageDataPrev[id].setted)
            return MultiPlatform.ToastShow("Вы уже выбрали фото");

        let result
        try {
            result = await CameraPicker.openPicker({
                cropping: true,
                compressImageQuality: 0.8,
            })
            console.log(JSON.stringify(result))
        } catch(e) {
            return MultiPlatform.ToastShow("Вы не выбрали фото");
        }
        if(Platform.OS === 'ios' ? checkNameFile(result) : false)
            return MultiPlatform.ToastShow("Данное изображение уже было добавлено");

        let rawImageData = [...rawImage]
        rawImageData[id].type  = result.mime
        rawImageData[id].uri  = result.path
        rawImageData[id].name  = result.filename
        rawImageData.push({
            index: rawImageData[id].index + 1,
            type: "",
            uri: "",
            name: ""
        })
        setRawImage(rawImageData)

        imageDataPrev[id].image = result.path
        imageDataPrev[id].defaultImage = false
        imageDataPrev[id].setted = true
        imageDataPrev.push({
            index: imageDataPrev[id].index + 1,
            id: uuid.v4(),
            setted: false,
            defaultImage: true,
            image: '../../images/plus.png'
        })
        setImageData(imageDataPrev)
    }

    function checkNameFile(image) {
        let bool = false
        rawImage.map((item) => {
            console.log("ITEM:"+JSON.stringify(item.name))
            console.log("IMAG:"+JSON.stringify(image.filename))
            if (image.filename == item.name) {
                // console.log("СОВПАДАЮТ")
                bool = true
            }
        })
        return bool
    }

    return (
        <View
            style={{
                width: '100%'
            }}
        >
            {
                component
            }
            <View style={{
                marginTop: 5
            }}>
                <FlatList
                    data={imageData}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return(
                            <View>
                                { !item.defaultImage &&
                                <TouchableOpacity onPress={() => deleteImage(item.index)} style={ styles.deleteButtonStyle }>
                                    <Image style={{ width: '50%', height: '50%' }} source={ require('../../images/delete_cross.png') }/>
                                </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => imagePick(item.index)} style={ styles.uploadButtonStyle }>
                                    <Image
                                        style={{ width: !item.defaultImage ? 100 : 40, height: !item.defaultImage ? 100 : 40, borderRadius: 8 }}
                                        source={ !item.defaultImage ? { uri: item.image } : require('../../images/plus.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    additionalFieldStyle: {
        fontSize: 15,
        color: '#434A53',
        fontWeight: '400',
    },
    uploadButtonStyle: {
        width: 100,
        height: 100,
        borderColor: '#CCD1D9',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: 12,
        marginBottom: 10
    },
    deleteButtonStyle: {
        position: 'absolute',
        right: 8,
        top: 5,
        width: 26,
        height: 26,
        backgroundColor: '#F27C83',
        borderRadius: 50,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UploadFileBase;
