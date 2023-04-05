import axios from 'axios';
import global from "./global"

const instance = axios.create({
  baseURL: global.state.apiUrl+'/api',
  timeout: 1000,
  headers: {'Authorization': 'Bearer ' + global.state.token}
});

export default instance;