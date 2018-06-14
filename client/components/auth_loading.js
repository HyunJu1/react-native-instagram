import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    this._bootstrapAsync();
  }

e
  _bootstrapAsync = async () => {

    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
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
