import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

const userInfo = {username: 'a', password: 'a'}

class LoginScreen extends Component {

  
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
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
          // onPress={() => navigation.navigate('CardDetails')}
          onPress={this._login}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  _login = async() => {
    if(userInfo.username === this.state.username && userInfo.password === this.state.password){
      this.props.navigation.navigate('CardDetails');
      console.log('login methon')
    } else {
      alert('Username or password incorrect');
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