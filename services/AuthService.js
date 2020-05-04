import axios from 'axios';
import { getApiUrl } from './getApiUrl';
import AsyncStorage from '@react-native-community/async-storage';


const AUTH_ENDPOINT = 'user/login';

export default {
  login: async (authData) => {
    const form = new FormData();
    form.append('username', authData.username);
    form.append('password', authData.password);
    const { data } = await axios.post(getApiUrl(AUTH_ENDPOINT), form);
    await AsyncStorage.setItem('userToken', data.token);
    return data.token;
  },
};
