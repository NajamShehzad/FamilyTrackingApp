import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Actions } from "react-native-router-flux";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Header, ListItem } from "react-native-elements";
import { AsyncStorage } from "react-native";

class HeaderBar extends Component {

  state = {
    dropMenu: false
  }
    render() {
        const { dropMenu } = this.state; 
      return (
        <View>
      <Header
        containerStyle={styles.containerStyle}
        backgroundColor="white"
        leftComponent={
          <TouchableOpacity onPress={() => { Actions.allmessages() }}>
            <Icon
              name="menu"
              size={40}
              color="gray"
            />
          </TouchableOpacity>

        }
        centerComponent={<TouchableOpacity onPress={() => this.setState({dropMenu: !dropMenu})} style={styles.inlineIcons}><Text style={{fontSize: 25,marginRight: 5}}>Family</Text>
        <Icon
          name={`${dropMenu ? 'angle-down' : 'angle-up'}`}
          size={20}
          type='font-awesome'
          color="black"
        />
        </TouchableOpacity>}
        rightComponent={
          <TouchableOpacity onPress={() => { Actions.joinCircle() }}>
            <Icon
              name="group-add"
              size={40}
              color="gray"
            />
          </TouchableOpacity>
        }
      />
     {dropMenu && <View style={styles.dropMenu}>
 <ListItem
        
  containerStyle={{borderColor: 'lightgray',borderBottomWidth: 1}}
  leftAvatar={<TouchableOpacity style={styles.inlineIcons} onPress={() => { Actions.allmessages() }}>
    <Icon
      name="person-outline"
      type="AntDesign"
      color="gray"
    /><Text>1</Text>
  </TouchableOpacity>}
  rightAvatar={
    <TouchableOpacity onPress={() => { Actions.familyScreen() }}>
      <Icon
        name="settings"
        color="gray"
      />
    </TouchableOpacity>
  }
  title={'Muneeb Khan'}
/>
 <ListItem
 onPress={() => Actions.createCircleScreen()}
  containerStyle={{borderColor: 'lightgray',borderWidth: 1}}
  leftAvatar={{ source: { uri: 'https://cdn4.iconfinder.com/data/icons/keynote-and-powerpoint-icons/256/Plus-128.png' }, size: 30 }}
  title={'Create Circle'}
/>
        </View>}
      
    </View>
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
    dropMenu: {
      position: 'absolute',
      width: '100%',
      top: 80
    },
    inlineIcons: {
      display: 'flex',
      flexDirection: 'row',
    }
  })
  export default HeaderBar;