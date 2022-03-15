import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MultiPlatform } from '../../MultiPlatform'
import Modal from "react-native-modal";
import EstimateWidget from './EstimateWidget';

const CustomComposer = ({ data, isSpecialist, questionId }) => {

    const [isModalVisible, setModalVisible] = useState(false)

    return (
        <View
            {...data}
            style={{
                width: '100%',
                height: MultiPlatform.AdaptivePixelsSize(50),
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {
                isSpecialist ? (
                    <Text style={{ color: '#F27C83', fontSize: MultiPlatform.AdaptivePixelsSize(17) }}>Вопрос закрыт</Text>
                ) : 
                (                   
                    <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
                        <Text style={{ color: '#54B9D1', fontSize: MultiPlatform.AdaptivePixelsSize(17), }}>Оставить отзыв</Text>
                    </TouchableOpacity>
                )
            }
            {
                <Modal
                    style={{ justifyContent: 'flex-end', margin: 0}} 
                    isVisible={isModalVisible} 
                    swipeDirection={['down']}
                    backdropTransitionOutTiming={0}
                    backdropTransitionInTiming={0}
                    onSwipeComplete={() => setModalVisible(!isModalVisible)}
                    swipeThreshold={50}
                    swipeThreshold={200}
                    propagateSwipe={false}
                >
                    <EstimateWidget modalCallback={setModalVisible} questionId={questionId}/>
                </Modal>
            }
        </View>
    )
}

export default CustomComposer