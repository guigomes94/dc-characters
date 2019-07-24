import axios from 'axios';

const api = axios.create({ baseURL: 'https://dc-characters-api.herokuapp.com' });

export default api;