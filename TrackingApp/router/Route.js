import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Actions } from "react-native-router-flux";
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
import HeaderBar from '../components/header/HeaderBar'

// const ElementHeader = props => {
//   console.log(props);

//   return (
//     <View>
//       <Header
//         containerStyle={styles.containerStyle}
//         backgroundColor="white"
//         leftComponent={
//           <TouchableOpacity onPress={() => { Actions.allmessages() }}>
//             <Icon
//               name="menu"
//               size={40}
//               color="gray"
//             />
//           </TouchableOpacity>

//         }
//         centerComponent={<TouchableOpacity onPress={() => this.setState({dropMenu: !dropMenu})} style={styles.inlineIcons}><Text style={{fontSize: 25,marginRight: 5}}>Family</Text>
//         <Icon
//           name="angle-up"
//           size={20}
//           type='font-awesome'
//           color="black"
//         />
//         </TouchableOpacity>}
//         rightComponent={
//           <TouchableOpacity onPress={() => { Actions.allmessages() }}>
//             <Icon
//               name="group-add"
//               size={40}
//               color="gray"
//             />
//           </TouchableOpacity>
//         }
//       />
//       <ListItem
//         key={1}
//         containerStyle={{borderColor: 'lightgray',borderWidth: 1}}
//         leftAvatar={<TouchableOpacity style={styles.inlineIcons} onPress={() => { Actions.allmessages() }}>
//           <Icon
//             name="person-outline"
//             type="AntDesign"
//             color="gray"
//           /><Text>1</Text>
//         </TouchableOpacity>}
//         rightAvatar={
//           <TouchableOpacity onPress={() => { Actions.allmessages() }}>
//             <Icon
//               name="settings"
//               color="gray"
//             />
//           </TouchableOpacity>
//         }
//         title={'Muneeb Khan'}
//       />
//       <ListItem
//         key={1}
//         containerStyle={{borderColor: 'lightgray',borderWidth: 1}}
//         leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-128.png' }, size: 30 }}
//         title={'Create Circle'}
//       />
//     </View>
//   );
// };
class Route extends Component {
  render() {

    return (
      <Router navBar={HeaderBar}>
        <Stack key="root">
          <Scene
            key="loginPage"
            component={Login}
            title="Login"
            hideNavBar={true}
          />
          <Scene
            key="signupPage"
            component={Signup}
            title="Signup"
            hideNavBar={true}
          />
          <Scene
            initial={true}
            key="homeScreen"
            component={HomeScreen}
            title="Signup"
          // hideNavBar={true}
          />
          <Scene
            key="createCircleScreen"
            component={CreateCircle}
            title="Signup"
            hideNavBar={true}
          />
          <Scene
            key="familyScreen"
            component={FamilyScreen}
            title="Signup"
            hideNavBar={true}
          />
          <Scene
            key="inviteNewMember"
            component={inviteNewMember}
            title="Signup"
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