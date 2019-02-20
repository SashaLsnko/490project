import React from "react";
import {Button, Dimensions, Image, StyleSheet, Text, TextInput, View} from "react-native";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

class Header extends React.Component {
    render() {
        const {title} = this.props;
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        );
    }
}

class TextField extends React.Component {
    render() {
        const {placeholder, onChangeFn} = this.props;
        return (
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={colors.darkGrey}
                onChangeText={(text) => onChangeFn(text)}/>
        );
    }
}

class NavigationLink extends React.Component {
    render() {
        const {text, navigate} = this.props;
        return (
            <Button
                title={text}
                onPress={() => navigate()}
            />
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
                    <Text style={styles.pcTextBold}>PC Name {"\n"}</Text>
                    <Text style={styles.pcTextBold}>IP:</Text> 123.456.78.910 {"\n"}
                    <Text style={styles.pcTextBold}>Bluetooth:</Text> off {"\n"}
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
    headerContainer: {
        backgroundColor: colors.white,
        borderBottomWidth: 3,
        borderBottomColor: colors.darkDarkPurle,
        height: 80,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 40,
        color: colors.darkDarkPurle
    },
    textInput : {
        height: 50,
        backgroundColor: colors.lightPurple,
        marginHorizontal: 20,
        marginVertical: 20,
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
        marginVertical: 30
    },
    pcInfoContainer: {
        height: 200,
        backgroundColor: colors.lightPurple,
        width: width,
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingTop: 40
    },
    computerImage: {
        height: 120,
        width: 130,
        marginLeft: 30
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
        height: 50,
        marginVertical: 20
    },
    buttonText: {
        width: width - 60,
        textAlign: 'center',
        color: colors.white
    },
    instructions: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 30,
        width: width-30,
        lineHeight: 40
    }
});

export {
    Header,
    TextField,
    colors,
    NavigationLink,
    HorizontalSeparator,
    commonStyles,
    PcInfo
};