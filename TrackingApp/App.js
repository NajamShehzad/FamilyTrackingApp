import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/Login';
import Route from './router/Route';
import store from './redux/store';
import { Provider } from 'react-redux';



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ width: '100%', height: '100%' }}>
          <Route />
        </View>
      </Provider>
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
