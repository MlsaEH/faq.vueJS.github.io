<!-- <script setup>
    import faq from "../data/faqs.json"
    import {onMounted} from "vue"
    import axios from 'axios';
    var faqs=null;
    onMounted(async () => {
        await axios
            .get('http://localhost:3055/api/faqs')
            .then(function(response){
                this.faqs = response.data.data
                console.log(response.data.data)
            })
            .catch(function(error){
                console.log(error)
            })
    })  
</script>

<template>
    <div v-for="faq in faqs">
      {{ faq.question }}
    </div>
</template>

<style scoped>
</style> -->


<template>
    <div>
      <h1>{{ message }}</h1>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.question }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: 'Liste d\'éléments récupérée à partir du serveur:',
        items: []
      }
    },
    mounted() {
      axios.get('http://localhost:3055/api/faqs')
        .then(response => {
          this.items = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  </script>
  