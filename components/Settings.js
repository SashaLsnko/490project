import React from "react";
import {Button, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, Header, HorizontalSeparator, NavigationLink, TextField, commonStyles} from "./common";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class SettingsScreen extends React.Component {
    render() {
        return (
            <View >
                <Header title='Settings'/>
                <View style={{
                    alignItems: "center",
                    flexDirection: 'column'}}>
                    <Text  style={commonStyles.instructions}>
                        aaaaa
                    </Text>
                </View>
            </View>
        );
    }
}

export default SettingsScreen;