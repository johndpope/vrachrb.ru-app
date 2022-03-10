import React, { Component } from 'react'
import { Notifications } from 'react-native-notifications';

class NotificationAgent{
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

            Notifications.postLocalNotification({
                body: notification.payload.text,
                title: notification.payload.title,
            }, new Date().getUTCMilliseconds());

            completion({ alert: true, sound: true, badge: true })
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

            completion({ alert: true, sound: true, badge: true })
        })
    }

    static unsubscribeNotification() {
        Notifications.removeAllDeliveredNotifications()
    }
}

export default NotificationAgent;
