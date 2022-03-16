import React, { Component } from 'react'
import { Platform } from 'react-native';
import { Notifications } from 'react-native-notifications';

class NotificationAgent{
    static registerNotificationEvents(showNotify = true, onSend = function(){}) {
        
        Platform.OS == 'android' &&
        Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
            console.log("FOREGRUND ", notification)
            notification.payload?.type == "message" ? onSend([
                {
                    _id: notification.identifier,
                    createdAt: new Date(),
                    chat_id: notification.payload.chat_id,
                    text: notification.payload.message,
                    image: notification.payload?.image ? notification.payload?.image.split(';') : null,
                    user: {
                        _id: notification.payload.user_id,
                        name: (notification.payload.isSpecialist == "true" || notification.payload.isSpecialist == 1) ? 'Доктор' : "Пользователь"
                }
            }], false) : null

            completion({ alert: true, sound: false, badge: false });
        })

        Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
            console.log("BAKEGRUND ", notification)
            notification.payload?.type == "message" ? onSend([
                {
                    _id: notification.identifier,
                    createdAt: new Date().toISOString(),
                    chat_id: notification.payload.chat_id,
                    text: notification.payload.message,
                    image: notification.payload?.image ? notification.payload?.image.split(';') : null,
                    user: {
                        _id: notification.payload.user_id,
                        name: (notification.payload.isSpecialist == "true" || notification.payload.isSpecialist == 1) ? 'Доктор' : "Пользователь"
                }
            }], false) : null

            // completion({ alert: false, sound: false, badge: false })
        })
    }

    static unsubscribeNotification() {
        Notifications.removeAllDeliveredNotifications()
    }
}

export default NotificationAgent;
