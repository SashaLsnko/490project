import React, { Component } from 'react';
import { Text, View, Button, TextInput, NativeModules } from 'react-native';
import AesCrypto from 'react-native-aes-kit';

class AESexample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'defaultkey123456',
      plaintext: 'default_plaintext',
      cipher: ''
     };
  }

  encryptDecrypt() {
    const plaintext = this.state.plaintext;
    const secretKey = this.state.key;
    const iv = '1112131415161718';
    var holder = '';

    AesCrypto.encrypt(plaintext,secretKey,iv).then(cipher=>{
        alert(cipher);
        this.setState({ cipher });

        tmt = setTimeout(() => {
          AesCrypto.decrypt(this.state.cipher,secretKey,iv).then(plaintext=>{
              alert(plaintext);
          }).catch(err=>{
              alert(err);
          });
        }, 2000);

    }).catch(err=>{
        alert(err);
    });
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffffff', flex:1, justifyContent: 'flex-start'}}>
        <Text>Performing Encrypt Decrypt</Text>
        <TextInput
          style={{height: 40, borderColor: '#841584', borderWidth: 4, backgroundColor:'#EEEEEE', marginTop:10}}
          onChangeText={(key) => this.setState({key})}
          value={this.state.key}
        />
        <TextInput
          style={{height: 40, borderColor: '#841584', borderWidth: 4, backgroundColor:'#EEEEEE', marginTop:10, marginBottom:10}}
          onChangeText={(plaintext) => this.setState({plaintext})}
          value={this.state.plaintext}
        />
        <Button
          onPress={this.encryptDecrypt.bind(this)}
          title="Encrypt Decrypt"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default AESexample;
