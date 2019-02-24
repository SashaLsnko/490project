import {AsyncStorage} from "react-native";

const setUserInfo = (userEmail, userPassword, loggingIn) => {
    AsyncStorage.setItem('userEmail', userEmail);
    AsyncStorage.setItem('userPassword', userPassword);
    AsyncStorage.setItem('isloggedIn', loggingIn);
};

const setPairing = (pcName) => {
    AsyncStorage.setItem('pcName', pcName);
    AsyncStorage.setItem('isPaired', 'true');
}

const isLoggedIn = () => AsyncStorage.getItem('isloggedIn');

const isPaired = () => AsyncStorage.getItem('isPaired');

export {
    setUserInfo,
    setPairing,
    isLoggedIn,
    isPaired
}