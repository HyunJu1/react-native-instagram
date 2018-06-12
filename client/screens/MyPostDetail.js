import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPost,fetchPosts } from '../actions';
import { Ionicons } from '@expo/vector-icons';

class MyPostDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    };
  };
  componentDidMount() {
    this.props.fetchCoins();
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  renderPost() {
    if (this.props.post) {
      return this.props.post.map(post => {
        return (
          <View style={styles.card} key={post.id}>
            <CardComponent myProfile={post.User.image} imageSource={post.image} likes={post.likes} createdAt={post.createdAt} title={post.title} name={post.User.username} content={post.content}/>
         
          </View>
        );
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.users}>
          {this.renderPost()}
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

// function mapStateToProps({ coin }, ownProps) {
//   return { posts: state.post[ownProps.match.params.id] };
// }

function mapStateToProps(state) {
  return { posts: state.posts,post:state.post };
}
export default connect(mapStateToProps, { fetchPost,fetchPosts })(MyPostDetail);

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
