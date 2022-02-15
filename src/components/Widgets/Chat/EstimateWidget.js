import React, { Component, useState } from 'react'
import { MultiPlatform } from '../../MultiPlatform';
import { View } from 'react-native';
import QuestionTitleBase from '../../AnamnezBaseComponent/QuestionTitleBase';
import MultiTextBase from '../../AnamnezBaseComponent/MultiTextBase';
import StarEstimationBase from '../../AnamnezBaseComponent/StarEstimationBase';
import SendEstimate from './SendEstimate';

const EstimateWidget = ({ questionId }) => {
    return (
        <View 
            style={{ width: '100%', backgroundColor: 'white', 
                borderTopRightRadius: 20, 
                borderTopLeftRadius: 20,
                alignItems: 'center', }}
        >
            <View style={{ width: '30%', height: MultiPlatform.AdaptivePixelsSize(6), backgroundColor: '#AAB2BD', top: MultiPlatform.AdaptivePixelsSize(-8), borderRadius: 100, opacity: 0.8 }} />
            <View style={{ width: '85%'}}>
                <View style={{ width: '100%', alignItems: 'center', marginTop: MultiPlatform.AdaptivePixelsSize(10) }}>
                    <QuestionTitleBase question={"Оставьте отзыв"} />
                </View>
                <MultiTextBase starred={true}/>
                <View style={{ marginTop: MultiPlatform.AdaptivePixelsSize(20), }}>
                    <QuestionTitleBase question={"Информативность"}/>
                    <StarEstimationBase typeField={"informative"} />
                </View>
                <View style={{ marginTop: MultiPlatform.AdaptivePixelsSize(20) }}>
                    <QuestionTitleBase question={"Вежливость"}/>
                    <StarEstimationBase typeField={"courtesy"} />
                </View>
                <View style={{ marginTop: MultiPlatform.AdaptivePixelsSize(20), marginBottom: MultiPlatform.AdaptivePixelsSize(20) }}>
                    <SendEstimate questionId={questionId}/>
                </View>
            </View>
        </View>
    )
}

export default EstimateWidget