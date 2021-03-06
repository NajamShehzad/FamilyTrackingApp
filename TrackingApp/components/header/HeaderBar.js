import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Actions } from "react-native-router-flux";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Header, ListItem } from "react-native-elements";
import { AsyncStorage } from "react-native";
import Axios from "axios";
import path from "../../config/Path";
import Provider from '../../config/Provider';
import {connect} from 'react-redux';
import {updateCircledata} from '../../redux/actions/authActions' 

class HeaderBar extends Component {

  state = {
    dropMenu: false,
    userData: null,
    circleArray: []
  }
  componentDidMount() {
    Provider._asyncGetUserData().then(res => {
      this.setState({ userData: res },() => {
        this.getAllCircles();
      })
    })
  }

  getAllCircles = async () => {
    try {
      const { userData } = this.state;
      let circleData = await Axios.post(path.GET_ALL_CIRCLES, { userId: userData._id });
      console.log(circleData.data);
      if (circleData.data.success) {
        return this.setState({ circleArray: circleData.data.data })
      }

    } catch (err) {
      console.log(err)
    }
  }



  render() {
    const { dropMenu, circleArray } = this.state;
    return (
      <View>
        <Header
          containerStyle={styles.containerStyle}
          backgroundColor="white"
          leftComponent={
            <TouchableOpacity onPress={() => { Actions.drawerOpen() }}>
              <Icon
                name="menu"
                size={40}
                color="gray"
              />
            </TouchableOpacity>

          }
          centerComponent={<TouchableOpacity onPress={() => this.setState({ dropMenu: !dropMenu },() => {this.getAllCircles()})} style={styles.inlineIcons}><Text style={{ fontSize: 25, marginRight: 5 }}>Family</Text>
            <Icon
              name={`${dropMenu ? 'angle-up' : 'angle-down'}`}
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
          {circleArray.length > 0 && circleArray.map((val, index) =>
            <ListItem
            onPress={() => {this.props.updateCircledata(val)}}
              key={index}
              containerStyle={{ borderColor: 'lightgray', borderBottomWidth: 1 }}
              leftAvatar={<TouchableOpacity style={styles.inlineIcons}>
                <Icon
                  name="person-outline"
                  type="AntDesign"
                  color="gray"
                /><Text>{val.circleMembers.length}</Text>
              </TouchableOpacity>}
              rightAvatar={
                <TouchableOpacity onPress={() => { Actions.familyScreen({ circleData: val }) }}>
                  <Icon
                    name="settings"
                    color="gray"
                  />
                </TouchableOpacity>
              }
              title={val.circleName}
            />
          )}
          <ListItem
            onPress={() => Actions.createCircleScreen()}
            containerStyle={{ borderColor: 'lightgray', borderWidth: 1 }}
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


const mapDispatchToProps = (dispatch) => {
    return {
        updateCircledata: (data) => dispatch(updateCircledata(data))
    }
}

export default connect(null, mapDispatchToProps)(HeaderBar);