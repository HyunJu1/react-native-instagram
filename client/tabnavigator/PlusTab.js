import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default class PlusTab extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <Ionicons name="ios-camera"style={{ paddingLeft: 10 }}  size={32}  />,
      title: 'Instagram',
      headerRight: <Ionicons name="ios-send" style={{ paddingRight: 10 }} size={32}  />

    };
  };
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.content}>
        <TextInput style={styles.textInput} placeholder="title" />
        <TextInput style={styles.textInput} placeholder="contents" />
      </View>
      <View style={styles.footer}>
        <View style={styles.viewAcessar}>
          <Button style={styles.btnAcessar} title="Upload" onPress={() => false} />
        </View>
      </View>
    </View>
    );
  }

}  

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	content: {
		flex: 4,
		justifyContent: "center"
	},
	textInput: {
		fontSize: 20,
		height: 45
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