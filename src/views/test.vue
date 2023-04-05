<template>
  <h1>test->{{text}}</h1>
  <h1>Langues
      <select class="selected" v-model="langueSelected">
          <option class="item" v-for="langue in langues" :key="langue.id" :value="langue" :label="langue.label">
              {{langue}}
          </option>
      </select>
  </h1>
</template>

<script setup>
  import {ref,watch} from "vue"
  import global from "../global"
  import axios from 'axios';  
  import langues from '../locales/langues.json'

  const langueSelected=ref(langues)
//  productSelected.id=1
  //console.log(langueSelected);
  const text=ref("")
  //const langue=ref([])
  //console.log(global.state.apiUrl);
  const options = {
      method: 'GET',
      url: global.state.apiUrl+"/api/text",
      headers: {
          'Content-Type': 'application/json',
          "Accept-Language": 'fr'
      }      
  };  
  watch(langueSelected,()=>{
      console.log(langueSelected.value.id);
      options.headers["Accept-Language"]=langueSelected.value.id
      axios.request(options).then(function (response) {
            console.log(response.data);
            text.value=response.data
        }).catch(function (error) {console.error(error);});
  })
</script>