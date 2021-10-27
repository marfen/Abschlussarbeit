import React from 'react';
import { Text, View } from 'react-native';
import styles from './../brands/light/Module';

const ModuleC = () => (

  <View style={styles.container}>
  <Text style={styles.text}>
    Module <Text style={styles.accent}>C</Text>
  </Text>
</View>
);
export default {
    name: 'ModuleC',
    Component: ModuleC,
};