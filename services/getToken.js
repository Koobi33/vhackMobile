import AsyncStorage from '@react-native-community/async-storage';

const getToken = async () => await AsyncStorage.getItem('userToken');
export default getToken;
