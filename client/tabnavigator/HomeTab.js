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
import { fetchPosts } from '../actions';
import { Ionicons } from '@expo/vector-icons';
import {Container,Content, Thumbnail,Header,Left,Right,Body} from 'native-base';
import CardComponent from '../screens/CardComponent'
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />
    };
  };

  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }
  componentDidMount() {
   
    this.props.fetchPosts();
    const url = 'https://next.json-generator.com/api/json/get/V1HGd7LnV'
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.data
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  renderPosts() {
    console.log(this.props.posts);
    if (this.props.posts) {
      return this.props.posts.map(post => {
        return (
 
          <View>
            <CardComponent imageSource={post.image} likes={post.likes} createdAt={post.createdAt} title={post.title} name={post.name} content={post.content}/>
          </View>
       
        );
      });
    }
  }
    
  
  render() {
    return (

      <Container style={styles.container}>
        <Content>
            <View style={{ paddingTop: 10 }}>
           
                {this.renderPosts()}
             
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

function mapStateToProps(state) {
  return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts })(HomeScreen);

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  }
});