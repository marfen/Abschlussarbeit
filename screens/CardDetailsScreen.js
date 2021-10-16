import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';



const CardDetailsScreen = ({navigation}) => {
  return(
    <View style={styles.carddetailsscreen}>
      <Text>Card Details Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    carddetailsscreen:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  
  });

  export default CardDetailsScreen;