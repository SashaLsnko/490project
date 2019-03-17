import React from "react";
import { ScrollView, Text } from "react-native";
import { commonStyles } from "./common";

class AboutScreen extends React.Component {

    render() {
        return (
            <ScrollView style={{margin : 15}}>
                <Text style={[commonStyles.instructions,{fontSize: 16}]}>
                    SLS is an app that you can use to lock and unlock a Personal Computer.
                </Text>
                <Text style={[commonStyles.instructions,{fontSize: 16}]}>
                    To start, register on the mobile device and connect the app to your PC
                    using a qr-code produced by the desktop application.
                </Text>
                <Text style={[commonStyles.instructions,{fontSize: 16}]}>
                    To lock and unlock the computer, either use buttons on the 'Manage Device'
                    page, or turn on the Proximity feature in the 'Settings'.
                </Text>
                <Text style={[commonStyles.instructions,{fontSize: 16}]}>
                    Good luck! If you have any questions, email us at securelocksystem@gmail.com
                </Text>
            </ScrollView>
        );
    }
}

export default AboutScreen;