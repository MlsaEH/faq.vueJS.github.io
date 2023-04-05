<script setup>
    import {onMounted} from "vue"
    import {ref} from "vue";
    import axios from "axios";
    import faq from "../data/faqs.json"
    const infos = ref([])
    onMounted(async () => {
        await axios
            .get('http://localhost:3055/api/faqs')
            .then(response => {
                infos.value = response.data
                for(f in infos.data){
                    addFaq(f)
                }
            })
    })    
    const faqs=ref(faq)
    const addFaq=(newFaq) => {
      faqs.value.push(
        {
          id: Math.floor(Math.random() * 1000000),
          question: newFaq.value,
          answer: newFaq.value,
          productId:1,                   
        }
      )
    }
</script>
<template>
  <div id="app">
    test
    {{ infos.message }}
    {{ infos.data }}
    <li v-for="faq in infos.data">
        <button @click="addFaq(faq)">ajout</button>
        {{ faq.id }}
        {{ faq.question }}
        {{ faq.answer }}
      </li>
  </div>
</template>