<script setup>
    //import { defineProps } from "vue";
    import { useRouter } from 'vue-router'
    import global from "../global"
    import axios from "axios"
    import {ref} from 'vue'    
    const router=useRouter()
    const {faq}=defineProps(['faq'])
    const closeFaq=() => {
      router.push(`/`)
    }
    const url = global.state.apiUrl+"/"
    const deleteFaq=(faqid) => {
        const options = {
            method: 'DELETE',
            url: global.state.apiUrl+"/api/faqs/"+faqid,
                headers: {
                'Content-Type': 'application/json'
                }            
        };
        axios.request(options).then(function (response) {
            console.log("global.state.faqs===null");
            global.state.faqs===null
        }).catch(function (error) {console.error(error);});
        router.push(`/`);
    }
    let isPdfFile = ref(false)
    let isPIctureFile = ref(false)
    let fileExtension = ""
    let filename=""
    filename=faq.picture
    console.log("filename:"+filename)
    //console.log(faq.picture.name)
    if (filename === '')// || typeof filename === 'undefined')
        {console.log("pas de fichier:"+filename)}
    else{
        fileExtension=filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
        if (fileExtension === 'pdf') {
            isPdfFile.value = true            
        } else {
            isPIctureFile.value = true
        }
        console.log(fileExtension)
    }
    console.log(faq.question)
</script>

<template>
    <div class="button-container"> 
        <button class="button-one" @click="closeFaq">{{global.state.trad.Close}}</button> 
        <button class="button-one" v-if="global.state.admin" @click="deleteFaq(faq.id)">{{global.state.trad.Delete}}</button>
    </div>
    <div class="question-container">  
        <h1 class="question">
            <br>
            {{faq.question}}
            <hr class="separation-line">
        </h1> 
        <h2>
            {{faq.answer}}
            <hr class="separation-line">
            <!-- <p v-for="l in faq.answer">
                {{l.label}}
            </p> -->
        </h2>
        <div class="image-container">
            <div v-if="faq.picture">
                <div v-if="isPdfFile">
                    <embed :src="url+faq.picture.replace(/\\/g, '/')" type="application/pdf" width="200%" height="600px" />
                </div>
                <div v-if="isPIctureFile">
                    <img :src="url+faq.picture.replace(/\\/g, '/')" alt="Image">
                </div>
            </div>
            <div v-if="faq.pdfPath">
                <button>{{faq.pdfPath}}</button>
            </div>
            <!-- <div v-if="faq.pdf">
                <iframe :src="url+faq.pdf.replace(/\\/g, '/')" alt="PDF">
            </div> -->
        </div>
        <!-- {{ urlPDF }} 
        <div v-if="faq.pdfId">
            <button @click="generatePDF">Télécharger PDF</button>
            <button class="button-one" v-if="global.state.admin" @click="downloadPdf(faq.pdfId)">Télécharger PDF</button>
        </div>
        <RouterLink to="/">Go back</RouterLink> -->       
    </div>
</template>

<style scoped>
.separation-line {
    border: none;
    border-top: 1px solid rgb(124, 24, 51);
    margin: 20px 0;
  }
.question-container {
    display: grid;
    white-space: pre-line;
}
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
  }

  .button-one {
    margin-top: 20px; 
    margin-left: 10px; 
    margin-right: 20px;
    border: none;    
    width: 200px;
    height: 30px;
    cursor: pointer;
    background-color: rgb(124, 24, 51);
    color: white;
    font-size: 20px;  
    border-radius: 5px;  
  }
    h1{
        margin-left: 20px;
        font-weight:lighter;
        font-size:20px;
        padding-left: 10px;
    }
    h2{
        margin-left: 20px;
        font-weight:normal;
        font-size:30px;
        padding-left: 10px;
    }
</style>