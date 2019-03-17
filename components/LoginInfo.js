import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View,
    TouchableWithoutFeedback, ScrollView } from "react-native";
import {colors, TextField, commonStyles} from "./common";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { setUserInfo, userEmail } from "../utils";

const width = Dimensions.get('window').width; //full width

class ChangeEmailView extends React.Component {
    state= {
        password : "",
        newUsername : "",
        oldUsername : ""
    };

    changeUsername() {
        fetch('http://sls.alaca.ca/changeUsername', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldUname: this.state.oldUsername,
                newUname: this.state.newUsername,
                pass: this.state.password,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setUserInfo(this.state.newUsername, 'true');
                    this.props.refresh();
                    this.props.navigate();
                    alert("Username successfully changed!");
                } else
                    alert("Oops, something went wrong. Check your Username and Password!")
            })
            .catch(function(error) { alert(error) });
    }

    render() {

        userEmail().then(res => {
            if (res !== this.state.oldUsername) {
                this.setState({oldUsername: res})
            }
        });

        const prepareChangeUsername = () =>{
            this.changeUsername(this.state.username);
        };

        return (
            <View style={{...styles.changeInfoContainer, height: 200}}>
                <TextField
                    secure = {false}
                    placeholder="New Email"
                    onChangeFn={ (newUsername) => this.setState({newUsername: newUsername})}/>

                <TextField
                    secure = {true}
                    placeholder="Password"
                    onChangeFn={ (password) => this.setState({password: password})}/>

                <TouchableOpacity
                    style={commonStyles.submitButton}
                    onPress={() => prepareChangeUsername()}>
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
        confirmNewPassword : "",
        username : ""
    };

    changePassword() {
        fetch('http://sls.alaca.ca/changePassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname: this.state.username,
                oldPass: this.state.oldPassword,
                newPass: this.state.newPassword,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setUserInfo("", 'false');
                    this.props.refresh();
                    this.props.navigate();
                    alert("Please log in with your new password");
                } else
                if (response.status === 400) {
                    alert("Your Username or Password is incorrect");
                } else
                    alert("Oops, something went wrong. Check your Username and Password!")
            })
            .catch(function(error) { alert(error) });
    }

    render() {

        userEmail().then(res => {
            if (res !== this.state.username) {
                this.setState({username: res})
            }
        });

        const prepareChangePassword = () =>{
            this.changePassword();
        };

        return (
            <View style={{...styles.changeInfoContainer, height: 300}}>
                <TextField
                    secure = {true}
                    placeholder="Current Password"
                    onChangeFn={ (oldPassword) => this.setState({oldPassword: oldPassword})}/>
                <TextField
                    secure = {true}
                    placeholder="New Password"
                    onChangeFn={ (newPassword) => this.setState({newPassword: newPassword})}/>
                <TextField
                    secure = {true}
                    placeholder="Confirm New Password"
                    onChangeFn={ (password) => this.setState({confirmNewPassword: password})}/>
                <TouchableOpacity
                    style={commonStyles.submitButton}
                    onPress={() => prepareChangePassword()}>
                    <Text style={commonStyles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function ChangeEmail(props) {
    const display = props.display;
    if (display) {
        return <ChangeEmailView {...props}/>;
    }
    return <View/>;
}

function ChangePassword(props) {
    const display = props.display;
    if (display) {
        return <ChangePasswordlView {...props}/>;
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
    }
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
                    <ChangeEmail
                        display={this.state.displayEmailChange}
                        navigate={ () => this.props.navigation.navigate('Home')}
                        refresh={ () => this.props.navigation.state.params.refreshFunction()}/>
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
                    <ChangePassword
                        display={this.state.displayPasswordChange}
                        navigate={ () => this.props.navigation.navigate('Home')}
                        refresh={ () => this.props.navigation.state.params.refreshFunction()}/>
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
        display: 'flex',
        height: 140,
        marginTop: 15,
        marginBottom: 10

    }
});

export default LoginInfoScreen;