import React from "react";
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";


export default class Login extends React.Component {

    state = {
        text: "",
    }

    render() {
        return (
            <View style={{ borderColor: 'blue', flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home</Text>

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