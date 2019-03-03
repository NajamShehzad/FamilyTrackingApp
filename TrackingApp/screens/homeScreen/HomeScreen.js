import { MapView as Map12, Notifications, Permissions, Location } from 'expo';
import React, { Component } from "react";
import MapView, { Circle, Polyline, Marker } from 'react-native-maps'
import { StyleSheet, Text, View } from 'react-native';
import { connenct } from 'react-redux';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationResult: null,
            location: { coords: { latitude: 24.926294, longitude: 67.022095 } },
            marker: false,
            routes: null,
            coords: null,
            origin: null,
            destination: null,
            usersArray: []
        };
    }


    componentDidMount() {

        this._getLocationAsync();
        setTimeout(() => {
            // this.setState({ destination: { latitude: 24.946294, longitude: 67.032095 } })
        }, 5000)

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
    showMarkers() {
        this.setState({
            usersArray: [
                { destination: { latitude: 24.986194, longitude: 67.092095 } },
                { destination: { latitude: 24.941293, longitude: 67.031095 } },
                { destination: { latitude: 24.946293, longitude: 67.032094 } },
                { destination: { latitude: 24.976274, longitude: 67.037095 } },
                { destination: { latitude: 24.946864, longitude: 67.032095 } },
                { destination: { latitude: 24.946998, longitude: 67.085095 } },
                { destination: { latitude: 24.946291, longitude: 67.085095 } },
            ]
        })
    }

    handleChange(userLocation) {
        console.log("User Location ===>", userLocation);
        let origin = { latitude: userLocation.latitude, longitude: userLocation.longitude };
        this.setState({ origin })
    }

    render() {
        const { location, marker, origin, destination, usersArray } = this.state;
        console.log(" ====>>", location);
        return (
            <MapView
                showsUserLocation
                followsUserLocation
                onMapReady={() => {
                    this.showMarkers()
                }}
                onUserLocationonChange={(userLocation => this.handleChange(userLocation))}
                style={{ flex: 1 }}
                region={{ latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
            >
                {destination &&
                    <Marker
                        coordinate={destination}
                    />
                }
                {usersArray.map((data, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={data.destination}
                        />
                    )
                })}
            </MapView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.authReducers.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
