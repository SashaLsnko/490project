import React from "react";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Alert} from "react-native";
import {NavigationLink, Header, TextField, HorizontalSeparator, commonStyles} from "./common";


const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class LoginScreen extends React.Component {
    state= {username : "",
            password: ""};
    render() {
        const showAlert = (message) =>{
            Alert.alert( message )
        };
        const login = () =>{
            if (this.state.username && this.state.password) {
                this.props.navigation.navigate('Home')
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
                        onChangeFn={ (username) => this.setState({username: username})}/>
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
                                        navigate={ () => this.props.navigation.navigate('Registration') }/>
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