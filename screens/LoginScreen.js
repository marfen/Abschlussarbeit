import React, {Component, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Button} from 'react-native';
import { 
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync 
} from 'expo-local-authentication';

import {CredentialsContext} from './../components/CredentialsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';


const userInfo = {username: 'admin', password: '1234'};



class LoginScreen extends Component {



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
        <Button title="biometric login" onPress={this.biometricsAuth}></Button>
      </View>
    );
  }

  _login = async() => {
    if(userInfo.username === this.state.username && userInfo.password === this.state.password){
      this.persistLogin(this.state)
    } else {
      alert('Username or password incorrect');
    }
  }

  
  
  biometricsAuth = async () => {
 
    const compatible = await hasHardwareAsync()
    if (!compatible) throw 'This device is not compatible for biometric authentication'
  
    const enrolled = await isEnrolledAsync()
    if (!enrolled) throw "This device doesn't have biometric authentication enabled"
    
    const result = await authenticateAsync()
    if (!result.success){
      throw `${result.error} - Authentication unsuccessful`
    } else{
      this.context.setStoredCredentials(result);
    }
  }
}

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
  }
});

  export default LoginScreen;