import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { NavigationLink, TextField, HorizontalSeparator, commonStyles } from "./common";
import { setUserInfo } from "../utils";

const height = Dimensions.get('window').height; //full height

class LoginScreen extends React.Component {
    state= {email : "",
            password: ""};

    sendUserInformation() {
        fetch('http://sls.alaca.ca/login', {
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
                        alert("Your Username or Password is incorrect");
                    } else
                        alert("Oops, something went wrong. Check your Username and Password!")
            })
            .catch(function(error) { alert(error) });
    }

    render() {
        const showAlert = (message) =>{
            Alert.alert( message )
        };
        const login = () =>{
            if (this.state.email && this.state.password) {
                this.sendUserInformation();
                this.state.password = "";
            } else {
                showAlert("please fill in username and password fields")
            }
        };
        return (
            <View>
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
                    <View style={{marginVertical: 20}}>
                        <Button title='Forgot your passowrd?'/>
                        <HorizontalSeparator/>
                        <NavigationLink text="Don't have an Account?"
                                        navigate={ () => this.props.navigation.navigate('Registration',
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

export default LoginScreen;