import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert} from "react-native";
import {TextField, NavigationLink, commonStyles} from './common';
import { setUserInfo } from '../utils'

const height = Dimensions.get('window').height; //full height

class RegistrationScreen extends React.Component {
    state= {
        username : "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    render() {
        const showAlert = (message) =>{
            Alert.alert( message )
        };
        const register = () =>{
            if (this.state.username && this.state.email && this.state.password
                && this.state.confirmPassword) {
                if (this.state.password === this.state.confirmPassword) {
                    setUserInfo(this.state.email, this.state.password, 'true');
                    this.props.navigation.state.params.refreshFunction();
                    this.props.navigation.goBack();

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
                        placeholder="Full Name"
                        onChangeFn={ (username) => this.setState({username: username})}/>
                    <TextField placeholder="Email"
                               onChangeFn={ (email) => this.setState({email: email})}/>
                    <TextField placeholder="Password"
                               onChangeFn={ (password) => this.setState({password: password})}/>
                    <TextField placeholder="Confirm Password"
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