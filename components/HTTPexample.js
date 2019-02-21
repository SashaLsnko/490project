import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

class HTTPexample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'default_user',
      password: 'default_pass'
     };
  }
  sendUserInformation() {
    fetch('http://35.183.241.127/tester.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
    .then((response) => {
      response.json().then(val => {
        alert(JSON.stringify(response));
        tmt = setTimeout(() => {
          alert(JSON.stringify(val));
        }, 4000);
      })
    })
    .catch(function(error) { alert(error) });
  }

  render() {
    return (
      <View style={{backgroundColor: '#ffffff', flex:1, justifyContent: 'flex-start'}}>
        <Text>Sending to IP: 35.183.241.127</Text>
        <TextInput
          style={{height: 40, borderColor: '#841584', borderWidth: 4, backgroundColor:'#EEEEEE', marginTop:10}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40, borderColor: '#841584', borderWidth: 4, backgroundColor:'#EEEEEE', marginTop:10, marginBottom:10}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button
          onPress={this.sendUserInformation.bind(this)}
          title="Send User Information"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

export default HTTPexample;
