import React from "react";
import { AsyncStorage } from 'react-native';

export default class Provider {
  static _asyncGetUserData = async () => {
    try {
      let user = await AsyncStorage.getItem("userData");
      return JSON.parse(user)
    } catch (er) {
      return false;
    }
  }
}