import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MultiPlatform } from '../../MultiPlatform'
import { clearDataEstimate } from '../../../store/reducers/EstimateSlice'
import Request from '../../../requests/Request'
import Routes from "../../../requests/Routes";

const SendEstimate = ({ questionId, modalCallback }) => {

    const body = useSelector(state => state.EstimateSlice.body)
    const informative = useSelector(state => state.EstimateSlice.informative)
    const courtesy = useSelector(state => state.EstimateSlice.courtesy)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState()

    const sendEstimate = async () => {
        setLoading(true)
        await Request.post(Routes.addReviewURL, {
            question_id: questionId, 
            body: JSON.stringify(body), 
            informative: informative, 
            courtesy: courtesy
        }).then(response => {
            response['response'] && MultiPlatform.ToastShow(response['response'])
        })
        dispatch(clearDataEstimate())
        setLoading(false)
    }

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            console.log(body + "  " + informative + "  " + courtesy + "  questionId: " + questionId),
            sendEstimate(),
            modalCallback(false)
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