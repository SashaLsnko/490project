import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button } from 'react-native';
import {HomeScreen, Fake, LoggedHome, PairedHome} from './components/Home';
import RegistrationScreen from './components/Registration';
import LoginScreen from './components/Login';
import PairingScreen from './components/Pairing';
import ManageDevice from './components/ManageDevice';
import SettingsScreen from './components/Settings'

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Registration: RegistrationScreen,
        Login: LoginScreen,
        Fake: Fake,

        LoggedHome: LoggedHome,
        PairedHome: PairedHome,
        PairingScreen: PairingScreen,
        ManageDevice: ManageDevice,
        SettingsScreen: SettingsScreen
    },
    {
      initialRouteName: "Fake"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}