import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Linking, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultiPlatform } from '../MultiPlatform';
import { useSelector } from "react-redux";

const AgreementComponent = ({ setValue }) => {

    const agreements = useSelector(state => state.LoginSlice.agreements)
    // const [agreements, setAgreements] = useState(dataAgreements)
    const [countAccepted,setCountAccepted] = useState(0)

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
        <View style={{flex: 1}}>
            {!agreements ? <ActivityIndicator size={"large"}/> : (
                <SafeAreaView style={{flex: 1}}>
                    { agreements.map((item, index) => {
                        return (
                            <View style={styles.checkboxContainer}>
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
                    })}
                </SafeAreaView>
            )}
            {/*<FlatList*/}
            {/*    data={agreements}*/}
            {/*    showsVerticalScrollIndicator={false}*/}
            {/*    keyExtractor={(item) => item.id}*/}
            {/*    ListHeaderComponent={(*/}
            {/*        <View style={{flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10}}>*/}
            {/*            <Text*/}
            {/*                style={{ color: colors.HARD_GRAY_COLOR, fontSize: MultiPlatform.AdaptivePixelsSize(20)*/}
            {/*                }}>Пользовательское соглашение</Text>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*    renderItem={({item}) => {*/}
            {/*        return (*/}
            {/*            <View style={styles.checkboxContainer}>*/}
            {/*                <BouncyCheckbox*/}
            {/*                    size={MultiPlatform.AdaptivePixelsSize(35)}*/}
            {/*                    fillColor="#58BE3F"*/}
            {/*                    unfillColor="#FFFFFF"*/}
            {/*                    iconStyle={{borderColor: "#58BE3F"}}*/}
            {/*                    onPress={(isChecked) => {*/}
            {/*                        pressAgreement(isChecked, item.id)*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*                <Text style={{*/}
            {/*                    ...styles.label,*/}
            {/*                    color: item["url"] ? '#54B9D1' : '#000',*/}
            {/*                    flexShrink: 1*/}
            {/*                }}*/}
            {/*                      onPress={item["url"] ? () => Linking.openURL(item['url']) : null}*/}
            {/*                >{item['description']}</Text>*/}
            {/*            </View>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        color: '#000',
    },
})

export default AgreementComponent;