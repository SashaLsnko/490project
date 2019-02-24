import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonStyles, PcInfo} from "./common";

const height = Dimensions.get('window').height; //full height

class DeviceSettingsScreen extends React.Component {
    render() {
        return (
            <View>
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