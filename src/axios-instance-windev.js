import axios from 'axios';
//import global from "./global"

const instance = axios.create({
  baseURL: 'http://192.168.1.9:8026',
  timeout: 1000
  //headers: {'Authorization': 'Bearer ' + global.state.token}
});

export default instance;