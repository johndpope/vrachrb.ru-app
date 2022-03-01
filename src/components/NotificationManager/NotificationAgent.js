import React, { Component } from 'react'
import { Notifications } from 'react-native-notifications';

class NotificationAgent {
    static getNotification() {
        Notifications.registerRemoteNotifications();
    
        Notifications.events().registerRemoteNotificationsRegistered((event) => {
            console.log("Device Token Received", event.deviceToken);
        })
    
        Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
            console.error(event)
        })
    
        Notifications.registerRemoteNotifications()
    }

    static registerNotificationEvents(showNotify = false, onSend = function(){}) {
        Notifications.events().registerNotificationReceivedForeground((notification, completion) => {
            console.log(notification)
            if (showNotify){
                Notifications.postLocalNotification({
                    fireDate: new Date(),
                    body: notification.payload["gcm.notification.body"],
                    title: notification.payload["gcm.notification.title"],
                    category: "Сообщение"
                }, notification.payload["google.sent_time"]);
            } else (
                onSend([{_id: notification.identifier, createdAt: new Date(), text: notification.payload["gcm.notification.body"], user: {_id: 14123, name: 'Доктор'}}], false)
            )

            completion({ alert: false, sound: false, badge: false })

            return notification
        })

        Notifications.events().registerNotificationReceivedBackground((notification, completion) => {
            console.log(notification)
            if (showNotify){
                Notifications.postLocalNotification({
                    fireDate: new Date(),
                    body: notification.payload["gcm.notification.body"],
                    title: notification.payload["gcm.notification.title"],
                    category: "Сообщение"
                }, notification.payload["google.sent_time"]);
            } else (
                onSend([{_id: notification.identifier, createdAt: new Date(), text: notification.payload["gcm.notification.body"], user: {_id: 14123, name: 'Доктор'}}], false)
            )

            completion({ alert: false, sound: false, badge: false })

            return notification
        })
    
        Notifications.events().registerNotificationOpened((notification, completion) => {
            completion()
        })
    }
}

export default NotificationAgent;