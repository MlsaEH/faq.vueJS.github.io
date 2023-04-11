<script setup>
    import global from "../global"
    //import faq from "../data/faqs.json"
    import product from "../data/product.json"
    import langues from '../locales/langues.json'
    import tradfr from '../data/trad_fr.json'
    import traden from '../data/trad_en.json'
    import {onMounted,ref,watch} from "vue"
    import Question from "../components/QuestionAPI.vue"
    import axios from 'axios';  
    import {useRouter} from "vue-router"
    const router=useRouter()
    // définition de la fonction pour récupérer la valeur du cookie
    const getCookie = (name) => {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };
    // définition de la fonction pour sauvegarder le cookie
    const setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    };

    // appel de la fonction pour récupérer la valeur du cookie
    let maNation = getCookie("nation");
    if (maNation){
        //console.log("cookie nation:"+ maNation);
        global.state.nation=maNation
    }
    switch (global.state.nation) {
        case 'fr':
            global.state.trad=tradfr
            global.state.nation="fr"
            //console.log("frfr");
            break;
        case 'en':
            global.state.trad=traden;
            global.state.nation="en"
            //console.log("enen");
            break;
        default: 
            global.state.trad=tradfr;
            global.state.nation="fr"
            //console.log("default");
    }
    //console.log(global.state.trad);    
    let myProduct = getCookie("product");
    let myProductUnique = getCookie("productUnique");
    if (myProduct){
        //console.log("cookie produit:"+ myProduct);
        global.state.produit=parseInt(myProduct)
        global.state.produitUnique=myProductUnique
    }else{
        global.state.produit=0
        global.state.produitUnique=0
    }
    const loadFaq=()=>{
        const optionsFaq = {
            method: 'GET',
            url: global.state.apiUrl+"/api/faqs",
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                conditionNation: global.state.nation
            },
        };
        axios.request(optionsFaq).then(function (response) {
            global.state.faqs=response.data.data
            //console.log("faqs<=axios "+global.state.nation+" ")
            //console.log(faqs)
            //console.log(global.state.faqs)
          //if (global.state.faqs){
            faqs.value=global.state.faqs
          //}
            //console.log(faqs.value)
          //console.log("faqview"+new Date().toISOString().slice(11, 23))
        }).catch(function (error) {console.error(error);}) 
    }
    var faqs=ref([])
    loadFaq()    
    //}
    //var faqDatabase=global.state.faqs //ref([]) 
    const search =ref("")
    const products=ref(product)
    let productSelected=ref(global.state.produit)
    if(global.state.produitUnique){
        products.value=product.filter(product=>(product.id===global.state.produit))
    }else{
        products.value=product.filter(product=>(product.company==="55" || product.company===""))
    }
    //Langue
    const langueSelected=ref(global.state.nation)
    watch(search,()=>{
        //console.log("search");
        if (global.state.faqs){            
            faqs.value=global.state.faqs.filter(faq=>faq.question.toLowerCase().includes(search.value.toLowerCase()) && faq.productId<3)    
            //console.log(faqDatabase.value);
        }
    })
    watch(productSelected,()=>{
        //console.log("productSelected:"+productSelected.value);
        setCookie("product", productSelected.value, 365);
        search.value=""
        global.state.produit=productSelected.value
        //console.log("Product:"+p.id);
        if(productSelected.value>0){
            if(global.state.faqs){
                faqs.value=global.state.faqs.filter(faq=>faq.productId===productSelected.value)
            }
            //console.log(faqs.value);
        }
        else
        {
            faqs.value=global.state.faqs
        }
        //loadFaq() 
    })
    const addFaq=()=>{
        //console.log(faqs);
        router.push(`/Addfaq`)
    }
    watch(langueSelected,()=>{
        setCookie("nation", langueSelected.value, 365);
        global.state.nation=langueSelected.value
        switch (global.state.nation) {
        case 'fr':
            global.state.trad=tradfr;
            //console.log("sfrfr");
            break;
        case 'en':
            global.state.trad=traden;
            //console.log("senen");
            break;
        default: 
            global.state.trad=tradfr;
            //console.log("sdefault");
        }
        search.value=""
        if (!global.state.produitUnique){
            global.state.produit=0
            productSelected.value=0
            //console.log("productSelected.value=0");
            setCookie("product", productSelected.value, 365);
        }
        loadFaq()
    })    
    const showTemplate = ref(true)    
