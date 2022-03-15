import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Linking, StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultiPlatform } from '../MultiPlatform';
import { useSelector } from "react-redux";

const AgreementComponent = ({ setValue }) => {

    const agreements = useSelector(state => state.LoginSlice.agreements)
    // const [agreements, setAgreements] = useState(dataAgreements)
    const [countAccepted, setCountAccepted] = useState(0)

    useEffect(() => {
        if (countAccepted === agreements.length)
            setValue(true)
        else
            setValue(false)
    }, [countAccepted])

    function pressAgreement(isChecked, index) {
        if (isChecked) {
            // console.log("++COUNTACCEPTED::"+(countAccepted+1))
            setCountAccepted(countAccepted + 1)
        } else {
            // console.log("--COUNTACCEPTED::"+(countAccepted-1))
            setCountAccepted(countAccepted - 1)
        }
    }

    return (
        <View>
            {!agreements ? <ActivityIndicator size={"large"}/> : (
                agreements.map((item, index) => {
                    return (
                        <View key={index} style={styles.checkboxContainer}>
                            <BouncyCheckbox
                                size={MultiPlatform.AdaptivePixelsSize(35)}
                                fillColor="#58BE3F"
                                unfillColor="#FFFFFF"
                                iconStyle={{borderColor: "#58BE3F"}}
                                onPress={(isChecked) => {
                                    pressAgreement(isChecked, index)
                                }}
                            />
                            <Text style={{
                                ...styles.label,
                                color: item["url"] ? '#54B9D1' : '#000',
                                flexShrink: 1
                            }}
                                onPress={item["url"] ? () => Linking.openURL(item['url']) : null}
                            >{item['description']}</Text>
                        </View>
                    )
                })
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10,
        width: '100%'
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        color: '#000',
    },
})

export default AgreementComponent;