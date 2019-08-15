import axios from 'axios';

export const getPublicTimeline = () =>
  axios.get('http://localhost:1880/posts/publictimeline');
