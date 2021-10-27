import React from 'react';
import { Text, View } from 'react-native';
import styles from './../brands/light/Module';

const ModuleA = () => (

    <View style={styles.container}>
      <Text style={styles.text}>
        Module <Text style={styles.accent}>A</Text>
      </Text>
    </View>
);
export default {
    name: 'ModuleA',
    Component: ModuleA,
};