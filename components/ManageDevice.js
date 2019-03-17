import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { commonStyles, PcInfo } from "./common";
import * as storage from "../utils";
import {AsyncStorage} from "react-native";
import AesCrypto from 'react-native-aes-kit';
import {decode as atob, encode as btoa} from 'base-64'
var aesjs = require('aes-js');

const width = Dimensions.get('window').width; //full width

class ManageDevice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        key: '',
        iv: '',
        pcName: '',
        cipher: ''
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
      this._getField('userEmail', (value) => {this.setState({ email: value })});
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

    sendEncryptedCommand(user, text) {
      return
      var key = this.state.key;
      var iv = this.state.iv;

      // Convert text to bytes (text must be a multiple of 16 bytes)
      var textBytes = aesjs.utils.utf8.toBytes(text);

      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var encryptedBytes = aesCbc.encrypt(textBytes);

      // To print or store the binary data, you may convert it to hex
      var cmd = aesjs.utils.hex.fromBytes(encryptedBytes);
      alert(cmd);

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

    pad(str) {
      extraChars = 16 - (str.length % 16);
      result = str + '|' + '0'.repeat(extraChars-1)
      alert(result.length)
      return result
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

    render() {
        return (
            <View>
                <View style={commonStyles.alignCenter}>
                    <Text  style={commonStyles.instructions}>You are connected to:</Text>
                    <PcInfo pcName={this.state.pcName}/>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => (alert(JSON.stringify(this.state)))}>
                            <Image
                                source={require("../assets/img/lock_button.png")}
                                style={styles.lockButtons}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => (this.sendEncryptedCommand('Desktop',this.pad('lock')))}>
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
                </View>
            </View>
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
