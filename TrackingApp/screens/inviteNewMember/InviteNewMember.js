import React, { Component } from 'react';
import { View, Text, Image, TextInput, Alert, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, ListItem, Icon, Input, Header, Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import Provider from '../../config/Provider';
import Axios from 'axios';
import path from '../../config/Path';



class InviteNewMember extends Component {
  state = {
    email: '',
    userData: null
  }

  componentDidMount() {
    Provider._asyncGetUserData().then(res => {
      this.setState({ userData: res });
    })
  }

  sendInvite = async () => {
    const { userData, email } = this.state;
    const { _id } = this.props.circleData;
    if(email){
      console.log({circleId: _id,email,senderName: userData.fullName})
      try{
       let inviteUser = await Axios.post(path.INVITE_USER,{circleId: _id,email,senderName: userData.fullName});
       if(inviteUser.data.success){
        
        this.setState({email: ''},() => {
          alert(inviteUser.data.message);
        })
       }
       else{
         alert(inviteUser.data.message);
       }
      }
      catch (err){
        alert(err.message);
      }
    }
    else{
      alert('Please provide an Email.')
    }
  }
  render() {
    const { email } = this.state;
    const { password } = this.props.circleData;
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
            text: 'Invite New Members',
            style: { color: "gray", fontSize: 25 }
          }}
        />
        <View style={styles.centerComp}>
          <Avatar overlayContainerStyle={{ backgroundColor: 'transparent' }} size={300} icon={{ name: "group-add", color: 'lightgray' }} />
          <Text style={styles.shareCodeTxt}>Share this code with people you want to join your circle</Text>
          <Text style={styles.textCode}>{password}</Text>
        <Input containerStyle={styles.invitedpersonEmail}
                    onChangeText={(email) => this.setState({ email })}
                    value={email}
                    placeholder={'Enter Email'} />
        </View>
        

        <Button buttonStyle={styles.sendBtn} onPress={() => {this.sendInvite()}} title={'SEND'} />
      </View>
    );
  }
}


export default InviteNewMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCode: {
    textAlign: 'center',
    color: 'green',
    fontSize: 20
  },
  invitedpersonEmail: {
      width: 300,
      paddingLeft: 50,
      paddingRight: 50,
      marginTop: 20
      // backgroundColor: 'blue'
  },
  sendBtn: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#f74069',
    borderRadius: 20,
    width: 150,
    width: '40%',
    marginLeft: '30%'
  },
  centerComp: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  shareCodeTxt: {
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: -100,
    fontSize: 20,
    textAlign: 'center',
    color: 'gray'
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