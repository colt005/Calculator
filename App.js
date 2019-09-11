import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resulttext: '',
      calculationText: '',
    };
    this.operations = ['DEL', 'CLR', '+', '-', '*', '/'];
  }
  calculateReasult() {
    const text = this.state.resulttext;

    this.setState({
      calculationText: eval(text),
    });
  }

  operate(operation) {
    let text = this.state.resulttext.split('');
    let lastChar = this.state.resulttext.split('').pop();
    switch (operation) {
      case 'DEL':
        text.pop();

        this.setState({
          resulttext: text.join(''),
        });
        break;
      case 'CLR':
        this.setState({
          calculationText: '',
          resulttext : '',
        });
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        if (this.operations.indexOf(lastChar) > 0) return;

        if (text == '') {
          return;
        }
        this.setState({
          resulttext: this.state.resulttext + operation,
        });
    }
  }

  validate(){
      const text = this.state.resulttext;
      switch(text.slice(-1)){
        case '+' : 
        case '-' : 
        case '/' : 
        case '*' : 
                return false;
      }
      return true;

  }

  buttonPressed(text) {
    if (text == '=') {

      return this.validate() && this.calculateReasult();
    }
    this.setState({
      resulttext: this.state.resulttext + text,
      
    });
    
  }

  render() {
    let rows = [];
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}>
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }

    let ops = [];
    for (let i = 0; i < this.operations.length; i++) {
      ops.push(
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.operate(this.operations[i])}>
          <Text style={[styles.btnText, styles.white]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resulttext}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnText: {
    fontSize: 30,
    color: 'white',

  },
  resultText: {
    fontSize: 30,
    color: 'black',
  },
  white: {
    color: 'white',
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  calculationText: {
    fontSize: 25,
    color: 'black',
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
  },
});
