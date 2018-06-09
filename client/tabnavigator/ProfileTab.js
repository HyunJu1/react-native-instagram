import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Image,

  Dimensions,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Content, Icon, Header, Left, Body, Right,   Button,Segment } from 'native-base'
import CardComponent from '../screens/CardComponent'
var { height, width } = Dimensions.get('window');
var images = [
  require('../assets/feed_images/1.jpg'),
  require('../assets/feed_images/2.jpg'),
  require('../assets/feed_images/3.png'),
  require('../assets/feed_images/1.jpg'),
  require('../assets/feed_images/2.jpg'),
  require('../assets/feed_images/3.png'),

]
class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
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
  return images.map((image, index) => {
      return (
          <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
              <Image style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  width: undefined,
                  height: undefined,

              }}
                  source={image}>
              </Image>

          </View>
      )
  })

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
      return (
          <View>
              
              <CardComponent imageSource="1" likes="101" />
              <CardComponent imageSource="2" likes="101" />
              <CardComponent imageSource="2" likes="101" />
              <CardComponent imageSource="2" likes="101" />
              <CardComponent imageSource="2" likes="101" />
              <CardComponent imageSource="3" likes="101" />
          </View>
      )
  }
}
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
      console.log(this.props.profile);
    return (
      <Container style={styles.container}>

      <Content>

          <View style={{ paddingTop: 10 }}>

              {/** User Photo Stats**/}
              <View style={{ flexDirection: 'row' }}>

                  {/**User photo takes 1/3rd of view horizontally **/}
                  <View
                      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Image source={require('../assets/me2.png')}
                          style={{ width: 75, height: 75, borderRadius: 37.5 }} />

                  </View>

                  {/**User Stats take 2/3rd of view horizontally **/}
                  <View style={{ flex: 3 }}>

                      {/** Stats **/}
                      <View
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              alignItems: 'flex-end'
                          }}>
                          <View style={{ alignItems: 'center' }}>
                              <Text>20</Text>
                              <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                          </View>
                          <View style={{ alignItems: 'center' }}>
                              <Text>205</Text>
                              <Text style={{ fontSize: 10, color: 'grey' }}>Followers</Text>
                          </View>
                          <View style={{ alignItems: 'center' }}>
                              <Text>167</Text>
                              <Text style={{ fontSize: 10, color: 'grey' }}>Following</Text>
                          </View>
                      </View>

                      {/**Edit profile and Settings Buttons **/}
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>

                          <View
                              style={{ flexDirection: 'row' }}>

                              {/** Edit profile takes up 3/4th **/}
                              <Button bordered dark
                                  style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30 }}><Text>Edit Profile</Text></Button>


                              {/** Settings takes up  1/4th place **/}
                              <Button bordered dark style={{
                                  flex: 1,
                                  height: 30,
                                  marginRight: 10, marginLeft: 5,
                                  justifyContent: 'center'
                              }}>
                                  <Icon name="settings" style={{ color: 'black' }}></Icon></Button>
                          </View>
                      </View>{/**End edit profile**/}
                  </View>
              </View>

              <View style={{ paddingBottom: 10 }}>
                  <View style={{ paddingHorizontal: 10 }}>
                      <Text style={{ fontWeight: 'bold' }}>{this.props.profile.username}</Text>
                      <Text>가입날짜: {this.props.profile.createdAt} </Text>
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



              {/** Height =width/3 so that image sizes vary according to size of the phone yet remain squares **/}

              {this.renderSection()}

          </View>
      </Content>
  </Container >
);
}


}

function mapStateToProps(state) {
  return { profile: state.loginUser };
}
export default connect(mapStateToProps, { fetchUsers })(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
