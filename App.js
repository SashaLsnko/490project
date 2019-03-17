import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, Fake, LoggedHome } from './components/Home';
import RegistrationScreen from './components/Registration';
import LoginScreen from './components/Login';
import PairingScreen from './components/Pairing';
import ManageDevice from './components/ManageDevice';
import SettingsScreen from './components/Settings';
import LoginInfoScreen from './components/LoginInfo';
import DeviceSettingsScreen from "./components/DeviceSettings";
import QRexample from "./components/QRexample.js";
import HTTPexample from "./components/HTTPexample.js";
import BLEexample from "./components/BluetoothExample.js";
import GeolocationExample from "./components/GeolocationExample.js";
import AESexample from "./components/AESexample.js";
import ForgotPasswordScreen from "./components/forgotPassword";
import AboutScreen from "./components/About";

import { colors } from "./components/common";

let getHeader = (title) => {
    return {
        headerTitle: title,
        headerStyle: {
            backgroundColor: "white"
        },
        headerTitleStyle: {
            fontWeight: "bold",
            color: colors.darkPurple,
            zIndex: 1,
            fontSize: 18,
            lineHeight: 23
        },
        headerTintColor: colors.darkDarkPurle,
        headerBackTitle: null,
        animationEnabled: true
    }
};

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null,
                headerBackTitle: null,
            }
        },
        Registration: {
            screen: RegistrationScreen,
            navigationOptions: getHeader("Registration")
        },
        Login: {
            screen:LoginScreen,
            navigationOptions: getHeader("Login")
        },
        Fake: {
            screen: Fake
        },
        LoginInfo: {
            screen: LoginInfoScreen,
            navigationOptions: getHeader("Login Info")
        },
        DeviceSettings: {
            screen: DeviceSettingsScreen,
            navigationOptions: getHeader("Device Settings")
        },
        PairingScreen: {
            screen: PairingScreen,
            navigationOptions: getHeader("Device Pairing")
        },
        ManageDevice: {
            screen: ManageDevice,
            navigationOptions: getHeader("Manage Device")
        },
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: getHeader("Settings")
        },
        QRScannerScreen: {
            screen: QRexample,
            navigationOptions: getHeader("QR example")
        },
        HTTPRequestScreen: {
            screen: HTTPexample,
            navigationOptions: getHeader("HTTP example")
        },
        BluetoothScreen: {
          screen: BLEexample,
          navigationOptions: getHeader("Bluetooth example")
        },
        GeolocationScreen: {
          screen: GeolocationExample,
          navigationOptions: getHeader("Geolocation example")
        },
        EncryptionScreen: {
          screen: AESexample,
          navigationOptions: getHeader("AES example")
        },
        ForgotPassword: {
            screen: ForgotPasswordScreen,
            navigationOptions: getHeader("Reset Password")
        },
        AboutScreen :{
            screen: AboutScreen,
            navigationOptions: getHeader("About")
        }
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
