import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class HeartScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Heart Screen</Text>
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
