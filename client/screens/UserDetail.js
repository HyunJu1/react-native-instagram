import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Image,
  TouchableOpacity ,
  Dimensions,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { fetchMyProfile, fetchMyPost } from '../actions';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Content, Icon, Header, Left, Body, Right, Button,Segment } from 'native-base'
import CardComponent from '../components/CardComponent'
import Timestamp from 'react-timestamp';
var { height, width } = Dimensions.get('window');
import NavigationService from '../navigation_service';
import {  StackNavigator,} from 'react-navigation';

class UserDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {

      title: 'Instagram',
      headerRight:     
      
      <MaterialCommunityIcons name="logout"style={{ paddingRight: 10 }}  size={28} 
      onPress={async()=>{await AsyncStorage.clear(); navigation.navigate('Auth');}}
      />
      ,

      };
    };

    constructor(props) {
      super(props)

      this.state = {
          activeIndex: 0
      }
  }  
  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  segmentClicked(index) {
      this.setState({
          activeIndex: index
      })
  }
  checkActive = (index) => {
      if (this.state.activeIndex !== index) {
          return (
              { color: 'grey' }
          )
      }
      else {
          return (
              {}
          )
      }
    }

renderSectionOne() {
    const { navigate } = this.props.navigation;
    return this.props.myPost.map((post,index) => {
        const imageSource={
            uri:post.image
        }
        const idd=post.id
        console.log("idd:"+idd)
            return (
                <TouchableOpacity onPress={()=>{console.log('idd2:'+idd);navigate('PostDetail',{idd})}}  >
                
                <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                        
                        <Image style={{
                            flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined,

                        }} source={imageSource}  >
                        </Image>
                  
                </View>
                </TouchableOpacity> 
            )
  });

}

renderSection() {

  if (this.state.activeIndex == 0) {

      return (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
    
              {this.renderSectionOne()}
          </View>
      )

  }
  else if (this.state.activeIndex == 1) {
    if (this.props.myPost) {
      
        return this.props.myPost.map(post => {
 
          return (
            <View>
             <CardComponent myProfile={post.User.image} imageSource={post.image} likes={post.likes} createdAt={post.createdAt} title={post.title} name={post.User.username} content={post.content}/>
         
            </View>
         
          );
        });
      }
  }
}
  componentDidMount() {

    this.props.fetchMyProfile();
    this.props.fetchMyPost();
  }
  render() {

      const imageSource={
        uri: this.props.profile.image
    }
    return (
      <Container style={styles.container}>

      <Content>

          <View style={{ paddingTop: 10 }}>


              <View style={{ flexDirection: 'row' }}>


                  <View
                      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                      
                      <Image source={imageSource}
                          style={{ width: 75, height: 75, borderRadius: 37.5 }}/>

                  </View>
            <View style={{ flex: 3 }}>

      
                      <View
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              alignItems: 'flex-end',
                              paddingTop:20
                          }}>
                          <View style={{ alignItems: 'center' }}>
                              <Text>2</Text>
                              <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                          </View>
                          <View style={{ alignItems: 'center' }}>
                              <Text>21</Text>
                              <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                          </View>
                          <View style={{ alignItems: 'center' }}>
                              <Text>19</Text>
                              <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                          </View>
                      </View>


                     <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>

                          <View
                              style={{ flexDirection: 'row' }}>

                              <Button bordered dark
                                  style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>

                              <Button bordered dark style={{
                                  flex: 1,
                                  height: 30,
                                  marginRight: 10, marginLeft: 5,
                                  justifyContent: 'center'
                              }}>
                                  <Icon name="settings" style={{ color: 'black' }}></Icon></Button>
                          </View>
                      </View> 
                  </View>
              </View>

              <View style={{ paddingBottom: 10 }}>
                  <View style={{ paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: 'bold' }}>{this.props.profile.username}</Text>
                      <Text>가입날짜: <Timestamp time={this.props.profile.createdAt} component={Text} format='date'/> </Text>
                  </View>
              </View>


          </View>


          <View >
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}>
                  <Button

                      onPress={() => this.segmentClicked(0)}
                      transparent
                      active={this.state.activeIndex == 0}

                  >
                      <Icon name="ios-apps-outline"
                          style={[this.state.activeIndex == 0 ? {} : { color: 'grey' }]} >
                      </Icon>
                  </Button>
                  <Button
                      onPress={() => this.segmentClicked(1)}
                      transparent active={this.state.activeIndex == 1}>
                      <Icon name="ios-list-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 1 ? {} : { color: 'grey' }]}></Icon>
                  </Button>
                  <Button
                      onPress={() => this.segmentClicked(2)}
                      transparent active={this.state.activeIndex == 2}>
                      <Icon name="ios-bookmark-outline" style={this.state.activeIndex == 2 ? {} : { color: 'grey' }}></Icon>
                  </Button>
                  <Button
                      onPress={() => this.segmentClicked(3)}
                      transparent last active={this.state.activeIndex == 3}>
                      <Icon name="ios-people-outline" style={[{ fontSize: 32 }, this.state.activeIndex == 3 ? {} : { color: 'grey' }]}></Icon>
                  </Button>
              </View>

  <Ionicons name="ios-refresh" style={{ paddingLeft: 180 , paddingTop:5}} size={32}  onPress={() => this.props.fetchMyPost() } />

              {this.renderSection()}

          </View>
      </Content>
  </Container >
);
}


}

function mapStateToProps(state) {
  return { 
      profile: state.loginUser ,
      myPost:state.mypost,
   
};
}
export default connect(mapStateToProps, { fetchYourProfile,fetchYourPost })(UserDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
