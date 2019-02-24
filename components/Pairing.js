import React from "react";
import { Text, TouchableOpacity, View} from "react-native";
import { commonStyles} from "./common";

class PairingScreen extends React.Component {
    render() {
        return (
            <View>
                <View style={{alignItems: "center"}}>
                    <Text  style={commonStyles.instructions}>
                        Click the button to scan the QR code generated by the SLS desktop application
                    </Text>
                    <TouchableOpacity
                        style={commonStyles.submitButton}>
                        <Text style={commonStyles.buttonText}>Scan QR code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default PairingScreen;