import React from "react";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View,
    Alert } from "react-native";
import {NavigationLink, TextField, HorizontalSeparator, commonStyles} from "./common";
import {setUserInfo} from "../utils";

const height = Dimensions.get('window').height; //full height

class LoginScreen extends React.Component {
    state= {email : "",
            password: ""};
    render() {
        const showAlert = (message) =>{
            Alert.alert( message )
        };
        const login = () =>{
            if (this.state.email && this.state.password) {
                setUserInfo(this.state.email, this.state.password, 'true');
                this.props.navigation.state.params.refreshFunction();
                this.props.navigation.navigate('Home');
            } else {
                showAlert("please fill in username and password fields")
            }
        };
        return (
            <View>
                <View style={styles.formContainer}>
                    <Text style={commonStyles.instructions}>Login to your account</Text>
                    <TextField
                        placeholder="Email"
                        onChangeFn={ (email) => this.setState({email: email})}/>
                    <TextField
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