import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import ProfileDataItem from '../components/Widgets/Profile/ProfileDataItem';
import { MultiPlatform } from '../components/MultiPlatform';
import Request from '../requests/Request';
import { saveUserData } from '../store/reducers/LoginSlice';
import Storage from '../storage/Storage';
import SpecialistDataItem from '../components/Widgets/Profile/SpecialistDataItem';
import Routes from "../requests/Routes";
import { setBottomNavigationEnd } from '../store/reducers/UtilitySlice';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {

    const height = Dimensions.get('window').height / 100
    const width = Dimensions.get('window').width / 100

    const [userNameState, setUserName] = useState("")

    const selectData = useSelector(state => state.LoginSlice.userData)
    const dispatch = useDispatch()

    const navigation = useNavigation()

    useEffect(() => {
        let userName = ""

        selectData.first_name == null ? userName = userName + "" : userName = userName + selectData.first_name
        selectData.second_name == null ? userName = userName + "" : userName = userName + " " + selectData.second_name
        selectData.middle_name == null ? userName = userName + "" : userName = userName + " " + selectData.middle_name
        
        setUserName(userName)
    }, [selectData])

    return (
        <View style={styles.mainContent}>
            {
                selectData.isSpecialist ?
                    <View style={{
                        flex: 1,
                        backgroundColor: '#E5E5E5',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                     
                            <View style={{
                                width: width * 40,
                                height: width * 40,
                                borderRadius: 200,
                                backgroundColor: '#AAB2BD',
                                paddingTop: 20,
                                overflow: 'hidden'
                            }}>
                                <Image
                                    style={{
                                        width: width * 40,
                                        height: width * 40,
                                    }}
                                    source={ !selectData?.photo ? require('../images/user.png') : { uri: Routes.imageURL + selectData.photo }}
                                />
                            </View> 
                    </View> : <View></View>
                }
                <View style={{
                    flex: 2.2,
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: selectData.isSpecialist ? 20 : 0,
                    borderTopRightRadius: selectData.isSpecialist ? 20 : 0,
                }}>
                    <View style={{width: '100%', height: '100%'}}>
                        <ScrollView
                            onScroll={(e) => {
                                dispatch(setBottomNavigationEnd(false))
                            }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                width: '100%',
                                padding: MultiPlatform.AdaptivePixelsSize(20),
                                justifyContent: selectData.isSpecialist ? 'space-around' : 'flex-start',
                            }}
                        >
                            <View style={{ alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: MultiPlatform.AdaptivePixelsSize(20)}}>
                                <Text style={{

                                    color: '#434A53',
                                    fontSize: MultiPlatform.AdaptivePixelsSize(19),
                                    margin: MultiPlatform.AdaptivePixelsSize(20),
                                }}>{userNameState}</Text>
                            </View>
                            {
                                selectData.isSpecialist && (
                                    <View style={{ backgroundColor: '#F3F4F6', borderRadius: MultiPlatform.AdaptivePixelsSize(20), marginTop: MultiPlatform.AdaptivePixelsSize(10), justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <SpecialistDataItem imageType='star' count={selectData.rating} item={"Рейтинг"} />
                                        <SpecialistDataItem imageType='edit' count={selectData.answers_count} item={"Консультаций"} />
                                    </View>
                                )
                            }
                            <View style={ styles.userInfo }>
                                {
                                    selectData?.email ?
                                        <ProfileDataItem header="Email" data={selectData.email}/>
                                        : null
                                }
                                {
                                    selectData.birth_date ?
                                        <ProfileDataItem header="Дата рождения" data={selectData.birth_date.split(" ")[0].split("-").reverse().join("-")}/>
                                        : null
                                }
                                {
                                    selectData.phone ?
                                        <ProfileDataItem header="Номер телефона" data={selectData.phone}/>
                                        : null
                                }
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
    },
    userInfo: { 
        backgroundColor: '#F3F4F6', 
        borderRadius: MultiPlatform.AdaptivePixelsSize(20), 
        marginTop: MultiPlatform.AdaptivePixelsSize(10), 
        marginBottom: MultiPlatform.AdaptivePixelsSize(80),
        paddingBottom: MultiPlatform.AdaptivePixelsSize(20)
    }
})

export default ProfileScreen;
