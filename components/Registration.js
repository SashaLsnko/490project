import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { TextField, NavigationLink, commonStyles } from './common';
import { setUserInfo } from '../utils'

const height = Dimensions.get('window').height; //full height

class RegistrationScreen extends React.Component {
    state= {
        email: "",
        password: "",
        confirmPassword: ""
    };

    sendConfirmationLink () {
        fetch('http://sls.alaca.ca/sendConfirmEmail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname: this.state.email,
            }),
        }).then((response) => {
            if (response.status === 200) {
                alert("We've sent you a confirmation email. Please check your inbox");
                setUserInfo(this.state.email, 'null', 'false');
                this.props.navigation.state.params.refreshFunction();
                this.props.navigation.navigate('Confirmation',
                    {refreshFunction: this.props.navigation.state.params.refreshFunction});
            } else {
                if (response.status === 400) {
                    alert("Oops, something went wrong. Are you sure you provided a valid email? Try again.");
                } else {
                    alert("Oops, something went wrong. Are you sure you provided a valid email? Try again.");
                }
            }
        })
            .catch(function(error) { alert(error) });
    }

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
                    this.sendConfirmationLink();
                } else {
                    if (response.status === 400) {
                        alert("Your Username already exists. Perhaps you would like to log in?", "",
                            [
                                {text: "Try Again"},
                                {text: "Login",
                                    onPress : () => this.props.navigation.navigate('Login',
                                        {refreshFunction: this.props.navigation.state.params.refreshFunction})},
                            ]);
                    } else alert("Oops, something went wrong. Check your Username and Password!")
                }
            })
            .catch(function(error) { alert(error) });
    }

    render() {

        const checkPassword = () => {
            const lowerCaseLetters = /[a-z]/g;
            const upperCaseLetters = /[A-Z]/g;
            const numbers = /[0-9]/g;
            const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/g;
            return (
                this.state.password.length > 7 &&
                lowerCaseLetters.test(this.state.password) &&
                upperCaseLetters.test(this.state.password) &&
                numbers.test(this.state.password) &&
                specialCharacters.test(this.state.password)
            );
        };

        const checkEmail = () => {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return reg.test(this.state.email);
        };

        const register = () =>{
            if (this.state.email && this.state.password
                && this.state.confirmPassword) {
                if (this.state.password === this.state.confirmPassword) {
                    if (checkPassword()) {
                        if (checkEmail()) {
                            this.sendUserInformation();
                        } else alert("Please register with a valid email")
                    }
                    else {
                      alert("Please make sure to include an upper-case letter, " +
                            "a number, and a special character");
                    }
                } else alert("The password in two fields should match")
            } else alert("please fill in email and password fields")
        };
        return (
            <ScrollView contentContainerStyle={styles.fields}>
                <Text style={styles.instructions}>
                    Please use a valid Email.
                    Password must include an upper-case letter,
                    a number, and a special character, and be longer than 7 characters
                </Text>
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
                <NavigationLink text='Already have an Account?'
                                navigate={ () => this.props.navigation.navigate('Login',
                                    {refreshFunction: this.props.navigation.state.params.refreshFunction}) }/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    fields: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: height*0.8,
        margin: 'auto',
        alignItems: "center"
    },
    instructions: {
        fontStyle: "italic",
        fontSize: 15,
        marginHorizontal: 20
    }
});

export default RegistrationScreen;
