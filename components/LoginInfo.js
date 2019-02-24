import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View,
    TouchableWithoutFeedback, ScrollView } from "react-native";
import {colors, TextField, commonStyles} from "./common";
import FontAwesome, { Icons } from 'react-native-fontawesome';

const width = Dimensions.get('window').width; //full width

class ChangeEmailView extends React.Component {
    state= {username : ""};
    render() {
        return (
            <View style={styles.changeInfoContainer}>
                <TextField
                    placeholder="New Email"
                    onChangeFn={ (username) => this.setState({username: username})}/>
                <TouchableOpacity
                    style={[
                        commonStyles.submitButton,
                        {marginVertical: 0,
                        marginBottom: 20}]}>
                    <Text style={commonStyles.buttonText}>Change Email</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class ChangePasswordlView extends React.Component {
    state= {
        oldPassword : "",
        newPassword : "",
        confirmNewPassword : ""
    };
    render() {
        return (
            <View style={styles.changeInfoContainer}>
                <TextField
                    placeholder="Current Password"
                    onChangeFn={ (oldPassword) => this.setState({oldPassword: oldPassword})}/>
                <TextField
                    placeholder="New Password"
                    onChangeFn={ (newPassword) => this.setState({newPassword: newPassword})}/>
                <TextField
                    placeholder="Confirm New Password"
                    onChangeFn={ (password) => this.setState({confirmNewPassword: password})}/>
                <TouchableOpacity
                    style={[
                        commonStyles.submitButton,
                        {
                            marginVertical: 0,
                            marginBottom: 20,
                            marginTop: 10
                        }]}>
                    <Text style={commonStyles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function ChangeEmail(props) {
    const display = props.display;
    if (display) {
        return <ChangeEmailView/>;
    }
    return <View/>;
}

function ChangePassword(props) {
    const display = props.display;
    if (display) {
        return <ChangePasswordlView/>;
    }
    return <View/>;
}

class ExpandIcon extends React.Component {
    state= {username : ""};
    render() {
        return (
            <View>
                <FontAwesome
                    style={styles.links}>
                    {Icons.chevronDown}</FontAwesome>
            </View>
        )
    }
}

class CollapseIcon extends React.Component {
    state= {username : ""};
    render() {
        return (
            <View>
                <FontAwesome
                    style={styles.links}>
                    {Icons.chevronUp}</FontAwesome>
            </View>
        )
    }
}

function ExpandCollapseIcon(props) {
    const displayContent = props.displayContent;
    if (displayContent) {
        return <CollapseIcon/>;
    } else {
        return <ExpandIcon/>;
    };
}

class LoginInfoScreen extends React.Component {
    state = {
        displayEmailChange : false,
        displayPasswordChange : false};
    render() {
        return (
            <ScrollView>
                <View style={styles.pageView}>
                    <TouchableWithoutFeedback
                        style={styles.settingOption}
                        onPress={ () =>
                            this.setState(prevState => ({displayEmailChange: !prevState.displayEmailChange}))}>
                        <View style={styles.settingOption}>
                            <Text style={styles.description}>
                                Change Email
                            </Text>
                            <ExpandCollapseIcon displayContent={this.state.displayEmailChange}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <ChangeEmail display={this.state.displayEmailChange}/>
                    <TouchableOpacity
                        style={styles.settingOption}
                        onPress={ () =>
                            this.setState(prevState => ({displayPasswordChange: !prevState.displayPasswordChange}))}
                    >
                        <View style={styles.proximityTextContainer}>
                            <Text style={styles.description}>
                                Change Password
                            </Text>
                        </View>
                        <ExpandCollapseIcon displayContent={this.state.displayPasswordChange}/>
                    </TouchableOpacity>
                    <ChangePassword display={this.state.displayPasswordChange}/>
                </View>
            </ScrollView>
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
    links: {
        color: colors.baseBlue,
        marginTop: 12
    },
    changeInfoContainer: {
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,

    }
});

export default LoginInfoScreen;