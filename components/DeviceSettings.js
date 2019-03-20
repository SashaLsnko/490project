import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { commonStyles, PcInfo} from "./common";
import { setPairing, pcName, isPaired } from "../utils";

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

        if (this.props.navigation.state.params.paired === true) {
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
        } else {
            return (
                <View style={{margin : 15}}>
                    <Text style={[commonStyles.instructions,{fontSize: 16}]}>
                        No devices connected
                    </Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    formContainer: {
        height: height,
        alignItems: "center"
    }
});

export default DeviceSettingsScreen;