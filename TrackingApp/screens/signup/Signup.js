import React from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView , Platform } from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { ImagePicker, Constants, Location, Permissions } from 'expo';
import axios from 'axios';
import path from "../../config/Path";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Login extends React.Component {

  state = {
    fullName: "",
    email: '',
    password: '',
    profilePicUrl: '',
    profilePicBlob: '',
    nextStep: false,
    contactNum: '',
    picBase64: '',
    error: false,
    image: null,
    blob: false,
    location: null,
    errorMessage: null,
    isLoading: false
  }


  // Gettiing Permission To Get User Location
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    this.setState({ location });
  };


  // Function For Upload Image From Gallery
  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    });
    if (!result.cancelled) {
      this.setState(
        {
          profilePicUrl: result.uri,
          picBase64: "data:image/jpeg;base64," + result.base64
        }
      )
    }
    // console.log(result);
  };


  //SignUp Function

  signup = async () => {
    try {

      const { fullName, password, picBase64, email } = this.state;
      let body = {
        fullName, email, password, profilePicture: picBase64
      }
      // console.log(body);
      let userData = await axios.post(path.SIGNUP, body);
      console.log(userData.data);
      if(userData.data.success){
        console.log(userData.data);
        Actions.loginPage();
      }
    } catch (err) {
      console.log(err);
    }
  }












  render() {
    const { profilePicUrl } = this.state;
    let behavior = "";
    if (Platform.OS == "ios") {
      behavior = "padding";
    }
    return (
      <View style={{ borderColor: 'blue', flex: 1, alignItems: "center", justifyContent: "center", ...styles.container }}>

        <View
          style={{ flex: 1, justifyContent: 'center', }}
        >
          <TouchableOpacity onPress={() => this.pickImage()}>
            <Image
              source={profilePicUrl ? { uri: profilePicUrl } : { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUWQ9K7qEOKRtk73V4Guwp_BcL4JcY9U8atV2gGahNnjhVt7D' }}
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
        <KeyboardAvoidingView behavior={behavior}>
          <TextInput
            style={styles.loginInput}
            onChangeText={(fullName) => this.setState({ fullName })}
            value={this.state.text}
            placeholder="Full Name"
          />
          <TextInput
            style={styles.loginInput}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.text}
            placeholder="Email"
          />
          <TextInput
            style={styles.loginInput}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.text}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Button
            title="Create Account"
            buttonStyle={styles.loginButton}
            onPress={this.signup} />
            </KeyboardAvoidingView>
            </KeyboardAwareScrollView>
        </View>

      </View>
    );
  }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderColor: 'red',
    borderLeftWidth: 10,
    borderRightWidth: 5,
},
  loginInput: {
    fontSize: 15,
    color: "#1b3815",
    width: width * 0.8,
    height: 50,
    backgroundColor: "#ebebeb",
    borderRadius: 27,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 35,
    paddingRight: 35,
    maxWidth: 400,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#d83634",
    borderRadius: 27,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 35,
    paddingRight: 35,
    maxWidth: 400
  },
  profilePic: {
    width: 180,
    height: 180,
    borderRadius: 100,
    marginBottom: 30
  },
  uploadPicBtn: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#0984e3',
    borderRadius: 10,
    backgroundColor: '#0984e3',
    width: '60%',
    padding: 10,
    alignItems: 'center'
  },
  uploadPicBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  finishBtn: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#6ab04c',
    borderRadius: 10,
    backgroundColor: '#6ab04c',
    width: '60%',
    padding: 10,
    alignItems: 'center'
  },
  finishBtnText: {
    color: '#fff',
    fontSize: 18,
  }

});