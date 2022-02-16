import { set } from 'immer/dist/internal'
import React, { Component, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addCourtesy, addInformative } from '../../store/reducers/EstimateSlice'

const StarEstimationBase = ({ typeField }) => {

    const dispatch = useDispatch()

    const DATA = [
        { id: 1, starred: true },
        { id: 2, starred: false },
        { id: 3, starred: false },
        { id: 4, starred: false },
        { id: 5, starred: false }
    ]

    const [star, setStarItem] = useState(DATA)

    const setStar = (index) => {
        let starPrev = [...star]

        for (let i = 0; i < star.length; i++){
            starPrev[i].starred = false
        }

        for (let i = 0; i < index + 1; i++){
            starPrev[i].starred = true
        }

        setStarItem(starPrev)
        typeField == "informative" ? dispatch(addInformative(index + 1)) : dispatch(addCourtesy(index + 1))
    }

    return (
        <View style={{ width: '100%', height: 30, flexDirection: 'row' }}>
            {
                star.map((item, index) => {
                    return (
                        <TouchableOpacity key={item.id} onPress={() => setStar(index)}>
                            <Image 
                                style={{ width: 30, height: 30, marginRight: 5, tintColor: item.starred ? "#ffde00" : "#AAB2BD" }} 
                                source={ require('../../images/star_estimation.png') }
                            />
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default StarEstimationBase