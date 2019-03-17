import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextField, commonStyles } from "./common";

const height = Dimensions.get('window').height; //full height

class ForgotPasswordScreen extends React.Component {
    state= {email : ""};

    sendNewPassword() {
        fetch('http://sls.alaca.ca/sendNewPassword', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uname: this.state.email
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    this.props.navigation.state.params.refreshFunction();
                    this.props.navigation.navigate('Home');
                    alert("Your new password can be found in your mailbox!")
                } else
                if (response.status === 400) {
                    alert("Your Username incorrect");
                } else
                    alert("Oops, something went wrong. Check your Username and Password!")
            })
            .catch(function(error) { alert(error) });
    }

    render() {
        const forgotPassword = () =>{
            this.sendNewPassword();
        };

        return (
            <View>
                <View style={[styles.formContainer, {height: 200}]}>
                    <TextField
                        secure = {true}
                        placeholder="Email"
                        onChangeFn={ (email) => this.setState({email: email})}/>

                    <TouchableOpacity
                        style={commonStyles.submitButton}
                        onPress={() => forgotPassword()}>
                        <Text style={commonStyles.buttonText}>Get New Password Via Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    formContainer: {
        alignItems: "center",
        display: 'flex',
        justifyContent: 'space-evenly',
        height: height*0.8
    }
});

export default ForgotPasswordScreen;