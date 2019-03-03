import React from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import axios from 'axios';


export default class Login extends React.Component {

    state = {
        email: "",
        password: "",
    }

    signin = async () => {
        try {

            const { email, password } = this.state;
            let body = {
                email,
                password
            }
            let userData = await axios.post('https://d5cf7773.ngrok.io/signin', body);
            console.log(userData.data);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <View style={{ borderColor: 'blue', flex: 1, alignItems: "center", justifyContent: "center" }}>

                <View
                    style={{ flex: 1 }}
                >

                    <Text
                        style={{ fontSize: 60, fontWeight: "bold", textAlign: "center", color: "#1b3815" }}
                    >
                        Family GPS
                    </Text>

                </View>
                <View style={{ flex: 1 }}>
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
                    <Button
                        type='outline'
                        title="Signup"
                        buttonStyle={styles.loginButton}
                        onPress={() => {
                            this.signin();
                            // Actions.signupPage();
                        }} />
                    <Button

                        title="Sign In"
                        buttonStyle={styles.loginButton}
                        onPress={() => {
                            this.signin();
                            // this.props.navigation.navigate("MapView");
                            // Actions.replace('homeScreen');
                            // Alert.alert(this.state.text) 
                        }} />
                </View>

            </View>
        );
    }
}

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    }

});