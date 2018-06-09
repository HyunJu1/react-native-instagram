import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    };
  };
  componentDidMount() {
    this.props.fetchPosts();
  }
  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map(post => {
        return (
          <View style={styles.card} key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>{post.name}</Text>
          </View>
        );
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.users}>
          {this.renderPosts()}
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
  return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts })(HomeScreen);

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
  card: {
    alignSelf: "stretch",
    padding: 30,
    borderBottomWidth: 5,
    borderBottomColor: '#EEE'
  }
});
