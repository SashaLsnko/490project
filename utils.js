import {AsyncStorage} from "react-native";

const setUserInfo = (userEmail, userToken, loggingIn) => {
    AsyncStorage.setItem('userEmail', userEmail);
    AsyncStorage.setItem('userToken', userToken);
    AsyncStorage.setItem('isloggedIn', loggingIn);
};

const setPairing = (key, iv, pcName, pairing) => {
    AsyncStorage.setItem('pcName', pcName);
    AsyncStorage.setItem('key', key);
    AsyncStorage.setItem('iv', iv);
    AsyncStorage.setItem('isPaired', pairing);
};

const setBase = (lat, lon) => {
  AsyncStorage.setItem('latitude', lat);
  AsyncStorage.setItem('longitude', lon);
};

const isLoggedIn = () => AsyncStorage.getItem('isloggedIn');

const isPaired = () => AsyncStorage.getItem('isPaired');

const pcName = () => AsyncStorage.getItem('pcName');

const userEmail = () => AsyncStorage.getItem('userEmail');

export {
    setUserInfo,
    setPairing,
    setBase,
    isLoggedIn,
    isPaired,
    pcName,
    userEmail
}
