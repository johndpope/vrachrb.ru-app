import React, {useState} from 'react';
import { Linking, StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MultiPlatform } from '../MultiPlatform';
import Routes from "../../requests/Routes";

const AgreementComponent = ({ setValue, index }) => {

    const agreements = [
        {
            "id": "1",
            "description": "Я понимаю, что все рекомендации носят информационный или консультативный характер и не заменяют очного приема врача, применение полученных рекомендаций производится мной по собственной инициативе и на свой страх и риск",
        },
        {
            "id": "2",
            "description": "Я согласен и принимаю правила работы на портале",
            "url": Routes.agreement2URL
        },
        {
            "id": "3",
            "description": "Я даю своё согласие на обработку персональных данных",
            "url": Routes.agreement3URL
        }
    ]
    const data = agreements[index]

    return (
        <View style={styles.checkboxContainer}>
            <BouncyCheckbox
                size={MultiPlatform.AdaptivePixelsSize(35)}
                fillColor="#58BE3F"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#58BE3F" }}
                onPress={(isChecked) => {setValue(isChecked)}}
            />
            <Text style={{...styles.label, color:data["url"] ? '#54B9D1' : '#000'}}
                  onPress={ data["url"] ? () => Linking.openURL(data['url']) : null }
            >{data['description']}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxContainer: {
        width: "90%",
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: 10
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        color: '#000',
        paddingRight: 40
    },
})

export default AgreementComponent;