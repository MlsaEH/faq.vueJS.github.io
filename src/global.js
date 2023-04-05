import {reactive} from "vue";
let state=reactive({
    //apiUrl:'http://151.80.217.128:3055',
    apiUrl:'http://localhost:3055',
    clientMlsa:'55',
    token:'',
    username: 'MLSA',
    password: 'CHEF',
    admin:false,
    monIp:'',
    trad:'',
    nation:'en',
    produit:0,
    faqs:[],
    produitUnique:false
})
export default {state}