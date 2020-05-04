import axios from 'axios';
import handleErrors from './handleErrors';

const service = {
  get: (url, options) => axios.get(url, options).catch((error) => {
    handleErrors(error);
  }),
  post: (url, options, optionalObj) => axios.post(url, options, optionalObj).catch((error) => {
    handleErrors(error);
  }),
  patch: (url, options, data) => axios.patch(url, options, data).catch((error) => {
    handleErrors(error);
  }),
  put: (url, data, params) => axios.put(url, data, params).catch((error) => {
    handleErrors(error);
  }),
  delete: (url, options) => axios.delete(url, options).catch((error) => {
    handleErrors(error);
  }),
};

export default service;
