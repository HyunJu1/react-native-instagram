import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ListView,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Ionicons } from '@expo/vector-icons';
import Timestamp from 'react-timestamp';
import { Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
class LikeTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    };
  };
  componentDidMount() {
    this.props.fetchUsers();
  }
  renderUsers() {
  
    if (this.props.users) {
      return this.props.users.map(user => {  
        const profileImage={
        uri:user.image
      }
        return (
  
          
<View key={user.id} style={styles.image}>
        
          <Body>
            
          <Thumbnail style={{  paddingTop:30}} source={profileImage} />
              <Text>{user.username} </Text>
              <Text note><Timestamp time={user.createdAt}component={Text} format='full'/>  </Text>
              </Body>
</View>
        
      );
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.users}>
          {this.renderUsers()}
        </View>
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
export default connect(mapStateToProps, { fetchUsers })(LikeTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  users: {
    flex: 1,
    alignSelf: "stretch"
  },
  image: {
    flex: 1,
    alignSelf: "stretch"
  },

});
