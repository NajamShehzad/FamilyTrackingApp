import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Drawer, Actions } from "react-native-router-flux";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import {  ListItem } from "react-native-elements";
import { AsyncStorage } from "react-native";
import Login from '../screens/login/Login';
import Signup from '../screens/signup/Signup';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import CreateCircle from "../screens/createCircle/CreateCircle";
import FamilyScreen from "../screens/familyScreen/FamilyScreen";
import inviteNewMember from "../screens/inviteNewMember/InviteNewMember";
import HeaderBar from '../components/header/HeaderBar';
import JoinCircle from "../screens/joinCircle/JoinCircle";   

const SideMenu = props => {
  console.log(props);

  return (
    <View>
      <ListItem
       onPress={() => { AsyncStorage.removeItem('userData');Actions.replace('loginPage') }}
        containerStyle={{borderColor: 'lightgray',borderWidth: 1}}
        leftAvatar={<TouchableOpacity style={styles.inlineIcons}>
          <Icon
            name="sign-out"
            type='font-awesome'
            color="gray"
          />
        </TouchableOpacity>}
        title={'LOGOUT'}
      />
    </View>
  );
};
class Route extends Component {
  render() {

    return (
      <Router navBar={HeaderBar}>
      
        <Stack key="root">
          <Scene
            initial={true}
            key="loginPage"
            component={Login}
            hideNavBar={true}
          />


          <Scene
            key="signupPage"
            component={Signup}
            hideNavBar={true}
          />
          <Drawer key="homeScreen" drawer contentComponent={SideMenu} drawerWidth={220}>
          <Scene
            // key="homeScreen"
            component={HomeScreen}
          hideNavBar={true}
          />
          </Drawer>
          <Scene
            key="createCircleScreen"
            component={CreateCircle}
            hideNavBar={true}
          />
          <Scene
            key="familyScreen"
            component={FamilyScreen}
            hideNavBar={true}
          />
          <Scene
            key="inviteNewMember"
            component={inviteNewMember}
            hideNavBar={true}
          />
          <Scene
            key="joinCircle"
            component={JoinCircle}
            hideNavBar={true}
          />
        </Stack>
        
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
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
  inlineIcons: {
    display: 'flex',
    flexDirection: 'row',
  }
})
export default Route;