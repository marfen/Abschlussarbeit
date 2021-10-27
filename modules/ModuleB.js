import React from 'react';
import { Text, View } from 'react-native';
import styles from './../brands/light/Module';

const ModuleB = () => (

    <View style={styles.container}>
      <Text style={styles.text}>
        Module <Text style={styles.accent}>B</Text>
      </Text>
    </View>
);
export default {
    name: 'ModuleB',
    Component: ModuleB,
};