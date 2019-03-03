import React, { Component } from 'react';
import { View, Text,Image, TextInput, Alert,StyleSheet,Dimensions,TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage,ListItem,  Icon, Input, Header, Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";



class FamilyScreen extends Component {
    state = {  }
    render() { 
      const { circleMembers, ownerId, circleName, password } = this.props.circleData;
      const { circleData } = this.props;
        return ( 
            <View style={{width: '100%',height: '100%'}}>
            <Header
            containerStyle={styles.headerStyle}
            backgroundColor='white'
            leftComponent={<TouchableOpacity onPress={() => {Actions.pop()}}> 
               <Icon
              name="angle-left"
              type="font-awesome"
            />
            </TouchableOpacity>}
            centerComponent={{
                text: circleName,
                style: { color: "gray", fontSize: 25 }
              }}
            />
               {circleMembers.length > 0  && circleMembers.map((val,index) => (<ListItem
               onPress={() => {Actions.inviteNewMember()}}
        key={index}
        leftAvatar={{ source: { uri: val.pictureUrl } }}
   
        title={val.memberName}
        subtitle={(ownerId == val.memberId) ? 'Owner' : 'Member' }
               />))}
      <TouchableOpacity
       onPress={() => {Actions.inviteNewMember({circleData})}} style={{backgroundColor: 'white',width: '100%'}}>
      <ListItem
     containerStyle={{width: '60%',marginLeft: '20%'}}
        key={1}
        leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-128.png' },size: 30 }}
   
        title={'Invite New Members'}
      />
      </TouchableOpacity>
    
              <Button buttonStyle={styles.leaveCircleBtn} title={'Leave Circle'} />
            </View> 
         );
    }
}
 

export default FamilyScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    leaveCircleBtn: {
        marginTop: 500,
        height: 50,
        backgroundColor: 'gray',
        borderRadius: 20,
        width: 150,
        width: '40%',
        marginLeft: '30%'
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