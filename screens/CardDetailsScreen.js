import React, {useState, useEffect, useRef, useContext} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import modules from './../modules';


import {CredentialsContext} from './../components/CredentialsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = require('./../brands')('App')

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const CardDetailsScreen = ({navigation}) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // listener is executed when app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // listener is executed when a user touches notifications, works when app is foregrounded, in background or process is killed
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  //remove login credentials from storage and set global credential context to empty string
  const clearLogin = () => {
    AsyncStorage.removeItem('userCredentials')
    .then(() => {
      setStoredCredentials("")
    })
    .catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      <View>
        {modules.map(({name, Component}) => 
          <Component key={name}/>
        )}
      </View>
      <Button
        style={styles.notificationButton}
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
      <Button
        style={styles.logoutButton}
        title="Logout"
        onPress={clearLogin}
      />
    </View>
  );
}

// send push notification via expo server, also online tool available for testing  https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Custom Notification',
    body: 'Message to be forwarded to user',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// ask user for permissions and register for push notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

  export default CardDetailsScreen;