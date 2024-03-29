import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { NavigationLink, TextField, HorizontalSeparator, commonStyles } from "./common";
import { setUserInfo } from "../utils";

const height = Dimensions.get('window').height; //full height

class LoginScreen extends React.Component {
    state= {email : "",
            password: ""};

    sendUserInformation() {
        fetch('https://sls.alaca.ca/login', {
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
                    setUserInfo(this.state.email, response._bodyText, 'true');
                    this.props.navigation.state.params.refreshFunction();
                    this.props.navigation.navigate('Home');
                } else
                    if (response.status === 400) {
                        alert("Your Username or Password is incorrect");
                    } else if (response.status == 401) {
                        alert("Please verify your email address");
                    } else
                        alert("Oops, something went wrong. Check your Username and Password!")
            })
            .catch(function(error) { alert(error) });
    }

    render() {
        const login = () =>{
            if (this.state.email && this.state.password) {
                this.sendUserInformation();
                this.state.password = "";
            } else {
                alert("please fill in username and password fields")
            }
        };

        return (
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={commonStyles.instructions}>Login to your account</Text>
                    <TextField
                        secure = {false}
                        placeholder="Email"
                        onChangeFn={ (email) => this.setState({email: email})}/>
                    <TextField
                        secure = {true}
                        placeholder="Password"
                        onChangeFn={ (password) => this.setState({password: password})}/>
                    <TouchableOpacity
                        style={commonStyles.submitButton}
                        onPress={() => login()}>
                        <Text style={commonStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={commonStyles.justifyCenter}
                        onPress={() => this.props.navigation.navigate('ForgotPassword',
                            {refreshFunction: this.props.navigation.state.params.refreshFunction})}>
                        <Text style={commonStyles.linkText}>Forgot your password?</Text>
                    </TouchableOpacity>

                    <HorizontalSeparator/>

                    <NavigationLink text="Don't have an Account?"
                                    navigate={ () => this.props.navigation.navigate('Registration',
                                        {refreshFunction: this.props.navigation.state.params.refreshFunction}) }/>

                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    formContainer: {
        margin: 'auto',
        alignItems: "center",
        display: 'flex',
        justifyContent: 'space-evenly',
        height: height*0.8
    },
    linksContainer: {
        margin: 'auto',
        alignItems: "center",
        display: 'flex'
    }
});

export default LoginScreen;
