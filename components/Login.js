import React from "react";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationLink, colors, Header, TextField, HorizontalSeparator, commonStyles} from "./common";


const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class LoginScreen extends React.Component {
    render() {
        return (
            <View>
                <Header title='SLS'/>
                <View style={styles.formContainer}>
                    <Text style={commonStyles.instructions}>Login to your account</Text>
                    <TextField placeholder="Email"/>
                    <TextField placeholder="Password"/>
                    <TouchableOpacity style={commonStyles.submitButton}>
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