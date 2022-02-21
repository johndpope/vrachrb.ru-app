import React, {useState, Component, useLayoutEffect, useEffect} from 'react'
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Request from "../requests/Request";

const TestScreen = () => {

    const [html,setHtml] = useState("");

    useEffect(() => {
        console.log("HTML:"+html)
    },[html])

    useLayoutEffect(() => {
        // Request.get("https://ulogin.ru/version/3.0/html/buttons_receiver.html",
        //     {
        //         four: "https://ulogin.ru/auth.php?name=vkontakte&window=1&lang=ru&fields=first_name,last_name,photo,sex,email&force_fields=&popup_css=&host=vrachrb.ru&optional=&redirect_uri=&verify=&callback=check_token&screen=1920x1080&url=&providers=vkontakte&hidden=&m=0&page=http://vrachrb.ru/login/&icons_32=&icons_16=&theme=classic&client=&version=3",
        //         r: 4623,
        //         xdm_e: "http://vrachrb.ru",
        //         xdm_c: "default6324",
        //         xdm_p: 1,
        //     }).then(response => {
        //     setHtml(response);
        // })

        // Request
        //     .get("https://ulogin.ru/auth.php?name=vkontakte&window=1&lang=ru&fields=first_name,last_name,photo,sex,email&force_fields=&popup_css=&host=vrachrb.ru&optional=&redirect_uri=&verify=&callback=check_token&screen=1920x1080&url=&providers=vkontakte&hidden=&m=0&page=http://vrachrb.ru/login/&icons_32=&icons_16=&theme=classic&client=&version=3",
        //     {})
        //     .then(response => {
        //         setHtml(JSON.stringify(response));
        //     });

    },[])

    return (
        <WebView style={styles.mainContent}
            source={{ html: "<h1>Hello</h1>" }} />
        );
};

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
    },
});

export default TestScreen;
