import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, commonStyles } from "./common";
import { SafeAreaView } from 'react-navigation';
import { isLoggedIn, isPaired } from '../utils';

const width = Dimensions.get('window').width; //full width

class HomeScreen extends React.Component {
    state = {
        loggedIn: true,
        paired: true
    };

    refreshUserInfo () {
        isLoggedIn().then(response => {
            this.setState({ loggedIn: response === 'true' })
        });
        isPaired().then(response => {
            this.setState({ paired: response === 'true' })
        });
    }

    componentDidMount() {
        this.refreshUserInfo();
    }

    componentWillUnmount() {
        alert("unmounted home");
    }

    render() {
        if (this.state.loggedIn && this.state.paired) {
            return (
                <SafeAreaView>
                    <View style={{alignItems: "center"}}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../assets/img/logo_home.png")}
                                style={styles.logo}/>
                        </View>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('DeviceSettings',
                                {refreshFunction: this.refreshUserInfo.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Manage Device</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('SettingsScreen',
                                {refreshFunction: this.refreshUserInfo.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}>
                            <Text style={commonStyles.buttonText}>About</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )
        } else if (this.state.loggedIn) {
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
                            onPress={() => this.props.navigation.navigate('PairingScreen',
                                {refreshFunction: this.refreshUserInfo.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Pair Device</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('SettingsScreen',
                                {refreshFunction: this.refreshUserInfo.bind(this)})}>
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
                                {refreshFunction: this.refreshUserInfo.bind(this)})}>
                            <Text style={commonStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => this.props.navigation.navigate('Registration',
                                {refreshFunction: this.refreshUserInfo.bind(this)})}>
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
    Fake
};
