//Youtube: https://www.youtube.com/watch?v=NRxzvpdduvQ&list=PLkyjZc5TfBPbi6larZgCp0uO0ckrywBk8&index=6&t=6300s
//console.log("main.js2")
//import {createApp} from 'vue'
//c:/Mes Projets/VueJS/faq.vueJS.github.io/node_modules/vue/dist/vue
import { createApp } from "vue"
import global from "./global"
//import BootstrapVue from "bootstrap-vue"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap-vue/dist/bootstrap-vue.css" 
//import {ref, reactive} from 'vue'
import App from './App.vue'
import router from "./router/index"
import './assets/main.css'
import axios from 'axios'
//node_modules/axios/index
//import axios from '../node_modules/axios/index';
//import VueTranslate from 'vue-translate-plugin'

//import i18n from "vue-i18n";
//import requestIp from 'request-ip';
//const url = global.state.apiUrl
//console.log("glob:"+global.state.apiUrl);
//console.log("glob:"+global.state.username);
//localStorage.setItem('url', url);
//console.log("glob token:"+token);

const configAxios={
  username: global.state.username,
  password: global.state.password
}

//import { onMounted, ref } from 'vue';

//configAxios:username=global.state.username
//const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3NzU5Nzk5NywiZXhwIjoxNjc3Njg0Mzk3fQ.vvJVZjPtWqbhdwIQv8PIHaEm6-5yJteTx7awhVh8TKw';
//const token='';
axios.post(global.state.apiUrl+"/api/login", configAxios)
  .then(response => {
    //console.log("token1:"+response.data.token); 
    //token=response.data.token  
    localStorage.setItem('token', response.data.token);  
  })
  .catch(error => {
    console.error("error");
});

//Ajouter l'Authorization à toutes les requêtes sortantes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const options = {
  method: 'GET',
  url: global.state.apiUrl+"/api/ip",
  headers: {
      'Content-Type': 'application/json',
      'Accept-Language':'en'
  }
};
//console.log(options.url);
axios.request(options).then(function (response) {
      //console.log(response.data);            
      global.state.monIp=response.data.slice(-13)
      //console.log(global.state.monIp); 
      if (global.state.monIp==="90.63.179.132" || global.state.monIp==="::1"){
          global.state.admin=true;
          //console.log(global.state.admin);
      }
  }).catch(function (error) {console.error(error);});

const optionsFaq = {
    method: 'GET',
    url: global.state.apiUrl+"/api/faqs",
    headers: {
        'Content-Type': 'application/json',
    }
};  
axios.request(optionsFaq).then(function (response) {
        global.state.faqs=response.data.data
        //console.log(global.state.faqs);
        //console.log("main"+new Date().toISOString().slice(11, 23))
}).catch(function (error) {console.error(error);})

//options.headers['Accept-Language']="en"
//options.url=global.state.apiUrl+"/api/trad"
//console.log("trad");
// axios.request(options).then(function (response) {
//     //console.log(response.data);
//     global.state.trad=response.data
//     //console.log(global.state.trad);
//     }).catch(function (error) {console.error(error);});

// options.url=global.state.apiUrl+"/api/faqs"
// axios.request(options).then(function (response) {
//   //console.log(response.data.data);
//   //faqs.value=response.data.data
//   global.state.faqs=response.data.data
//   console.log("Main.js récupération faqs:"+new Date().toISOString().slice(11, 23))
//   console.log(global.state.faqs)
// }).catch(function (error) {console.error(error);})

const app=createApp(App)
app.use(router)
//app.use(BootstrapVue)
app.mount('#app')

