/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component<{}> {
  watchId = null;

  state = {
    loading: false,
    updatesEnabled: false,
    base: { coords: {longitude: 0, latitude: 0}},
    location: {}
  };

  componentDidMount() {
    // set base in state
  }

  distance(lat1, lon1, lat2, lon2, unit) {
  	if ((lat1 == lat2) && (lon1 == lon2)) {
  		return 0;
  	}
  	else {
  		var radlat1 = Math.PI * lat1/180;
  		var radlat2 = Math.PI * lat2/180;
  		var theta = lon1-lon2;
  		var radtheta = Math.PI * theta/180;
  		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  		if (dist > 1) {
  			dist = 1;
  		}
  		dist = Math.acos(dist);
  		dist = dist * 180/Math.PI;
  		dist = dist * 60 * 1.1515;
  		if (unit=="K") { dist = dist * 1.609344 }
  		if (unit=="N") { dist = dist * 0.8684 }
  		return dist;
  	}
  }

  distance2(lat1, lon1, lat2, lon2){  // generally used geo measurement function
      var R = 6378.137; // Radius of earth in KM
      var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
      var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d * 1000; // meters
  }

  distance3(lat1, lon1, lat2, lon2) {
    return Math.abs(lat1-lat2) + Math.abs(lon1-lon2)
  }

  sendCommand(user, cmd) {
    fetch('https://sls.alaca.ca/saveCommands', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uname: user,
        command: cmd,
      }),
    })
    .then((response) => {
      //alert(JSON.stringify(response));
    })
    .catch(function(error) { alert(error) });
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      alert('Location permission denied by user.');
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      alert('Location permission revoked by user.');
    }

    return false;
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    //alert(this.state.base.coords.longitude);
    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false, base: position });
          alert('base set');
          //alert(this.state.base.coords.longitude);
          console.log(position);
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 0 }
      );
    });
  }

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          this.setState({ location: position });
          ret = this.distance3(position.coords.latitude,
                        position.coords.longitude,
                        this.state.base.coords.latitude,
                        this.state.base.coords.longitude);
          alert(ret);
          if( ret < 0.00005) {
            this.sendCommand('Desktop', 'unlock');
          } else {
            this.sendCommand('Desktop', 'lock');
          }
          console.log(position);
        },
        (error) => {
          this.setState({ location: error });
          console.log(error);
        },
        { enableHighAccuracy: true, distanceFilter: 0, interval: 2000, fastestInterval: 1000 }
      );
    });
  }

  removeLocationUpdates = () => {
      if (this.watchId !== null) {
          Geolocation.clearWatch(this.watchId);
          this.setState({ updatesEnabled: false })
      }
  }

  render() {
    const { loading, location, updatesEnabled } = this.state;
    return (
      <View style={styles.container}>
        <Button title='Get Location' onPress={this.getLocation} disabled={loading || updatesEnabled} />
        <View style={styles.buttons}>
            <Button title='Start Observing' onPress={this.getLocationUpdates} disabled={updatesEnabled} />
            <Button title='Stop Observing' onPress={this.removeLocationUpdates} disabled={!updatesEnabled} />
        </View>

        <View style={styles.result}>
            <Text>{JSON.stringify(location, null, 4)}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 12
  },
  result: {
      borderWidth: 1,
      borderColor: '#666',
      width: '100%',
      paddingHorizontal: 16
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 12,
      width: '100%'
  }
});
