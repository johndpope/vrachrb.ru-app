import React, { Component } from 'react'
import { Notifications } from 'react-native-notifications';

class NotificationAgent{
    constructor(){
        state = ""
    }

    static getNotification() {
        Notifications.registerRemoteNotifications();

        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            this.state = event.deviceToken
        })

        Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
            console.error(event)
        })

        return this.state;
    }

    static registerNotificationEvents(showNotify = false, onSend = function(){}) {
        Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
            console.log("FOREGRUND ", notification)
            notification.payload.type == "message" ? onSend([
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
            }], false) : null

            completion({ alert: true, sound: false, badge: false })
        })

        Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
            console.log("BAKEGRUND ", notification)
            notification.payload.type == "message" ? onSend([
                {
                    _id: notification.identifier,
                    createdAt: new Date().toISOString(),
                    chat_id: notification.payload.chat_id,
                    text: notification.payload.message,
                    image: notification.payload.image !== "" ? notification.payload.image.split(';') : null,
                    user: {
                        _id: notification.payload.user_id,
                        name: notification.payload.isSpecialist == "true" ? 'Доктор' : "Пользователь"
                }
            }], false) : null

            Notifications.postLocalNotification({
                body: notification.payload.text,
                title: notification.payload.title,
            }, new Date().getUTCMilliseconds());

            completion({ alert: true, sound: false, badge: false })
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
