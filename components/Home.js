import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { colors, commonStyles } from "./common";
import { SafeAreaView } from 'react-navigation';
import { isLoggedIn, isPaired } from '../utils';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

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

    render() {
        if (this.state.loggedIn && this.state.paired) {
            return (
                <SafeAreaView>
                    <View style={commonStyles.alignCenter}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../assets/img/logo_home.png")}
                                style={styles.logo}/>
                        </View>
                        <View style={styles.homeButtons}>
                            <TouchableOpacity
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('ManageDevice',
                                    {refreshFunction: this.refreshUserInfo.bind(this)})}>
                                <Text style={commonStyles.buttonText}>Manage Device</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('PairingScreen')}>
                                <Text style={commonStyles.buttonText}>Pair</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('SettingsScreen',
                                    {
                                        refreshFunction: this.refreshUserInfo.bind(this),
                                        paired: this.state.paired
                                    })}>
                                <Text style={commonStyles.buttonText}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )
        } else if (this.state.loggedIn) {
            return (
                <SafeAreaView>
                    <View style={commonStyles.alignCenter}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../assets/img/logo_home.png")}
                                style={styles.logo}/>
                        </View>
                        <View style={styles.homeButtons}>
                            <TouchableOpacity
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('PairingScreen',
                                    {refreshFunction: this.refreshUserInfo.bind(this)})}>
                                <Text style={commonStyles.buttonText}>Pair Device</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('SettingsScreen',
                                    {
                                        refreshFunction: this.refreshUserInfo.bind(this),
                                        paired: this.state.paired
                                    })}>
                                <Text style={commonStyles.buttonText}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('AboutScreen')}>
                                <Text style={commonStyles.buttonText}>About</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <SafeAreaView>
                    <View style={commonStyles.alignCenter}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../assets/img/logo_home.png")}
                                style={styles.logo}/>
                        </View>
                        <View style={styles.homeButtons}>
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
                                style={commonStyles.submitButton}
                                onPress={() => this.props.navigation.navigate('AboutScreen')}>
                                <Text style={commonStyles.buttonText}>About</Text>
                            </TouchableOpacity>
                        </View>
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
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "black"
            }}>
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
                <Button
                    title="Geolocation example"
                    onPress={() => navigate('GeolocationScreen')}
                />
                <Button
                    title="AES example"
                    onPress={() => navigate('EncryptionScreen')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        height: height*0.6,
        backgroundColor: colors.darkDarkPurle,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0
    },
    logo: {
        marginLeft: 30,
        marginBottom: 40,
        resizeMode: 'center'
    },
    homeButtons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: height*0.35
    }
});

export {
    HomeScreen,
    Fake
};
