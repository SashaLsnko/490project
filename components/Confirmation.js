import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { NavigationLink, commonStyles, colors} from './common';
import {SafeAreaView} from "react-navigation";
import {setUserInfo, userEmail} from "../utils";
import {AsyncStorage} from "react-native";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class ConfirmationScreen extends React.Component {
    state= {
        email: ""
    };

    componentDidMount() {
      //alert(this.state.email);
    }

    _getField = async (field, callback) => {
      try {
        const value = await AsyncStorage.getItem(field);
        if (value !== null) {
          // We have data!!
          callback(value);
        }
      } catch (error) {
        // Error retrieving data
        //alert(error);
      }
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
                setUserInfo(this.state.email, response._bodyText, 'false');
                // this.props.navigation.state.params.refreshFunction();
                // this.props.navigation.navigate('Home');
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

    render() {

        userEmail().then(res => {
            if (res !== this.state.email) {
                this.setState({email: res})
            }
        });

        return (
            <SafeAreaView>
                <View style={commonStyles.alignCenter}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../assets/img/logo_home.png")}
                            style={styles.logo}/>
                    </View>
                    <View>
                      <Text style={commonStyles.instructions}>
                          Please confirm your email: we sent a link to {this.state.email}!
                      </Text>
                    </View>
                    <View style={styles.homeButtons}>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={this.sendConfirmationLink.bind(this)}>
                            <Text style={commonStyles.buttonText}>Re-send confirmation link</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={commonStyles.submitButton}
                            onPress={() => {
                              this.props.navigation.navigate('Login',
                              {refreshFunction: this.props.navigation.state.params.refreshFunction});
                            }}>
                            <Text style={commonStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <View style={[commonStyles.alignCenter, {marginTop: 20}]}>
                            <NavigationLink text='Use another email'
                                            navigate={ () => this.props.navigation.navigate('Registration',
                                                {refreshFunction: this.props.navigation.state.params.refreshFunction})}
                            />

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        height: height*0.45,
        backgroundColor: colors.darkDarkPurle,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0
    },
    logo: {
        marginLeft: 30,
        marginBottom: 40,
        resizeMode: 'center'
    },
    homeButtons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        height: height*0.30
    }
});

export default ConfirmationScreen;
