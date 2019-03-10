import React from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import axios from 'axios';
import path from "../../config/Path";
import { AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FamilyGpsIcon from '../../assets/FamilyGpsIcon.png';


export default class Login extends React.Component {

    state = {
        email: "",
        password: "",
    }

    _asyncGetUserData = async () => {
        try {
          let user = await AsyncStorage.getItem("userData");
          return JSON.parse(user)
        } catch (er) {
          return false;
        }
      };
componentWillMount = () => {
    this._asyncGetUserData().then(userData => {
        if(userData){
            Actions.replace('homeScreen');
        }
    }).catch(err => {alert(err.message)})
}
    signin = async () => {
        try {

            const { email, password } = this.state;
            let body = {
                email,
                password
            }
            let userData = await axios.post(path.LOGIN, body);
            console.log(userData.data);
            if(userData.data.success){
                AsyncStorage.setItem('userData',JSON.stringify(userData.data.data)).then(() => {
                    Actions.replace('homeScreen');
                })
            }
            else if(!userData.data.success){
                alert(userData.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        let behavior = "";
    if (Platform.OS == "ios") {
      behavior = "padding";
    }
        return (
            <View style={{ borderColor: 'blue', flex: 1, alignItems: "center", justifyContent: "center" ,...styles.container}}>

                <View
                    style={{ flex: 1, justifyContent: 'center', }}
                >

            <Image
              source={FamilyGpsIcon}
              style={styles.profilePic}
            />

                </View>
                <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
        <KeyboardAvoidingView behavior={behavior}>
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.text}
                        placeholder="Enter Your Email"
                    />
                    <TextInput
                        style={styles.loginInput}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        placeholder="Enter Your Passowrd"
                        secureTextEntry={true}
                    />
                    <Button title="Sign In"
                        buttonStyle={styles.loginButton}
                        onPress={() => {
                            this.signin();
                            // this.props.navigation.navigate("MapView");
                            // Actions.replace('homeScreen');
                            // Alert.alert(this.state.text) 
                        }} />
                        <Button
                            type='outline'
                            title="Signup"
                            color="#d83634"
                            titleStyle={{color: "#d83634"}}
                            containerStyle={{borderColor: "#d83634"}}
                            buttonStyle={styles.signupButton}
                            onPress={() => {
                                // this.signin();
                                Actions.signupPage();
                            }} />

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
        borderLeftWidth: 5,
    },
    loginInput: {
        fontSize: 15,
        color: '#1b3815',
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
    signupButton: {
        height: 50,
        // backgroundColor: "#d83634",
        borderColor: "#d83634",
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
      height: 230,
      marginBottom: 30
    },

});