import { MapView as Map12, Notifications, Permissions, Location } from 'expo';
import React, { Component } from "react";
import MapView, { Circle, Polyline, Marker } from 'react-native-maps'
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import authReducers from '../../redux/rootReducer';
import Axios from 'axios';
import path from '../../config/Path';
import Provider from '../../config/Provider';
import SocketIOClient from 'socket.io-client';


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
            usersArray: [],
            circleData: null,
            circleMembers: [],
            userData: null
        };
        this.socket = SocketIOClient(path.BASE_URL);
        this.onRecivedData = this.onRecivedData.bind(this);
    }



    componentDidMount() {
        Provider._asyncGetUserData().then(user => {
            console.log(user.fullName);
            this.setState({ userData: user });
        })


        this._getLocationAsync();
        setTimeout(() => {
            // this.setState({ destination: { latitude: 24.946294, longitude: 67.032095 } })
        }, 5000)

    }

    onRecivedData(locationData) {
        const { circleMembers } = this.state;
        console.log("Local Data ===>>>", locationData);
        console.log(circleMembers);
        let newArray = circleMembers.map(memberObj => {
            if (locationData.memberId == memberObj.memberId) {
                memberObj.latitude = locationData.latitude;
                memberObj.longitude = locationData.longitude;
                return memberObj;
            }
            return memberObj;
        })
        console.log(newArray);
        this.setState({ circleMembers: newArray });
    }


    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.circleData);
        this.setState({ circleData: nextProps.circleData, circleMembers: nextProps.circleData.circleMembers });
        this.socket.on(nextProps.circleData._id, this.onRecivedData);
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

    async  handleChange(userLocation) {
        const { userData, circleData } = this.state;
        try {

            console.log("User Location ===>", userLocation);
            // let origin = { latitude: userLocation.latitude, longitude: userLocation.longitude };
            // this.setState({ origin })
            // let LocationResponse = await Axios.post(path.UPDATE_LOCATION, { latitude: userLocation.latitude, longitude: userLocation.longitude, memberId: userData._id, circleId: circleData._id })

        } catch (err) {
            console.log(err.message);
        }
    }

    render() {
        const { location, marker, origin, destination, usersArray, circleMembers } = this.state;
        console.log(" ====>>", location);
        circleMembers.map((data, index) => {


            console.log("===>>>>> coreds", { latitude: data.latitude, longitude: data.longitude });


        })
        return (
            <MapView
                showsUserLocation
                followsUserLocation
                onMapReady={() => {
                    // this.showMarkers()
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
                {circleMembers.length > 1 && circleMembers.map((data, index) => {
                    return (
                        <Marker
                            key={Math.random().toString()}
                            coordinate={{ latitude: Number(data.latitude), longitude: Number(data.longitude) }}
                        />
                    )
                })}
            </MapView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        circleData: state.authReducers.data
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (user) => dispatch(updateUser(user))
//     }
// }

export default connect(mapStateToProps, null)(HomeScreen);
