import axios from 'axios';

const BASE_AXIOS_URI = 'http://localhost:1880';

export const getPosts = () =>
  axios.get(`${BASE_AXIOS_URI}/posts/publictimeline`);