</script>
<template>
    <div v-if="showTemplate">
        <!-- {{productSelected}} -->
        <h1>{{global.state.trad.Langue}}
            <select class="selected" v-model="langueSelected">
                <option class="item" v-for="langue in langues" :key="langue.id" :value="langue.id" :label="langue.label">
                    {{langue.label}}
                </option>
            </select>
        </h1>
        <div class="custom-select">
            <h1>{{global.state.trad.Products}}
                <select class="selected" v-model="productSelected">
                    <option class="item" v-for="product in products" :key="product.id" :value="product.id" :label="product.label">
                        {{product}}
                    </option>
                </select>
            </h1>
        </div>
        <header>
            <img src="../components/icons/logo-1_1_.webp" /> 
            <h1>FAQ {{product.label}}</h1>
            <input v-model.trim="search" type="text" :placeholder="global.state.trad.Filter">              
            <!-- <button @click="navigateToAddFAQ">+</button> -->           
            <button v-if="global.state.admin" @click="addFaq">+</button>
            <!-- <button @click="setUpFaq">Setup</button> -->
        </header>    
        <div class="options-container">
            <Question v-for="(faq,index) in faqs" :key="faq.id" :faq="faq" :index="index"/> 
            <!-- <h1 v-for="(faq,index) in faqs" :key="faq.id" :faq="faq" :index="index">
                <h1 class="question">
                    {{faq.question.slice(0, 20)}}
                </h1>
                <h2 class="answer">
                    {{faq.answer.slice(0, 30)}}
                </h2>
            </h1> -->
        </div>
    </div>
</template>

<style scoped>
    .answer{
        font-weight:bold;
        font-size:15px;
    }
    .question{
        font-weight:lighter;
        font-size:20px;
    }
    .custom-select {
        position: relative;
        width: 100%;
        text-align: left;
        outline: none;
        height: 40px;    
        line-height: 60px;
    }
    .selected {
        background-color: white;
        border-radius: 6px;
        border: 1px solid #858586;
        color: black;
        padding-left: 8px;
        cursor: pointer;
        user-select: none;
    }

    .selected.open{
        border: 1px solid #CE9B2C;
        border-radius: 6px 6px 0px 0px;
    }

    .selected:after {
        position: absolute;
        content: "";
        top: 22px;
        right: 10px;
        width: 0;
        height: 0;
        border: 4px solid transparent;
        border-color: #fff transparent transparent transparent;
    }

    .items {
        color: #ffffff;
        border-radius: 0px 0px 6px 6px;
        overflow: hidden;
        border-right: 1px solid #CE9B2C;
        border-left: 1px solid #CE9B2C;
        border-bottom: 1px solid #CE9B2C;
        position: absolute;
        background-color: #080D0E;
        left: 0;
        right: 0;
    }

    .item{
        color: black;
        padding-left: 8px;
        cursor: pointer;
        user-select: none;
    }

    .item:hover{
        background-color: #B68A28;
    }

    .selectHide {
        display: none;
    }
    header{
        margin-bottom: 10px;
        margin-top: 30px;
        display:flex;
        align-items: center;
    }
    header h1{
        font-weight: bold;
        margin-right: 30px;
        margin-left: 30px;
    }
    header button{
        font-weight: bold;   
        align-items: right;
        margin-left: 300px;
    }
    .header input {
        border: none;        
        padding: 10px;
        border-radius: 5px;
        background-color: rgba(128,128,128,0.1);
    }
    .options-container {
        display:contents;
        flex-wrap:wrap;
        margin-top: 40px;
    }
    div img{
        width: 200px;        
        align-content: center;
    }
    div button {
        border: none;    
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-color: rgb(124, 24, 51);
        color: white;
        font-size: 20px;  
        border-radius: 15px;  
    }
</style>