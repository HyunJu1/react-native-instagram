import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Ionicons } from '@expo/vector-icons';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: (
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Auth');
          }} 
          title="Signout"
          color="red"
        />)
      };
    };
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

function mapStateToProps(state) {
  return { users: state.users };
}
export default connect(mapStateToProps, { fetchUsers })(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
