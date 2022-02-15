import React, { Component, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { MultiPlatform } from '../../MultiPlatform'
import EstimateSlice from '../../../store/reducers/EstimateSlice'
import Request from '../../../requests/Request'
import baseApiURL from '../../../requests/baseApiURL'

const SendEstimate = ({ questionId }) => {

    const body = useSelector(state => state.EstimateSlice.body)
    const informative = useSelector(state => state.EstimateSlice.informative)
    const courtesy = useSelector(state => state.EstimateSlice.courtesy)

    const [loading, setLoading] = useState()

    const sendEstimate = async () => {
        setLoading(true)
        await Request.post(baseApiURL + "Add_review", {
            question_id: questionId, 
            body: body, 
            informative: informative, 
            courtesy: courtesy
        }).then(response => {
            response['response'] && MultiPlatform.ToastShow("Вы успешно оставили отзыв")
        })
        setLoading(false)
    }

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            console.log(body + "  " + informative + "  " + courtesy + "  questionId: " + questionId),
            sendEstimate()
        }}>
            {loading ? <ActivityIndicator color={'#fff'} size={'large'}/> : (
                <Text style={{ color: '#FFFFFF', fontSize: MultiPlatform.AdaptivePixelsSize(17) }}>
                    Отправить отзыв
                </Text>
            )} 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '100%',
        height: MultiPlatform.AdaptivePixelsSize(60),
        backgroundColor: '#58BE3F',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10
    }
})

export default SendEstimate