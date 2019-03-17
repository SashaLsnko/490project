import {AsyncStorage} from "react-native";

const setUserInfo = (userEmail, loggingIn) => {
    AsyncStorage.setItem('userEmail', userEmail);
    AsyncStorage.setItem('isloggedIn', loggingIn);
};

const setPairing = (key, iv, pcName, pairing) => {
    AsyncStorage.setItem('pcName', pcName);
    AsyncStorage.setItem('key', key);
    AsyncStorage.setItem('iv', iv);
    AsyncStorage.setItem('isPaired', pairing);
};

const isLoggedIn = () => AsyncStorage.getItem('isloggedIn');

const isPaired = () => AsyncStorage.getItem('isPaired');

const pcName = () => AsyncStorage.getItem('pcName');

export {
    setUserInfo,
    setPairing,
    isLoggedIn,
    isPaired,
    pcName
}
