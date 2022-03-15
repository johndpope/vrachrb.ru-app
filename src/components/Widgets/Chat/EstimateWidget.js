import React from 'react'
import { MultiPlatform } from '../../MultiPlatform';
import { KeyboardAvoidingView, View } from 'react-native';
import QuestionTitleBase from '../../AnamnezBaseComponent/QuestionTitleBase';
import MultiTextBase from '../../AnamnezBaseComponent/MultiTextBase';
import StarEstimationBase from '../../AnamnezBaseComponent/StarEstimationBase';
import SendEstimate from './SendEstimate';

const EstimateWidget = ({ questionId, modalCallback }) => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ width: '100%', backgroundColor: 'white', 
                borderTopRightRadius: 20, 
                borderTopLeftRadius: 20,
                alignItems: 'center', }}
        >
            <View style={{ width: '30%', height: MultiPlatform.AdaptivePixelsSize(6), backgroundColor: '#AAB2BD', top: MultiPlatform.AdaptivePixelsSize(-8), borderRadius: 100, opacity: 0.8 }} />
            <View style={{ width: '100%', paddingLeft: MultiPlatform.AdaptivePixelsSize(15), paddingRight: MultiPlatform.AdaptivePixelsSize(15), }}>
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
                    <SendEstimate modalCallback={modalCallback} questionId={questionId}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default EstimateWidget