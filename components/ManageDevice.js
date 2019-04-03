import React from "react";
import {Dimensions, Image, StyleSheet, Button,
   Text, TouchableOpacity, View, Platform, ScrollView} from "react-native";
import { commonStyles, PcInfo } from "./common";
import * as storage from "../utils";
import {AsyncStorage} from "react-native";
import AesCrypto from 'react-native-aes-kit';
import {decode as atob, encode as btoa} from 'base-64'
var aesjs = require('aes-js');
var unixTime = require('unix-time');
import Geolocation from 'react-native-geolocation-service';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height;

class ManageDevice extends React.Component {
    constructor(props) {
      super(props);
      this.watchId = null;
      this.pcState = null;
      this.inRangeCount = 1;
      this.outRangeCount = 1;
      this.statusPoll = null;
      this.state = {
        email: '',
        token: '',
        key: '',
        iv: '',
        pcName: '',
        cipher: '',
        baseLat: null,
        baseLon: null,
        updatesEnabled: false,
        loading: false,
        location: {},
        battery: 0,
        status: "unlocked"
       };
    }

    _getField = async (field, callback) => {
      try {
        const value = await AsyncStorage.getItem(field);
        if (value !== null) {
          // We have data!!
          callback(value);
        }
      } catch (error) {
        // Error retrieving data
        //alert(error);
      }
    };

    componentDidMount() {
      // GET PC STATE!!!!!!!!!!!!!!!!! (POLL)
      this._getField('latitude', (lat) => {
        this._getField('longitude', (lon) => {
          this.setState({baseLat: lat, baseLon: lon}, () => {
            //this.getLocationUpdates();
          });
        });
      });
      this._getField('userEmail', (email) => {this.setState({ email: email })});
      this._getField('userToken', (token) => {
        //alert(token);
        this.setState({ token: token }, () => {
          this.getPCStatus(this.state.token);
          this.statusPoll = setInterval(() => {
            this.getPCStatus(this.state.token);
          }, 5000);
        });
      });
      this._getField('key', (value) => {
        key = value.split('+').map(Number);
        this.setState({ key: key });
      });
      this._getField('iv', (value) => {
        iv = value.split('+').map(Number);
        this.setState({ iv: iv });
      });
      this._getField('pcName', (value) => {this.setState({ pcName: value })});


    }

