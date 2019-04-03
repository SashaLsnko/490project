import React from "react";
import {Button, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class TextField extends React.Component {
    render() {
        const {placeholder, onChangeFn, secure} = this.props;
        return (
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={colors.darkGrey}
                secureTextEntry = {secure}
                onChangeText={(text) => onChangeFn(text)}
                textContentType={'password'}/>
        );
    }
}

class NavigationLink extends React.Component {
    render() {
        const {text, navigate} = this.props;
        return (
            <TouchableOpacity
                style={commonStyles.justifyCenter}
                onPress={() => navigate()}>
                <Text style={commonStyles.linkText}> {text}</Text>
            </TouchableOpacity>
        );
    }
}

class HorizontalSeparator extends React.Component {
    render() {
        return (
            <View style={styles.horizontal}></View>
        );
    }
}

class PcInfo extends React.Component {
    render() {
        return (
            <View style={styles.pcInfoContainer}>
                <Image
                    source={require("../assets/img/computer_icon.png")}
                    style={styles.computerImage}/>
                <Text style={styles.pcText}>
                    <Text style={styles.pcTextBold}>{this.props.pcName} {"\n"}</Text>
                    <Text style={styles.pcTextBold}>Battery: </Text>{this.props.battery} {"%\n"}
                    <Text style={styles.pcTextBold}>Status: </Text>{this.props.status} {"\n"}
                </Text>
            </View>
        );
    }
}

const colors = {
    white: 'white',
    black: 'black',
    darkPurple: '#4D3766',
    darkDarkPurle: '#32273F',
    lightPurple: '#EAE4F4',
    baseBlue: '#0071BC',
    lightGrey: '#E6E6E6',
    darkGrey: '#4D4D4D'
};

const styles = StyleSheet.create({
    textInput : {
        height: 50,
        backgroundColor: colors.lightPurple,
        width: width - 40,
        paddingLeft: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.darkDarkPurle,
        color: colors.black
    },
    horizontal: {
        width: width-100,
        height: 1,
        backgroundColor: colors.darkGrey,
        marginVertical: 0
    },
    pcInfoContainer: {
        height: height/4,
        backgroundColor: colors.lightPurple,
        width: width,
        justifyContent: 'space-around',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center'
    },
    computerImage: {
        height: 100,
        width: 110,
        margin: 'auto'
    },
    pcText: {
        fontSize: 18,
        lineHeight: 40
    },
    pcTextBold: {
        fontWeight: 'bold'
    }
});



const commonStyles = StyleSheet.create({
    submitButton: {
        justifyContent: 'center',
        backgroundColor: colors.darkPurple,
        borderRadius: 20,
        height: 50
    },
    buttonText: {
        width: width - 60,
        textAlign: 'center',
        color: colors.white
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        width: width-30,
        lineHeight: 40
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: "center"
    },
    linkText: {
        color: colors.baseBlue
    }
});

export {
    TextField,
    colors,
    NavigationLink,
    HorizontalSeparator,
    commonStyles,
    PcInfo
};
