<script setup>
    import {useRouter} from "vue-router"
    import {ref,watch} from "vue"
    import global from "../global"    
    //import * as fs from 'fs'
    import axios from "axios"
    import FormData from 'form-data'
    //import fs from 'fs'
    //import FormData from "form-data"
    //var fs = require('fs');
    //import fs from 'fs'
    import product from "../data/product.json"
    const products=ref(product)
    var prodId=0
    //const productSelected=ref([])
    let productSelected=ref(global.state.produit)
    if (global.state.produit>0){
      //console.log(global.state.produit);    
      products.value=product.filter(product=>product.id===global.state.produit)
      productSelected=global.state.produit
      prodId=productSelected
      console.log(productSelected.value)
      //productSelected.value=0
    }
    else{
      //console.log(global.state.produit);    
      products.value=product.filter(product=>product.company===global.state.clientMlsa)
    }
    //console.log(global.state.produit);    
    //products.value=product.filter(product=>product.company===global.state.clientMlsa)
    const router=useRouter()
    //const newFaq = ref("");
    //const faqs=ref([]);
    const newFaqQuestion = ref("")
    const newFaqAnswer = ref("")
    const errorMessage=ref("")
    const errorMessageAnswer=ref("")
    let imageFile=ref("")
    let pdfFile=ref("")
    //var productId=0;
    //console.log(global.state.apiUrl);
    const addFaq=() => {
      //console.log(productSelected.id)
      prodId=productSelected //.value.id
      //console.log(prodId);
      errorMessage.value=""
      errorMessageAnswer.value=""
      //console.log("p"+productSelected[0].value.id)
      if (newFaqQuestion.value===""){
        errorMessage.value=global.state.trad.WriteQuestion
        return
      }
      if (newFaqAnswer.value===""){
        errorMessageAnswer.value=global.state.trad.WriteAnswer
        return
      }
      if (!prodId){ // || prodId===0 || prodId===null || prodId==="undefined"){
          errorMessageAnswer.value=global.state.trad.SelectaProduct
          return
      }else{
        const data = new FormData();
        data.append('question', newFaqQuestion.value)
        data.append('answer', newFaqAnswer.value)
        data.append('productId', prodId)
        data.append('nation', global.state.nation)
        data.append('picture', imageFile.value)
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: global.state.apiUrl+"/api/faq", // 'http://localhost:3056/api/faq',
          headers: { 
            'Content-Type': 'multipart/form-data'
            // 'Content-Type': 'application/json',
            // ...data.getHeaders()
          },
          data: data
        }
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
          router.push(`/`)
      }      
    }
    const closeFaq=() => {
      router.push(`/`)
    }
    //const fileinput=ref("")
    const onFileChange=(event)=>{
      console.log("fileinput")
      imageFile.value = event.target.files[0]
      console.log(imageFile.value.name)
    }
</script>

<template>
  <!-- <form @submit.prevent="addFtpRecord"> -->
  <main>
    <div class="container">
        <textarea v-model.trim="newFaqQuestion" name="Question" id="question" cols="80" rows="3" placeholder="Question..."></textarea>
        <p v-if="errorMessage">{{errorMessage}}</p>
        <textarea v-model.trim="newFaqAnswer" name="Answer" id="answer" cols="80" rows="10" placeholder="Réponse..."></textarea>
        <p v-if="errorMessageAnswer">{{errorMessageAnswer}}</p>
    </div>
    <div class="custom-select">
      <h1>{{global.state.trad.Products}}
          <select class="selected" v-model="productSelected">
              <option class="item" v-for="product in products" :key="product.id" :value="product.id" :label="product.label">
                  {{product}}
              </option>
          </select>
      </h1>
    </div>  
    <div>
      <form>
        <input type="file" accept=".png, .jpg, .jpeg, .pdf" ref="fileinput"  @change="onFileChange">
      </form>
    </div>

    <div class="buttoncontainer">
      <button @click="addFaq">{{global.state.trad.Add}}</button>
      <button @click="closeFaq">{{global.state.trad.Close}}</button>
    </div>
  <!-- </form> -->
  </main>
</template>

<style scoped>
  main {
    margin-left: 30px; 
    margin-bottom: 5px;
    margin-top: 20px;
  }
  .container{
    margin-top: 130px;
    display:grid;    
    max-width: 1000px;
    margin: 0 auto;
  }
  main .buttoncontainer{    
    display: flex;
    flex-direction:row;
    justify-content: space-between;
  }
  main button {
    border: none;    
    width: 100px;
    height: 70px;
    cursor: pointer;
    background-color: rgb(156, 20, 49);
    color: white;
    font-size: 20px;  
    border-radius: 15px;  
  }
  .container textarea{
    color:black;
    width:auto;
    height: 100px;
    background-color: white;
    padding: 10px;
    border-radius: 15px;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .date{
    font-size: 12.5px;
    font-weight: bold;
  }
  .cards-container{
    display: flex;
    flex-wrap: wrap;
  }
  .overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.77);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal{
    width: 750px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .modal button{
    padding: 10px 20px;
    font-size: 20px;
    width: 100%;
    background-color:blueviolet;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 15px;
  }

  .modal .close {
    background-color: rgb(193,15,15);
    margin-top: 7px;    
  }

  .container p{
    color:red;
  }

  div button {
    margin-top: 20px; 
    margin-left: 10px; 
    margin-right: 20px;
    border: none;    
    width: 120px;
    height: 30px;
    cursor: pointer;
    background-color: rgb(117, 16, 38);
    color: white;
    font-size: 20px;  
    border-radius: 15px;  
  }
</style>