import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonStyles, PcInfo} from "./common";
import { setPairing, pcName } from "../utils";

const height = Dimensions.get('window').height; //full height

class DeviceSettingsScreen extends React.Component {

    state= {
        pcName: ""
    };

    unpairDevice() {
        setPairing("", 'false');
        this.props.navigation.state.params.refreshFunction();
        this.props.navigation.goBack();
    }

    render() {
        pcName().then(res => {
            if (res !== this.state.pcName) {
                this.setState({pcName: res})
            }
        });
        return (
            <View>
                <View style={styles.formContainer}>
                    <PcInfo pcName={this.state.pcName}/>
                    <TouchableOpacity
                        style={[commonStyles.submitButton, {marginTop: 20}]}
                        onPress={() => {this.unpairDevice()}}>
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