import React, { Component, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import ProfileDataItem from '../components/Widgets/Profile/ProfileDataItem';
import baseURL from "../requests/baseURL";
import { MultiPlatform } from '../components/MultiPlatform';
import baseApiURL from '../requests/baseApiURL';
import Request from '../requests/Request';
import { saveUserData } from '../store/reducers/LoginSlice';
import Storage from '../storage/Storage';

const ProfileScreen = () => {

    const selectData = useSelector(state => state.LoginSlice.userData)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const refreshProfileScreen = async () => {
        setLoading(true)
        let data = await Request.post(baseApiURL + "Is_auth", {})

        if(data['response'] && data['response'] == true) {
            delete data["response"]
            // console.log("AUTH::"+JSON.stringify(data))
            dispatch(saveUserData(data['userData']))
            await Storage.save("userData", data['userData'])
        }

        setLoading(false)
    }

    return (
        <View style={styles.mainContent}>
            <ScrollView 
                refreshControl={
                    <RefreshControl 
                        refreshing={loading}
                        onRefresh={() => refreshProfileScreen()}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1, height: '100%', width: '100%', justifyContent: 'center'}}
            >
                <View style={{
                    flex: MultiPlatform.AdaptivePixelsSize(1),
                    backgroundColor: '#E5E5E5',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: MultiPlatform.AdaptivePixelsSize(230),
                        height: MultiPlatform.AdaptivePixelsSize(230),
                        borderRadius: 200,
                        backgroundColor: '#AAB2BD',
                    }}
                        source={ !selectData?.photo ? require('../images/user.png') : { uri: baseURL + "u/i/" + selectData.photo }}/>
                </View>
                <View style={{
                    flex: MultiPlatform.AdaptivePixelsSize(2.2),
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                    <View style={{width: '85%'}}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                width: '100%',
                                padding: MultiPlatform.AdaptivePixelsSize(20)
                            }}
                        >
                            <View style={{alignItems: 'center'}}>
                                <Text style={{
                                    color: 'black',
                                    fontSize: MultiPlatform.AdaptivePixelsSize(17)
                                }}>{selectData.first_name + " " +
                                selectData.second_name + " " + selectData.middle_name}</Text>
                            </View>
                            <View style={{marginTop: MultiPlatform.AdaptivePixelsSize(30)}}>
                                <ProfileDataItem header="Ваш Email" data={selectData.email}/>
                                <ProfileDataItem header="Ваш дата рождения" data={selectData.birth_date.split(" ")[0]}/>
                                <ProfileDataItem header="Ваш номер телефона" data={selectData.phone}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        width: '100%',
    }
})

export default ProfileScreen;
