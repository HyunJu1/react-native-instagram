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
import { signin } from '../actions';

const { width, height } = Dimensions.get("window");

const background = require("../assets/login1_bg.png");
const mark = require("../assets/instagram_logo.png");
const lockIcon = require("../assets/login1_lock.png");
const personIcon = require("../assets/login1_person.png");
import {  StackNavigator,} from 'react-navigation';



class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <ImageBackground source={background} style={styles.background} resizeMode="cover">
        <View style={styles.markWrap}>
          <Image source={mark} style={styles.mark} resizeMode="contain" />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
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
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
        <TextInput placeholder="Password" style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true} />
           </View>
            <TouchableOpacity activeOpacity={.5}>
            
        <Button color="#ff3366" title="Sign in" onPress={() => {
          this.props.signin(this.state.username, this.state.password);
        }} disabled={!this.state.username || !this.state.password }
          />
     
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5}>
                <View>
                  <Button style={styles.signupLinkText} onPress={() => { navigate('SignUp'); }} title="Sign Up" color="#ff3366"></Button>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingHorizontal: 30,
  },
  mark: {
    width: 300,
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

  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8",
    paddingHorizontal:10
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});
export default connect(null, { signin })(SignInScreen);