    componentWillUnmount() {
      this.removeLocationUpdates();
      clearInterval(this.statusPoll);
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

    getLocationUpdates = async () => {
      const hasLocationPermission = await this.hasLocationPermission();

      if (!hasLocationPermission) return;

      this.setState({ updatesEnabled: true }, () => {
        this.watchId = Geolocation.watchPosition(
          (position) => {
            //alert(JSON.stringify(position));
            this.setState({ location: position });
            ret = this.geoDistance(position.coords.latitude,
                          position.coords.longitude,
                          this.state.baseLat,
                          this.state.baseLon);
            //alert(ret); // distance between base and phone
            if( ret < 0.005) {
              this.inRangeCount += 1;
              this.outRangeCount = 1;
              if (this.inRangeCount % 5 == 0) {
                this.sendEncryptedCommand(this.state.email,'unlock');
              }
              // only send if previous command was not the same
              //this.sendEncryptedCommand(this.state.email,'unlock');
              // if (this.pcState!='unlocked') {
              //   this.sendEncryptedCommand(this.state.email,'unlock');
              // }
            } else {
              this.outRangeCount += 1;
              this.inRangeCount = 1;
              if (this.outRangeCount % 5 == 0) {
                this.sendEncryptedCommand(this.state.email,'lock');
              }
              // only send if previous command was not the same
              //this.sendEncryptedCommand(this.state.email,'lock');
              // if (this.pcState!='locked') {
              //   this.sendEncryptedCommand(this.state.email,'lock');
              // }
            }
            console.log(position);
          },
          (error) => {
            this.setState({ location: error });
            console.log(error);
          },
          { enableHighAccuracy: true, distanceFilter: 0, interval: 1000, fastestInterval: 500 }
        );
      });
    }

    removeLocationUpdates = () => {
        if (this.watchId !== null) {
          alert(this.watchId);
            Geolocation.clearWatch(this.watchId);
            this.setState({ updatesEnabled: false })
        }
    }

    encryptDecrypt3() {
      // An example 128-bit key
      var key = this.state.key;//[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

      // The initialization vector (must be 16 bytes)
      var iv = this.state.iv;//[ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];

      // Convert text to bytes (text must be a multiple of 16 bytes)
      var text = 'hello000hello000';
      var textBytes = aesjs.utils.utf8.toBytes(text);

      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var encryptedBytes = aesCbc.encrypt(textBytes);

      // To print or store the binary data, you may convert it to hex
      var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
      alert(encryptedHex);
      // "104fb073f9a131f2cab49184bb864ca2"

      // When ready to decrypt the hex string, convert it back to bytes
      var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

      // The cipher-block chaining mode of operation maintains internal
      // state, so to decrypt a new instance must be instantiated.
      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var decryptedBytes = aesCbc.decrypt(encryptedBytes);

      // Convert our bytes back into text
      var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
      tmt = setTimeout(() => {
        alert(decryptedText);
      }, 2000);
    }

    sendEncryptedCommand(tok, text) {
      text = this.pad(text + '|' + unixTime(new Date()));

      var key = this.state.key;
      var iv = this.state.iv;

      // Convert text to bytes (text must be a multiple of 16 bytes)
      var textBytes = aesjs.utils.utf8.toBytes(text);

      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var encryptedBytes = aesCbc.encrypt(textBytes);

      // To print or store the binary data, you may convert it to hex
      var cmd = aesjs.utils.hex.fromBytes(encryptedBytes);
      // alert(JSON.stringify({
      //   token: tok,
      //   command: cmd,
      // }));
      fetch('https://sls.alaca.ca/saveCommands', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: tok,
          command: cmd,
        }),
      })
      .then((response) => {
        //alert(JSON.stringify(response));
        // POLL SERVER FOR PCSTATE HERE (for like 30 seconds?)
        // UPDATE pcState accordingly
      })
      .catch(function(error) { alert(error) });
    }

    pad(str) {
      extraChars = 16 - (str.length % 16);
      result = str + '|' + '0'.repeat(extraChars-1)
      return result
    }

    geoDistance(lat1, lon1, lat2, lon2) {
      return Math.abs(lat1-lat2) + Math.abs(lon1-lon2)
    }

    geoDistance2(lat1, lon1, lat2, lon2){  // generally used geo measurement function
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
        alert(JSON.stringify(response));
      })
      .catch(function(error) { alert(error) });
    }

    getPCStatus(tok) {
      fetch('https://sls.alaca.ca/checkStatus', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: tok
        }),
      })
      .then((response) => {
        plaintext = response._bodyText;
        listResponse = plaintext.slice(1,plaintext.length-1).split(",");
        status = (listResponse[0]=='"false"') ? "unlocked" : "locked";
        battery = parseInt(listResponse[1].slice(1,listResponse[1].length-1));
        this.setState({battery: battery, status: status});
      })
      .catch(function(error) { alert(error) });
    }

    render() {
        return (
            <ScrollView>
                <Text>{this.state.email}</Text>
                <View style={commonStyles.alignCenter}>
                    <Text  style={commonStyles.instructions}>You are connected to:</Text>
                    <PcInfo pcName={this.state.pcName} battery={this.state.battery} status={this.state.status}/>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => (this.sendEncryptedCommand(this.state.token,'lock'))}>
                            <Image
                                source={require("../assets/img/lock_button.png")}
                                style={styles.lockButtons}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (this.sendEncryptedCommand(this.state.token,'unlock'))}>
                            <Image
                                source={require("../assets/img/unlock_button.png")}
                                style={styles.lockButtons}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={commonStyles.submitButton}
                        onPress={() => this.props.navigation.navigate('SettingsScreen')}>
                        <Text style={commonStyles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[commonStyles.submitButton, {marginTop: height*0.5, marginBottom: 50}]}
                        onPress={() => this.getLocationUpdates()}>
                        <Text style={commonStyles.buttonText}>Enable Geolocation</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    lockButtons: {
        height: width/2.5,
        width: width/2.5,
        marginHorizontal: 10,
        marginVertical: 30,
        marginTop: 50
    }
});

export default ManageDevice;
