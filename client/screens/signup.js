import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../actions';
const { width, height } = Dimensions.get("window");


const background = require("../assets/login1_bg.png");
const mark = require("../assets/instagram_logo.png");
const lockIcon = require("../assets/login1_lock.png");
const personIcon = require("../assets/login1_person.png");

class SignUpScreen extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={background} style={styles.background} resizeMode="cover">
        <View  style={styles.text}>
          <Text style={styles.navBarText}>SIGN UP</Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
          <Text>아이디를 입력하세요</Text>
            <View style={styles.iconWrap}>

              <Image source={personIcon} style={styles.icon} resizeMode="contain" />
            </View>
            
            <TextInput placeholder="Username" style={styles.input}
              onChangeText={(username) => this.setState({ username })}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize='none'
              value={this.state.username}
              />
                 </View>
            <View style={styles.inputWrap}>
            <Text>비밀번호를 입력하세요</Text>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              
        <TextInput placeholder="Password" style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password} spellCheck={false}
          autoCorrect={false}
          autoCapitalize='none'
           />
           </View>
            <TouchableOpacity activeOpacity={.5}>
            
        <Button color="#ff3366" title="Sign Up" onPress={() => {
          this.props.signup(this.state.username, this.state.password);
        }} />
     
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {  };
} 
export default connect(mapStateToProps, { signup })(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,

  },
  text: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarText: {
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  }, 
  mark: {
    width: null,
    height: null,
    flex: 1,

  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },

  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});
