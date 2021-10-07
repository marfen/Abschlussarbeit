import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals(currentGoals => [...currentGoals, enteredGoal]);
  };
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="input text here" 
          style={styles.textInput}
          onChangeText={goalInputHandler}
          value= {enteredGoal}/>
        <Button title="ADD" onPress={addGoalHandler}/>
      </View>

      <ScrollView >
        {courseGoals.map((goal) => 
          <View key={goal} style={styles.goalList}>
            <Text >{goal}</Text>
          </View> )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:{
    paddingTop: 100,
    paddingHorizontal: 30,
    height: '100%'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInput: {borderColor: 'grey',
  borderWidth: 1,
  width: '80%'
},
  goalList: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
});
