import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, commonStyles } from "./common";
import { SafeAreaView } from 'react-navigation';
import { isLoggedIn } from '../utils';

const width = Dimensions.get('window').width; //full width

class HomeScreen extends React.Component {
    state = {
        loggedIn: false
    };

    refreshLoggedIn () {
        isLoggedIn().then(response => {
            this.setState({ loggedIn: response === 'true' })
        })
    }

    componentDidMount() {
        this.refreshLoggedIn();
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <SafeAreaView>
                    <View style={{alignItems: 'center',}}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../assets/img/logo_home.png")}
                                style={styles.logo}/>
                        </View>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('DeviceSettings')}>
                            <Text style={commonStyles.buttonText}>Pair Device</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('SettingsScreen',
                                {refreshFunction: this.refreshLoggedIn.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}>
                            <Text style={commonStyles.buttonText}>About</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView>
                    <View style={{alignItems: 'center',}}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../assets/img/logo_home.png")}
                                style={styles.logo}/>
                        </View>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('Login',
                                {refreshFunction: this.refreshLoggedIn.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('Registration',
                                {refreshFunction: this.refreshLoggedIn.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}>
                            <Text style={commonStyles.buttonText}>About</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            );
        }
    }
}

class PairedHome extends React.Component {
    render() {
        return (
            <View style={{alignItems: "center"}}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/img/logo_home.png")}
                        style={styles.logo}/>
                </View>
                <TouchableOpacity
                    style={commonStyles.submitButton}>
                    <Text style={commonStyles.buttonText}>Manage Device</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.submitButton}>
                    <Text style={commonStyles.buttonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.submitButton}>
                    <Text style={commonStyles.buttonText}>About</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


class Fake extends React.Component {
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go Home"
                    onPress={() => navigate('Home')}
                />
                <Button
                    title="Go to Registration"
                    onPress={() => navigate('Registration')}
                />
                <Button
                    title="Go to Login"
                    onPress={() => navigate('Login')}
                />
                <Button
                    title="Go to Home when Logged in"
                    onPress={() => navigate('LoggedHome')}
                />
                <Button
                    title="Pair device"
                    onPress={() => navigate('PairingScreen')}
                />
                <Button
                    title="Go to Home when Paired"
                    onPress={() => navigate('PairedHome')}
                />
                <Button
                    title="Go to Manage Device"
                    onPress={() => navigate('ManageDevice')}
                />
                <Button
                    title="Go to Settings"
                    onPress={() => navigate('SettingsScreen')}
                />
                <Button
                    title="QR-Code Scanner"
                    onPress={() => navigate('QRScannerScreen')}
                />
                <Button
                    title="HTTP request example"
                    onPress={() => navigate('HTTPRequestScreen')}
                />
                <Button
                    title="Bluetooth example"
                    onPress={() => navigate('BluetoothScreen')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        height: 450,
        backgroundColor: colors.darkDarkPurle,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        marginBottom: 20
    },
    logo: {
        marginLeft: 30,
        marginBottom: 40,
        resizeMode: 'center'
    }
});

export {
    HomeScreen,
    Fake,
    PairedHome
};
