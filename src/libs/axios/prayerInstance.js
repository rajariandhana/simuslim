import environment from '../../config/environment';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

const prayerInstance = axios.create({
  baseURL: environment.PRAYER_API,
  headers,
  timeout: 60 * 1000,
});

prayerInstance.interceptors.request.use(
  async (request) => {
    return request;
  },
  (error) => Promise.reject(error),
);

prayerInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default prayerInstance;