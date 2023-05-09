<script setup>
    //import ChildStyles from "../components/ChilStyles.vue"
    import global from "../global"
    //import faq from "../data/faqs.json"
    import product from "../data/product.json"
    import langues from '../locales/langues.json'
    import tradfr from '../data/trad_fr.json'
    import traden from '../data/trad_en.json'
    import {onMounted,ref,watch} from "vue"
    import Question from "../components/QuestionAPI.vue"
    import axios from 'axios';  
    import {useRouter,useRoute} from "vue-router"
    const route=useRoute()
    const params=route.params.set
    console.log(params)
    if(params!=null){
        global.state.nation=route.params.set.split('|')[0]
        global.state.produit=route.params.set.split('|')[1]
        global.state.produitUnique=route.params.set.split('|')[1]
        function setCookie(name, value, days) {
            let expires = "";
            if (days) {
                let date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }
        // appel de la fonction pour sauvegarder une donnée dans un cookie
        setCookie("nation", global.state.nation, 365);
        setCookie("product", global.state.produit, 365);
        setCookie("productUnique", global.state.produitUnique);
    }else{console.log("no param")}
    import imagefr from "../assets/fr.png"
    import imageen from "../assets/en.png"
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
    let nationfr=true
    switch (global.state.nation) {
        case 'fr':
            global.state.trad=tradfr
            global.state.nation="fr"
            //console.log("frfr");
            break;
        case 'en':
            global.state.trad=traden;
            global.state.nation="en"
            nationfr=false
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
        console.log("loadFaq");
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
            
            if (global.state.produit>0){
                faqs.value=global.state.faqs.filter(faq=>faq.productId===productSelected.value)
            }else
            {
                faqs.value=global.state.faqs
            }
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
    //combobox
    // let items=product
    // let item=null
    // //console.log(items);
    // items=product
    //console.log(items);
    const onChange=(entry)=>{
        if (typeof entry === 'string' && entry.trim()) {
        const item = this.items.find(item => item.name === entry)
        if (item) {
          this.item = item
        } else {
          this.item = this.addItem(entry)
        }
      }
    }
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
        nationfr=true
        switch (global.state.nation) {
        case 'fr':
            global.state.trad=tradfr;
            //console.log("sfrfr");
            break;
        case 'en':
            global.state.trad=traden;
            nationfr=false
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
    const langueSelectedfr=()=>{
        console.log("fr");
        setCookie("nation", "fr", 365)
        global.state.nation="fr"
        global.state.trad=tradfr;
        nationfr=true
        loadFaq()
    }
    const langueSelecteden=()=>{
        console.log("en");
        setCookie("nation", "en", 365)
        global.state.nation="en"
        global.state.trad=traden;
        nationfr=false
        loadFaq()
    }
</script>
<template>
    <header>
        <div class="nation">
            <a href="#"  @click="langueSelectedfr">
                <img :src="imagefr" />
            </a>
            <a href="#" @click="langueSelecteden">
                <img :src="imageen"/>
            </a>
        </div>
        <!-- <div class="custom-select4"> -->
            <!-- <h4>{{global.state.trad.Langue}}</h4> -->
            <!-- <select class="selectedNation" v-model="langueSelected">
                <option class="item" v-for="langue in langues" :key="langue.id" :value="langue.id" :label="langue.label">
                    {{langue.label}}
                </option>
            </select> -->
        <!-- </div> -->
        <div class="logo">
            <img src="../components/icons/logo-name.webp" />                   
        </div>
        <!-- {{productSelected}} -->
        <div v-if="!global.state.produitUnique">
            <div class="custom-selectall">                   
                <div class="custom-select4">
                    <h4>{{global.state.trad.Products}}</h4>                    
                    <select class="selected" v-model="productSelected">
                        <option class="item" v-for="product in products" :key="product.id" :value="product.id" :label="product.label">
                            {{product}}
                        </option>
                    </select>
                </div>     
            </div>   
        </div>
        <!-- <v-combobox
            v-model="item"
            :items="items"
            @change="onChange"
            item-text="name"
            item-value="id"
            label=global.state.trad.Products
            return-object
        ></v-combobox> -->
        <div class="custom-filter">
            <h1>
                <input v-model.trim="search" type="text" :placeholder="global.state.trad.Filter">                      
                <button v-if="global.state.admin" @click="addFaq">+</button>
            </h1>
        </div>               
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
</template>

<style scoped>
    .nation a{        
        display:inline-flex;  
        margin-left: 10px;        
    }
    .custom-filter input{
        background-color: white;
        font-size:medium;
        width: 300px;
    }
    header{
        padding-left: 30px;
    }
    .selectedNation{                
        width: 45px;        
        font-size:medium;
        background-color: rgb(172, 170, 170);
    }
    .custom-select4{                
        width: 500px;
        font-size:medium;
    }
    .custom-selectall{
        display:inline-block;       
    }
    h4{
        color: rgb(156, 20, 49);
        width: 100px;
    }

    .selected{
        width: 150px;
        background-color: white;
    }
</style>