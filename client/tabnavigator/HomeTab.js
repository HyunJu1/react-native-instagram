import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,

  FlatList,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts ,fetchUsers} from '../actions';
import { Ionicons } from '@expo/vector-icons';
import {Container,Content, RefreshControl,ListView, Thumbnail,Header,Left,Right,Body} from 'native-base';
import CardComponent from '../screens/CardComponent'
import PTRView from 'react-native-pull-to-refresh';
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32 } />
    };
  };

  constructor() {
    super()
    this.state = {
 
      refreshing: false
    }
  }
  _onRefresh() {
    this.setState({refreshing: true});
    fetchPosts().then(() => {
      this.setState({refreshing: false});
    });
  }
  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }
  componentDidMount() {
   
    this.props.fetchPosts();
    this.props.fetchUsers();
    // setInterval(() => {
    //   this.props.fetchPosts();
    //   console.log("data Update");
      
    // }, 5000);
  }

  renderPosts() {
    if (this.props.posts) {
      console.log(this.props.posts)
      return this.props.posts.map(post => {
        return (

          <View key={post.id}>

            <CardComponent myProfile={post.User.image} imageSource={post.image} likes={post.likes} createdAt={post.createdAt} title={post.title} name={post.User.username} content={post.content}/>
         
          </View>
       
        );
      });
    }
  }
    
  
  render() {
    return (
 
       <Container style={styles.container}  >
        <Ionicons name="ios-refresh" style={{ paddingLeft: 180 , paddingTop:5}} size={32}  onPress={() => this.props.fetchPosts() } />
        <Content>
            <ScrollView style={{ paddingTop: 10 }} >
           
                {this.renderPosts()}
             
            </ScrollView>
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

function mapStateToProps(state) {
  return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts,fetchUsers })(HomeScreen);

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  }
});