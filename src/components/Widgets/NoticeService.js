import React from 'react'
import { View, Text, Linking, StyleSheet } from 'react-native'

const NoticeService = (props) => {

    return (
        <View>
            <Text style={{
                ...styles.textStyle,
                ...styles.additTextStyle
            }}>
                Консультация в сервисе
                <Text style={{...styles.textStyle, color: '#54B9D1'}}
                    onPress={() => Linking.openURL('http://vrachrb.ru/')}
                >
                    «Врач Онлайн
                    в Республике Башкортостан»
                </Text>
                <Text style={styles.textStyle}
                > — не является
                    медицинской услугой. Специалисты сервиса
                    не ставят диагноз и не назначают лечение:
                    это возможно только в медицинском
                    учреждении на очной консультации врача.
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#434A53',
        fontSize: 17,
    },
    additTextStyle: {
        marginBottom: 12,
        marginLeft: 3
    },
});

export default NoticeService
