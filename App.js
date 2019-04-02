import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from "react-native-splash-screen";
import { HomeScreen, LoggedHome } from './components/Home';
import RegistrationScreen from './components/Registration';
import LoginScreen from './components/Login';
import PairingScreen from './components/Pairing';
import ManageDevice from './components/ManageDevice';
import SettingsScreen from './components/Settings';
import LoginInfoScreen from './components/LoginInfo';
import DeviceSettingsScreen from "./components/DeviceSettings";
import QRexample from "./components_unused/QRexample.js";
import HTTPexample from "./components_unused/HTTPexample.js";
import BLEexample from "./components_unused/BluetoothExample.js";
import GeolocationExample from "./components_unused/GeolocationExample.js";
import AESexample from "./components_unused/AESexample.js";
import ForgotPasswordScreen from "./components/forgotPassword";
import AboutScreen from "./components/About";
import ConfirmationScreen from "./components/Confirmation";

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
        ForgotPassword: {
            screen: ForgotPasswordScreen,
            navigationOptions: getHeader("Reset Password")
        },
        AboutScreen :{
            screen: AboutScreen,
            navigationOptions: getHeader("About")
        },
        Confirmation : {
            screen: ConfirmationScreen,
            navigationOptions: {
                header: null,
                headerBackTitle: null,
            }

        }
    },
    {
      initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

    componentDidMount() {
      if (SplashScreen !== null) {
        SplashScreen.hide();
      }
    }

    render() {
    return (
        <AppContainer/>
    )
  }
}
