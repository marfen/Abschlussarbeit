import React, {useState} from 'react';

import RooStack from './navigators/RootStack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import {CredentialsContext} from './components/CredentialsContext';

import AppLoading from 'expo-app-loading';



export default function App() {
  
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  

  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('userCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else{
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error))
  }

  if (!appReady){
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
    />)
  }



  return  <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
    <RooStack/>
  </CredentialsContext.Provider>; 
  
}






