import React, { Component } from "react";
import { Router, Stack, Scene, Tabs, Actions } from "react-native-router-flux";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Header, ListItem } from "react-native-elements";
// import { AsyncStorage } from "react-native";
import Axios from "axios";
import path from "../../config/Path";
import Provider from '../../config/Provider';
import {connect} from 'react-redux';
// import {updateCircledata} from '../../redux/actions/authActions'
import SlidingUpPanel from 'rn-sliding-up-panel';

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
      <View style={styles.containerStyle}>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'black',
    height: 200,
    width: '100%',
    position: 'absolute',
    bottom: 0,

  }
})


// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateCircledata: (data) => dispatch(updateCircledata(data))
//     }
// }

export default connect(null, null)(HeaderBar);