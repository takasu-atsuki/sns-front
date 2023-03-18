import axios from 'axios';

const client = axios.create();

const onSuccess = (res) => res;

client.interceptors.response.use(onSuccess, function (error) {
  let err = {};
  switch (error.response?.status) {
    case 400:
      err = {
        code: error.response.status,
        message: 'Bad Request',
      };
      return Promise.reject(err);
    case 401:
      err = {
        code: error.response.status,
        message: 'Unauthorized',
      };
      return Promise.reject(err);
    case 404:
      err = {
        code: error.response.status,
        message: 'Not Found',
      };
      return Promise.reject(err);
    case 412:
      err = {
        code: error.response.status,
        message: 'Precondition Failed',
      };
      return Promise.reject(err);
    case 429:
      err = {
        code: error.response.status,
        message: 'Too Many Requests',
      };
      return Promise.reject(err);
    case 503:
      err = {
        code: error.response.status,
        message: 'Service Unavailable',
      };
      return Promise.reject(err);
    case 504:
      err = {
        code: error.response.status,
        message: 'Gateway Timeout',
      };
      return Promise.reject(err);
    default:
      err = {
        code: '',
        message: 'Wait A While And Try Again',
      };
      return Promise.reject(err);
  }
});

export default client;
