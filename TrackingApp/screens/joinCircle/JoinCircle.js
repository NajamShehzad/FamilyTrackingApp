import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, Icon, Input, Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import Axios from 'axios';
import path from '../../config/Path';
import Provider from '../../config/Provider';



class JoinCircle extends Component {
    state = {
        passKey: '',
        disablebtn: true,
        userData: null
    }

    componentDidMount() {
        Provider._asyncGetUserData().then(res => {
          this.setState({ userData: res });
        })
      }
    joinCircle = async () => {
        const { passKey, userData } = this.state;
        alert(passKey);
        try {
            let join = await Axios.post(path.JOIN_CIRCLE,{memberId: userData._id,circlePassword: passKey});
            if(join.data.success){
                alert('Added to group successfully');
                Actions.replace('homeScreen');
            }
            else{
                alert(join.data.message)
            }
        }
        catch (err){
            alert(err.message);
        }
    }
    render() {
        const { passKey, disablebtn } = this.state;
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
                        text: 'Join a Circle',
                        style: { color: "gray", fontSize: 25 }
                    }}
                />
                <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                        <View style={styles.centerComp}>
                    <Text style={styles.enterName}>Please, enter invite code</Text>
                    <Input containerStyle={styles.enterNameInput}
                    onChangeText={(passKey) => {
                        if(passKey.length == 8){
                            this.setState({disablebtn: false,passKey})
                        }
                        else{
                            this.setState({ passKey,disablebtn: true })
                        }}}
                    value={passKey}
                    placeholder={'XXXXXXXX'} />
                    <Text style={styles.heading2}>Get the code from your Circle's Admin</Text>
                    <Button buttonStyle={styles.enterNameBtn}
                    disabled={disablebtn}
                    disabledStyle={styles.enterNameBtn2}
                    onPress={() => {this.joinCircle()}}
                    title='SUBMIT' />
                        </View>
                </View>
            </View>
        );
    }
}


export default JoinCircle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    enterName: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold'  
    },
    heading2: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        color: 'lightgray',
        fontWeight: 'bold'  
    },
    enterNameInput: {
        width: 300,
        paddingLeft: 50,
        paddingRight: 50,
        // backgroundColor: 'blue'
    },
    enterNameBtn: {
        marginTop: 20,
        backgroundColor: '#f74069',
        borderRadius: 20,
        width: 150
    },
    enterNameBtn2: {
        marginTop: 20,
        backgroundColor: '#fcd0da',
        borderRadius: 20,
        width: 150
    },
    centerComp: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        // backgroundColor: 'red'
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