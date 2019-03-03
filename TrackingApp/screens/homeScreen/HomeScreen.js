import { MapView as Map12, Notifications, Permissions, Location } from 'expo';
import React, { Component } from "react";
import MapView, { Circle, Polyline } from 'react-native-maps'
import { StyleSheet, Text, View } from 'react-native';
//Your Api Here
// import { api } from '../../Api/mapApi';
// import MapViewDirections from 'react-native-maps-directions';
// const GOOGLE_MAPS_APIKEY = api;



export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationResult: null,
            location: { coords: { latitude: 24.926294, longitude: 67.022095 } },
            marker: false,
            routes: null,
            coords: null,
            origin: null,
            destination: { latitude: 24.946294, longitude: 67.032095 }
        };
    }


    componentDidMount() {

        this._getLocationAsync();

    }




    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }
        // console.log("Working1");

        let location = await Location.getCurrentPositionAsync({});
        // console.log("Working2");
        // console.log(location);

        let cordss = { latitude: location.coords.latitude, longitude: location.coords.longitude }
        console.log("Working3", cordss);

        this.setState({ locationResult: JSON.stringify(location), location, marker: true, origin: cordss });
    };

    setMarkers() {
        return (
            < Circle
                draggable
                center={this.state.location.coords}
                title={"Current Location"}
                radius={100}
                strokeColor="#ffffff"
                fillColor="#3399ff"
                strokeWidth={2}
            >
            </ Circle>
        )
    }

    handleChange(userLocation) {
        console.log("User Location ===>", userLocation);
        let origin = { latitude: userLocation.latitude, longitude: userLocation.longitude };
        this.setState({ origin })
    }

    render() {
        const { location, marker, origin, destination } = this.state;
        console.log(" ====>>", location);
        return (
            <MapView
                showsUserLocation
                followsUserLocation
                onUserLocationonChange={(userLocation => this.handleChange(userLocation))}
                style={{ flex: 1 }}
                region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
            >
            </MapView>
        )
    }
}