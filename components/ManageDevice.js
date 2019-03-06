import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { commonStyles, PcInfo } from "./common";

const width = Dimensions.get('window').width; //full width

class ManageDevice extends React.Component {
    render() {
        return (
            <View>
                <View style={commonStyles.alignCenter}>
                    <Text  style={commonStyles.instructions}>You are connected to:</Text>
                    <PcInfo/>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/img/lock_button.png")}
                                style={styles.lockButtons}/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/img/unlock_button.png")}
                                style={styles.lockButtons}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={commonStyles.submitButton}
                        onPress={() => this.props.navigation.navigate('SettingsScreen')}>
                        <Text style={commonStyles.buttonText}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lockButtons: {
        height: width/2.5,
        width: width/2.5,
        marginHorizontal: 10,
        marginVertical: 30,
        marginTop: 50
    }
});

export default ManageDevice;