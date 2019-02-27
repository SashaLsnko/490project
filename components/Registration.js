import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { TextField, NavigationLink, commonStyles } from './common';
import { setUserInfo } from '../utils'

const height = Dimensions.get('window').height; //full height

class RegistrationScreen extends React.Component {
    state= {
        username : "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    sendUserInformation() {
        fetch('http://sls.alaca.ca/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname: this.state.email,
                pass: this.state.password,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setUserInfo(this.state.email, 'true');
                    this.props.navigation.state.params.refreshFunction();
                    this.props.navigation.navigate('Home');
                } else
                    if (response.status === 400) {
                        Alert.alert("Your Username already exists. Perhaps you would like to log in?", "",
                            [
                                {text: "Try Again"},
                                {text: "Login",
                                onPress : () => this.props.navigation.navigate('Login',
                                {refreshFunction: this.props.navigation.state.params.refreshFunction})},
                            ]);
                    } else
                        alert("Oops, something went wrong. Check your Username and Password!")
            })
            .catch(function(error) { alert(error) });
    }

    render() {
        const showAlert = (message) =>{
            Alert.alert( message )
        };
        const register = () =>{
            if (this.state.username && this.state.email && this.state.password
                && this.state.confirmPassword) {
                if (this.state.password === this.state.confirmPassword) {
                    this.sendUserInformation(this.state.email, this.state.password);
                } else {
                    showAlert("The password in two fields should match")
                }
            } else {
                showAlert("please fill in username and password fields")
            }
        };
        return (
            <View>
                <View style={styles.formContainer}>
                    <Text style={{...commonStyles.instructions, lineHeight: 20, marginVertical: 15}}>
                        Create your account</Text>
                    <TextField
                        secure = {false}
                        placeholder="Full Name"
                        onChangeFn={ (username) => this.setState({username: username})}/>
                    <TextField
                        secure = {false}
                        placeholder="Email"
                        onChangeFn={ (email) => this.setState({email: email})}/>
                    <TextField
                        secure = {true}
                        placeholder="Password"
                        onChangeFn={ (password) => this.setState({password: password})}/>
                    <TextField
                        secure = {true}
                        placeholder="Confirm Password"
                        onChangeFn={ (confirmPassword) => this.setState({confirmPassword: confirmPassword})}/>
                    <TouchableOpacity
                        style={commonStyles.submitButton}
                        onPress={ () => register() }>
                        <Text style={commonStyles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                    <View style={{marginVertical: 20}}>
                        <NavigationLink text='Already have an Account?'
                                        navigate={ () => this.props.navigation.navigate('Login',
                                            {refreshFunction: this.props.navigation.state.params.refreshFunction}) }/>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    formContainer: {
        height: height,
        paddingTop: 30,
        alignItems: "center"
    }
});

export default RegistrationScreen;