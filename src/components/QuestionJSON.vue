<script setup>
    //import {defineProps} from "vue"
    import {useRouter} from "vue-router"
    const router=useRouter()
    const {faq}= defineProps(['faq'])
    // const navigateToFAQ=()=>{
    //     router.push(`/faq/${faq.id}`)
    // }
</script>

<template>
    <div class="question">       
            <p>{{faq.question}}</p>  
            <h1 v-for="l in faq.answer" class="faq-item">              
                {{l.label}}
            </h1> 
        <h2 v-if="faq.productId===1">
            <h1>              
                Modulo
            </h1> 
        </h2>
        <h2 v-else>
            <h1>              
                Eurocaisse
            </h1>   
        </h2>        
    </div>
</template>

<style scoped>
.question {   
    align-content:flex-start;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1) ;
    margin-bottom: 35px;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 20px;
}
.question p{
    margin-left: 20px;
    font-weight: bold;
    font-size:30px;
    padding-left: 10px;
}
.faq-item {
    margin-bottom: 20px;
    background-color: #3d1c1c;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
  }
</style>