import React, { Component } from 'react'
import { Notifications } from 'react-native-notifications';

class NotificationAgent {
    static getNotification() {
        Notifications.registerRemoteNotifications();
    
        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            return event.deviceToken
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
                    title: notification.payload.specialist_name,
                    category: "Сообщение"
                }, notification.payload["google.sent_time"]);
            } else (
                onSend([
                    {
                        _id: notification.identifier, 
                        createdAt: new Date(), 
                        text: notification.payload.message, 
                        user: {
                            _id: 14123, 
                            name: notification.payload.isSpecialist == "true" ? 'Доктор' : "Пользователь"
                    }
                }], false)            )

            completion({ alert: false, sound: false, badge: false })
        })

        Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
            if (showNotify){
                Notifications.postLocalNotification({
                    fireDate: new Date(),
                    body: notification.payload.message,
                    title: notification.payload.specialist_name,
                    category: "Сообщение"
                }, notification.payload["google.sent_time"]);
            } else {
                onSend([
                    {
                        _id: notification.identifier, 
                        createdAt: new Date(), 
                        text: notification.payload.message, 
                        user: {
                            _id: 14123, 
                            name: notification.payload.isSpecialist == "true" ? 'Доктор' : "Пользователь"
                    }
                }], false)
            }

            completion({ alert: false, sound: false, badge: false })
        })

        Notifications.events().registerNotificationOpened((notification, completion) => {
            completion()
        })
    }
}

export default NotificationAgent;