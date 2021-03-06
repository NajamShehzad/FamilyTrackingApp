import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Icon, Input, Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import Provider from '../../config/Provider';
import Axios from 'axios';
import path from '../../config/Path';



class CreateCircle extends Component {
    state = {
        userData: null,
        circleName: ''
    }

    componentDidMount() {
        Provider._asyncGetUserData().then(res => {
          this.setState({ userData: res });
        })
      }

      createCirle = async () => {
        const { userData, circleName } = this.state;
        console.log({ownerId: userData._id,ownerName: userData.fullName,circleName })
        try{
            let createCircle = await Axios.post(path.CREATE_CIRCLE,{ownerId: userData._id,ownerName: userData.fullName,circleName });
            if(createCircle.data.success){
                console.log(createCircle.data.data);
                alert('Circle created');
                Actions.replace('homeScreen');
            }
            else if(!createCircle.data.success){
                alert(createCircle.data.message)
            }
        }
        catch(err){
            alert(err.message)
        }
        
      }

    render() {
        const { circleName } = this.state;
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <Header
                    containerStyle={styles.headerStyle}
                    backgroundColor='white'
                    leftComponent={<TouchableOpacity onPress={() => { Actions.pop() }}>
                        <Icon
                            name="angle-left"
                            type="font-awesome"
                        />
                    </TouchableOpacity>}
                    centerComponent={{
                        text: 'Create a Circle',
                        style: { color: "gray", fontSize: 25 }
                    }}
                />
                <View style={styles.centerComp}>

                    <Text style={styles.enterName}>Enter your circle name:</Text>
                    <Input containerStyle={styles.enterNameInput}
                    onChangeText={(circleName) => this.setState({ circleName })}
                    value={circleName}
                    placeholder={'Enter Circle name'} />
                    <Button buttonStyle={styles.enterNameBtn} onPress={() => {this.createCirle()}} title='CREATE' />
                </View>
            </View>
        );
    }
}


export default CreateCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    enterName: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold'
    },
    enterNameInput: {
        width: '70%',
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'center'
    },
    enterNameBtn: {
        marginTop: 20,
        backgroundColor: '#f74069',
        borderRadius: 20,
        width: 150
    },
    centerComp: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        padding: 0,
        height: 80
    },
});