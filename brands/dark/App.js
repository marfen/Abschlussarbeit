import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        backgroundColor: '#002b36'
    },
    title: {
        paddingHorizontal: 16,
        color: '#657b83',
        fontSize: 20,
        fontWeight: 'bold'
    },
    
    loginscreen:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey'
    },

    userinput:{
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 20,
        backgroundColor: 'grey'
    
      },
      buttonlogin:{
        padding: 15,
        width: '45%',
        alignItems: 'center',
        backgroundColor: 'red'
      }
    
});