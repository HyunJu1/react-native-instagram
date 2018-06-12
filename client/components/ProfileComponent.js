import React from "react";
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
import { Container, Content, Icon, Header, Left, Body, Right, Button,Segment } from 'native-base'

import Timestamp from 'react-timestamp';



const ProfileComponent = props => {
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
       
      )
      };

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
