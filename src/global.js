import {reactive} from "vue";
let state=reactive({
    //apiUrl:'http://87.98.183.225:3055',
    apiUrl:'http://localhost:3055',
    clientMlsa:'55',
    token:'',
    username: 'MLSA',
    password: 'CHEF',
    admin:false,
    monIp:'',
    trad:[],
    nation:'fr',
    produit:0,
    faqs:[],
    produitUnique:false
})
export default {state}