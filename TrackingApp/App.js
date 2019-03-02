import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/Login';
import Route from './router/Route';

export default class App extends React.Component {
  render() {
    return (
      <View style={{width: '100%',height: '100%'}}>
      <Route />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
