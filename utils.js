import {AsyncStorage} from "react-native";

const setUserInfo = (userEmail, loggingIn) => {
    AsyncStorage.setItem('userEmail', userEmail);
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