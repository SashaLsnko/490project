import React from "react";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View, Switch, Image} from "react-native";
import {colors, Header, HorizontalSeparator, NavigationLink, TextField, commonStyles, PcInfo} from "./common";
import LoginScreen from "./Login";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class DeviceSettingsScreen extends React.Component {
    render() {
        return (
            <View>
                <Header title='Device Settings'/>
                <View style={styles.formContainer}>
                    <PcInfo/>
                    <TouchableOpacity
                        style={commonStyles.submitButton}>
                        <Text style={commonStyles.buttonText}>Unpair Device</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: height,
        alignItems: "center"
    }
});

export default DeviceSettingsScreen;