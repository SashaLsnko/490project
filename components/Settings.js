import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";
import { colors, commonStyles } from "./common";
import { setUserInfo } from "../utils";

const width = Dimensions.get('window').width; //full width

class SettingsScreen extends React.Component {
    state = {bluetoothVal : false};

    render() {
        const logOut = () => {
            setUserInfo("", 'false');
            this.props.navigation.state.params.refreshFunction();
            this.props.navigation.navigate('Home');
        };

        return (
            <View style={{ flex: 1 }}>
                <View style={ styles.pageView }>
                    <View style={ styles.settingOption }>
                        <View style={ styles.proximityTextContainer }>
                            <Text style={ styles.description }>
                                Proximity authentication
                            </Text>
                            <Button
                                style={ styles.explanationBtn }
                                title='What is this?'
                            />
                        </View>
                        <Switch
                            trackColor={{ true: colors.lightPurple }}
                            thumbColor={ colors.darkDarkPurle }
                            value={ this.state.bluetoothVal }
                            onValueChange={ (value) => this.setState({ bluetoothVal: value })} />
                    </View>
                    <TouchableOpacity
                        style={ styles.settingOption }
                        onPress={ () => this.props.navigation.navigate('LoginInfo',
                            {refreshFunction: this.props.navigation.state.params.refreshFunction}) }>

                        <View style={ styles.proximityTextContainer }>
                            <Text style={ styles.description }>
                                Login Information
                            </Text>
                        </View>
                        <Button title='>'/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ styles.settingOption }
                        onPress={ () => this.props.navigation.navigate('DeviceSettings') }>
                        <View style={ styles.proximityTextContainer }>
                            <Text style={ styles.description }>
                                Devices Information
                            </Text>
                        </View>
                        <Button title='>'/>
                    </TouchableOpacity>
                </View>
                <View style={ styles.logoutBtnContainer }>
                    <TouchableOpacity
                        style={styles.logOutButton}
                        onPress={ () => logOut() }>
                        <Text style={commonStyles.buttonText}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        fontSize: 18,
        lineHeight: 40
    },
    explanationBtn: {
        marginLeft: 0,
        paddingLeft: 0,
        backgroundColor: 'red',
        textAlign: 'left'
    },
    proximityTextContainer: {
        alignItems: 'flex-start',
        textAlign: 'left',
        flexDirection: 'column',
        width: 200
    },
    settingOption: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    pageView: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    logOutButton: {
        justifyContent: 'center',
        backgroundColor: colors.darkPurple,
        borderRadius: 20,
        height: 50,
        marginVertical: 20,
        width: width - 40,
        marginHorizontal: 20
    },
    logoutBtnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    }
});

export default SettingsScreen;