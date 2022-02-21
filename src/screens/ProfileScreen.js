import React, { Component, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import ProfileDataItem from '../components/Widgets/Profile/ProfileDataItem';
import { MultiPlatform } from '../components/MultiPlatform';
import Request from '../requests/Request';
import { saveUserData } from '../store/reducers/LoginSlice';
import Storage from '../storage/Storage';
import SpecialistDataItem from '../components/Widgets/Profile/SpecialistDataItem';
import Routes from "../requests/Routes";

const ProfileScreen = () => {

    const selectData = useSelector(state => state.LoginSlice.userData)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const refreshProfileScreen = async () => {
        setLoading(true)
        let data = await Request.post(Routes.isAuthURL, {})

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
            <View style={{
                flex: MultiPlatform.AdaptivePixelsSize(1),
                backgroundColor: '#E5E5E5',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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
                    <Image style={{
                        width: MultiPlatform.AdaptivePixelsSize(230),
                        height: MultiPlatform.AdaptivePixelsSize(230),
                        borderRadius: 200,
                        backgroundColor: '#AAB2BD',
                    }}
                        source={ !selectData?.photo ? require('../images/user.png') : { uri: Routes.imageURL + selectData.photo }}
                    />
                </ScrollView>
                </View>
                <View style={{
                    flex: MultiPlatform.AdaptivePixelsSize(2.2),
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                    <View style={{width: '100%', height: '100%'}}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                width: '100%',
                                padding: MultiPlatform.AdaptivePixelsSize(20),
                                justifyContent: 'space-around',
                            }}
                        >
                            <View style={{alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: MultiPlatform.AdaptivePixelsSize(20), marginTop: 10,}}>
                                <Text style={{
                                    color: '#434A53',
                                    fontSize: MultiPlatform.AdaptivePixelsSize(19),
                                    margin: 20
                                }}>{selectData.first_name + " " +
                                selectData.second_name + " " + selectData.middle_name}</Text>
                            </View>
                            {
                                selectData.isSpecialist && (
                                    <View style={{ backgroundColor: '#F3F4F6', borderRadius: MultiPlatform.AdaptivePixelsSize(20), marginTop: 10, justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <SpecialistDataItem imageType='star' count={selectData.rating} item={"Рейтинг"} />
                                        <SpecialistDataItem imageType='edit' count={selectData.answers_count} item={"Консультаций"} />
                                    </View>
                                )
                            }
                            <View style={{ backgroundColor: '#F3F4F6', borderRadius: MultiPlatform.AdaptivePixelsSize(20), marginTop: 10 }}>
                                <ProfileDataItem header="Ваш Email" data={selectData.email}/>
                                <ProfileDataItem header="Ваш дата рождения" data={selectData.birth_date.split(" ")[0]}/>
                                <ProfileDataItem header="Ваш номер телефона" data={selectData.phone}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
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
