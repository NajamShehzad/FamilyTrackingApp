import React, { Component } from 'react';
import { View, Text,Image, TextInput, Alert,StyleSheet,Dimensions,TouchableOpacity } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage,ListItem,  Icon, Input, Header, Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Actions } from "react-native-router-flux";



class FamilyScreen extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={{width: '100%',height: '100%'}}>
            <Header
            containerStyle={styles.headerStyle}
            backgroundColor='white'
            leftComponent={<TouchableOpacity onPress={() => {Actions.allmessages()}}> 
               <Icon
              name="angle-left"
              type="font-awesome"
            />
            </TouchableOpacity>}
            centerComponent={{
                text: 'Family',
                style: { color: "gray", fontSize: 25 }
              }}
            />
               <ListItem
        key={1}
        leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-128.png' } }}
   
        title={'Zeeshan'}
        subtitle={'owner'}
      />
     <ListItem
     containerStyle={{width: '60%',marginLeft: '20%'}}
        key={1}
        leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-128.png' },size: 30 }}
   
        title={'Invite New Members'}
      />
              <Button title={'Leave Circle'} />
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
      justifyContent: 'center',
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