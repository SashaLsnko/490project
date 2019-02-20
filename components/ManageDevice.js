import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, Header, commonStyles, PcInfo} from "./common";


const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class ManageDevice extends React.Component {
    render() {
        return (
            <View>
                <Header title='Device'/>
                <View style={styles.alignCenter}>
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
        height: 150,
        width: 150,
        marginHorizontal: 10,
        marginVertical: 30,
        marginTop: 50
    },
    alignCenter: {
        alignItems: 'center'
    }
});

export default ManageDevice;