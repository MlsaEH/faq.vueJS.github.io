<script setup>
    import faq from "../data/faqs.json"
    //const faqs=ref(faq)
    const addFaq=(newFaq) => {
      faqs.value.push(
        {          
          question: newFaq.question,
          answer: newFaq.answer,
          productId:newFaq.productId                   
        }
      );
    }
    //import faq from ("../data/faqs.json")
    const faqs=ref(faq);
    const axios = require("axios");
    //const info = ref([])
    onMounted(async () => {
      await axios
          .get('http://localhost:3055/api/faqs')
          .then(response => {
            try {
                  this.faqs = response.data
                } catch (error) {
                  console.log(error)
                  //console.log(response.data)
                }
          })
    })
    //import axios from 'axios';    
    // export default {
    //     data() {
    //       return {
    //           jsonData: null
    //       };
    //     },
    //     mounted() {
    //       axios 
    //           .get('http://localhost:3055/api/faqs')
    //           //.get('http://localhost:3000/api/FAQ')
    //           //.get('http://localhost:5500')
    //           //.get('https://jsonplaceholder.typicode.com/posts')
    //           .then(response => {
    //             //this.loading = false;
    //             //console.log(response.data.message)
    //             try {
    //               this.jsonData = response.data
    //             } catch (error) {
    //               console.log(error)
    //               //console.log(response.data)
    //             }
    //             //console.log(response.items.data)   
    //             // try {
    //             //   this.jsonData = JSON.parse(response.data)
    //             // } catch (error) {
    //             //   console.log(error)
    //             // }            
    //           })
    //           .catch(error => {
    //             this.loading = false;
    //             this.error = error.message;
    //           }); 
    //     }
    // };
  </script>
  <template>
    <div>
      <h1>Data from API:</h1>
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">Error: {{ error }}</p>
      <ul v-else>
        <li v-for="faq in jsonData.data">
          <!-- <button @click="addFaq(faq)">ajout</button> -->
          {{ faq.id }}
          {{ faq.question }}
          {{ faq.answer }}
        </li>
        <!-- <li v-for="item in items" :key="item.id">
          {{ item }}
         <button @click="addFaq(item)">ajout</button>
        </li> -->
      </ul>
    </div>
  </template>
  