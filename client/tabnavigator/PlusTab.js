import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { createPost } from '../actions';


class PlusTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    }; 
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.content}>
        <TextInput style={styles.textInput1} placeholder="title"   onChangeText={(title) => this.setState({title})}/>
        <TextInput multiline  style={styles.textInput2} placeholder="contents"  onChangeText={(contents) => this.setState({contents})}/>
      </View>
      <View style={styles.footer}>
        <View style={styles.viewAcessar}>
          <Button style={styles.btnAcessar} title="Upload" onPress={() => this.props.createPost(this.state.title,this.state.contents)} />
        </View>
      </View>
    </View>
    );
  }

} 
function mapStateToProps(state) {
  return {  };
} 
export default connect(mapStateToProps, { createPost })(PlusTab);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	content: {
		flex: 4,
		justifyContent: "center"
	},
	textInput1: {
		fontSize: 20,
    height: 45,

  },
  textInput2: {
		fontSize: 20,
    height: 200,

	},
	footer: {
		flex: 1
	},
	viewAcessar: {
		backgroundColor: "#115E54"
	},
	btnAcessar: {
		color: "#ffffff"
	}
});