import React, { Component } from 'react'
import { Notifications } from 'react-native-notifications';
import Request from '../../requests/Request';
import Routes from '../../requests/Routes';

class NotificationAgent {
    static getNotification(type) {
        Notifications.registerRemoteNotifications();
    
        type == 'signin' ?
        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            Request.post(Routes.SaveDeviceToken, {
                token: event.deviceToken,
                type: Platform.OS == 'ios' ? 1 : 2
            })
        }) :
        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            Request.get(Routes.signOutURL, {token: event.deviceToken})
        })
    
        Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
            console.error(event)
        })
    }

    static registerNotificationEvents(showNotify = false, onSend = function(){}) {
        Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
            console.log(notification)
            if (showNotify){
                Notifications.postLocalNotification({
                    fireDate: new Date(),
                    body: notification.payload.message,
                    title: notification.payload.title,
                    category: "Сообщение"
                }, notification.payload["google.sent_time"]);
            } else (
                onSend([
                    {
                        _id: notification.identifier,
                        createdAt: new Date(), 
                        chat_id: notification.payload.chat_id,
                        text: notification.payload.message,
                        image: notification.payload.image !== "" ? notification.payload.image.split(';') : null,
                        user: {
                            _id: notification.payload.user_id,
                            name: notification.payload.isSpecialist == "true" ? 'Доктор' : "Пользователь"
                    }
                }], false)            )

            completion({ alert: false, sound: false, badge: false })
        })

        Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
            onSend([
                {
                    _id: notification.identifier,
                    createdAt: new Date(), 
                    chat_id: notification.payload.chat_id,
                    text: notification.payload.message,
                    image: notification.payload.image !== "" ? notification.payload.image.split(';') : null,
                    user: {
                        _id: notification.payload.user_id,
                        name: notification.payload.isSpecialist == "true" ? 'Доктор' : "Пользователь"
                }
            }], false)

            Notifications.postLocalNotification({
                fireDate: new Date(),
                body: notification.payload.text,
                title: notification.payload.title,
                category: "Сообщение"
            }, notification.payload["google.sent_time"]);

            completion({ alert: false, sound: false, badge: false })
        })

        Notifications.events().registerNotificationOpened((notification, completion) => {
            completion()
        })
    }
    
    static unsubscribeNotification() {
        Notifications.removeAllDeliveredNotifications()
    }
}

export default NotificationAgent;