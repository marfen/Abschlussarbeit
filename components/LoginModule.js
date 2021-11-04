import React, {Component, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Button} from 'react-native';
import { 
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync 
} from 'expo-local-authentication';

import {CredentialsContext} from './../components/CredentialsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

//imports brand specific stylesheet object for App
const styles = require('./../brands')('App')

//hardcoded valid user credentials
const userInfo = {username: 'admin', password: '1234'};



class LoginScreen extends Component {


  //instantiat context
  static contextType = CredentialsContext;

  componentDidMount(){
    const credentials = this.context;
  }

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }

  // persists login and sets context
  persistLogin = (credentials) => {
    AsyncStorage.setItem('userCredentials', JSON.stringify(credentials))
    .then(() => {
      this.context.setStoredCredentials(credentials);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return(
      <View style={styles.loginscreen}>
        <TextInput 
          style={styles.userinput} 
          placeholder="username"
          onChangeText={(username)=> this.setState({username})}
          value={this.state.username}
          autoCapitalize='none'
        />
        <TextInput 
          style={styles.userinput}
          placeholder="password"
          secureTextEntry
          onChangeText={(password)=> this.setState({password})}
          value={this.state.password}
          autoCapitalize='none'
        />
        <TouchableOpacity 
          style={styles.buttonlogin} 
          onPress={this._login}>
          <Text>Login</Text>
        </TouchableOpacity>
        <Button style={styles.biometricButton} title="biometric login" onPress={this.biometricsAuth}></Button>
      </View>
    )
    
  }

  //login function
  _login = async() => {
    if(userInfo.username === this.state.username && userInfo.password === this.state.password){
      this.persistLogin(this.state)
    } else {
      alert('Username or password incorrect');
    }
  }

  
  //function for biometric auth
  biometricsAuth = async () => {
 
    const compatible = await hasHardwareAsync()
    if (!compatible) throw 'This device is not compatible for biometric authentication'
  
    const enrolled = await isEnrolledAsync()
    if (!enrolled) throw "This device doesn't have biometric authentication enabled"
    
    const result = await authenticateAsync()
    if (!result.success){
      throw `${result.error} - Authentication unsuccessful`
    } else{
      this.persistLogin(result);
    }
  }
}

  export default LoginScreen;
