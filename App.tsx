import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { useEffect, useRef } from 'react';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificaionListener = useRef<Subscription>();
  const responseNotificaionListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  })

  useEffect(() => {
    getNotificaionListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNotificaionListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (getNotificaionListener.current && responseNotificaionListener.current) {
        Notifications.removeNotificationSubscription(getNotificaionListener.current)
        Notifications.removeNotificationSubscription(responseNotificaionListener.current)
      }
    }
  }, []);


  return (
    <Background >
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}

    </Background>
  );
}

