import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function LoginScreen({navigation}) {
  return(
    <View style={styles.loginscreen}>
      <TextInput style={styles.userinput} placeholder="username"></TextInput>
      <TextInput style={styles.userinput} placeholder="password"></TextInput>
      <TouchableOpacity style={styles.buttonlogin} onPress={() => navigation.navigate("CardDetails")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

function CardDetailsScreen(){
  return(
    <View style={styles.carddetailsscreen}>
      <Text>Card Details Screen</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="CardDetails" component={CardDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({

  loginscreen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  userinput:{
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    width: '80%',
    marginBottom: 20,
    backgroundColor: 'white'

  },
  buttonlogin:{
    padding: 15,
    width: '45%',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  carddetailsscreen:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});
