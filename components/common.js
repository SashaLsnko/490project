import React from "react";
import {Button, Dimensions, StyleSheet, Text, TextInput, View} from "react-native";

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
        const {placeholder} = this.props;
        return (
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={colors.darkGrey}/>
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
    },
});

export {
    Header,
    TextField,
    colors,
    NavigationLink,
    HorizontalSeparator,
    commonStyles
};