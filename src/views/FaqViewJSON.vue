<script setup> 
    import faq from "../data/faqs.json"
    import product from "../data/product.json"
    import {ref,watch} from "vue"
    import QuestionJSON from "../components/QuestionJSON.vue"
    //import axios from 'axios';    
    const faqs=faq
    //const router=useRouter()
    const search =ref("")
    watch(search,()=>{
        console.log("filtre");
        faqs=faq.filter(faq=>faq.question.toLowerCase().includes(search.value.toLowerCase()))    
    })
    const products=ref(product)
    products.value=product.filter(product=>(product.company==="55" || product.company===""))
    const productSelected=ref(product)
    productSelected.id=0
    //const filterfaqs=ref(faq)
    watch(productSelected,(p)=>{
        console.log("filtre product");
        search.value=""
        if(p.id>0){
            faqs=faq.filter(faq=>faq.productId===p.id)
        }
        else
        {
            faqs=faq.filter(faq=>faq.productId>0)
        }
    })
</script>

<template>
    <div>
        <!-- {{productSelected}} -->
        <div class="custom-select">
            <h1>Products
                <select class="selected" v-model="productSelected">
                    <option class="item" v-for="product in products" :key="product.id" :value="product" :label="product.label" v-on:change="setProduct">
                        {{product}}
                    </option>
                </select>
            </h1>
        </div>       
        <header>
            <img src="../components/icons/logo-1_1_.webp" />
            <h1>FAQ {{product.label}}</h1>
            <input v-model.trim="search" type="text" placeholder="Filter...">              
            <!-- <button @click="navigateToAddFAQ">+</button>           
            <button @click="addFaq">++</button> -->
        </header>    
        <div class="options-container">
            <QuestionJSON v-for="faq in faqs" :key="faq.id" :faq="faq"/> 
             <!-- v-if="faq.productId===productSelected.id"/>           -->
        </div>  
    </div>
</template>
<style scoped>

</style>