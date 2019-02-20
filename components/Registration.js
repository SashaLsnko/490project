import React from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Header, TextField, NavigationLink, commonStyles} from './common';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class RegistrationScreen extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column'}}>
                <Header title='SLS'/>

                <View style={styles.formContainer}>
                    <Text style={{...commonStyles.instructions, lineHeight: 20, marginVertical: 15}}>
                        Create your account</Text>
                    <TextField placeholder="Full Name"/>
                    <TextField placeholder="Email"/>
                    <TextField placeholder="Password"/>
                    <TextField placeholder="Confirm Password"/>
                    <TouchableOpacity style={commonStyles.submitButton}>
                        <Text style={commonStyles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                    <View style={{marginVertical: 20}}>
                        <NavigationLink text='Already have an Account?'
                                        navigate={ () => this.props.navigation.navigate('Login') }/>
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