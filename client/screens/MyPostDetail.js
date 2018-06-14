import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPost,deletePost } from '../actions/post';
import {Container,Content} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import CardComponent from '../components/CardComponent'
class MyPostDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {

      title: 'My Post Detail',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    };
  };
  constructor(props){
    super(props);

    this.state = {
     id2  : this.props.navigation.state.params.idd
    }
    this.props.fetchPost(this.state.id2);

  }
  componentDidMount() {
    // this.props.fetchPosts();
    
    this.props.fetchPost(this.state.id2);
  }
  renderPost() {
   
    if (this.props.posts) {
      return this.props.posts.map(post => {

        return (
          <View style={styles.card} key={post.id}>
            <CardComponent myProfile={post.User.image} imageSource={post.image} likes={post.likes} createdAt={post.createdAt} title={post.title} name={post.User.username} content={post.content}/>
            <Button color="#ff3366" title="Edit" onPress={() => {
          
        }}  
          /><Button style={{paddingTop:10}} color="#ff3366" title="Delete" onPress={() => {
            
            this.props.deletePost(this.props.posts[0].id);
          }}  />
          </View>
        );
      });
    }
  }
  render() {
    return (

      <Container style={styles.container}  >
       <Content>
          <View style={{ paddingTop: 10 }} >
      
          {this.renderPost()}
          </View>
        </Content>
      </Container>

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
  return { posts:state.post };
}
export default connect(mapStateToProps, { fetchPost,deletePost })(MyPostDetail);

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  }
});