import {AsyncStorage} from "react-native";

const setUserInfo = (userEmail, loggingIn) => {
    AsyncStorage.setItem('userEmail', userEmail);
    AsyncStorage.setItem('isloggedIn', loggingIn);
};

const setPairing = (pcName, pairing) => {
    AsyncStorage.setItem('pcName', pcName);
    AsyncStorage.setItem('isPaired', pairing);
};

const isLoggedIn = () => AsyncStorage.getItem('isloggedIn');

const isPaired = () => AsyncStorage.getItem('isPaired');

const pcName = () => AsyncStorage.getItem('pcName');

const userEmail = () => AsyncStorage.getItem('userEmail');

export {
    setUserInfo,
    setPairing,
    isLoggedIn,
    isPaired,
    pcName,
    userEmail
}