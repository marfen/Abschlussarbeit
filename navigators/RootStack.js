import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CredentialsContext} from './../components/CredentialsContext';

import LoginScreen from './../screens/LoginScreen';
import CardDetailsScreen from './../screens/CardDetailsScreen';

const Stack = createNativeStackNavigator();

const RootStack = () => {


    

    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                    {storedCredentials ? (
                        <Stack.Screen name="CardDetails" component={CardDetailsScreen}/>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen}/>
                        </>
                    )}
                </Stack.Navigator>
                </NavigationContainer>

            )}
        </CredentialsContext.Consumer>
      );
}

export default RootStack;

