import axios from 'axios';

const BASE_URI = 'http://127.0.0.1:1880';

export const postUp = data => axios.post(`${BASE_URI}/post`, data);
