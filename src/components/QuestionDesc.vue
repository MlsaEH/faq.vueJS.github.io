<script setup>
    //import { defineProps } from "vue";
    import { useRouter } from 'vue-router'
    import global from "../global"
    import axios from "axios"
    //import {ref} from 'vue'
    // import jsPDF from 'jspdf'
    // import pdfMake from 'pdfmake'
    // import pdfFonts from 'pdfmake/build/vfs_fonts'

    //pdfMake.vfs = pdfFonts.pdfMake.vfs
    //import html2pdf from 'html2pdf.js'

    // const generatePDF = (txt) => {
    //     const docDefinition = {
    //         content: txt
    //     }
    //     pdfMake.createPdf(docDefinition).download('test.pdf')
    // }

    // const downloadPdf=(pdfId) => {
    //     //console.log("downloadPdf")
    //     //console.log(pdfId);
    //     const optionsPdf = {
    //         method: 'GET',
    //         url: global.state.apiUrl+"/api/pdf/"+pdfId,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }        
    //     axios.request(optionsPdf).then(function (response) {
    //         console.log("response downloadPdf")
    //         //console.log(response.data.message)
    //         //console.log(response.data.data[0].filename)
    //         //console.log(response.data.data[0].pdf.data)
    //         const content = JSON.stringify(response.data.data[0].pdf.data)
    //         //const content = [91,32,51,55,44,32,56,48,44,32,54,56,44,32,55,48,44,32,52,53,44,32,52,57,44,32,52,54,44,32,53,50,44,32,49,48,44,32,51,55,44,32,50,50,56,44,32,50,50,55,44,32,50,48,55,44,32,50,49,48,44,32,49,48,44,32];
    //         var pdfData =new Uint8Array(response.data.data[0].pdf.data)
    //         //console.log(pdfData);
    //         //console.log(content);
    //         //const chaine = String.fromCharCode(...pdfData);

    //         var s1="";  
    //         //var octetx =  new Uint8Array([66,79,78,74,79,85,82]);  
    //         for (var i=0; i<pdfData.length; i++) {s1=s1+String.fromCharCode(pdfData[i]);}
    //         //console.log(s1);


    //         console.log(s1);
    //         //console.log(response.data.data[0].filename)
    //         // const doc = new jsPDF()
    //         // doc.text(faq.question, 10, 10)
    //         // doc.text(faq.answer, 20, 10)
    //         // doc.save(response.data.data[0].filename)
    //         //generatePDF(s1)
    //         const optionsPdf = {
    //             filename: response.data.data[0].filename,
    //             image: { type: 'jpeg', quality: 0.98 },
    //             html2canvas: { scale: 2 },
    //             jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    //         }
    //         //html2pdf(content, optionsPdf);
    //         html2pdf().from(s1).set(optionsPdf).save()
    //         //pdfMake.createPdf(docDefinition).download('test.pdf')
    //     }).catch(function (error) {console.error(error);});

    //     // const response = axios.request(optionsPdf);   
    //     // console.log("response")
    //     // console.log(response.message)
    //     // console.log(response[0].data);      //data[0].filename
    //     // const content = JSON.stringify(response.data);
    //     // console.log(content);
    //     // this.$htmlToPdf(content, options);
    // }

    //import pdf from 'vue-pdf'
    const router=useRouter()
    const {faq}=defineProps(['faq'])
    const closeFaq=() => {
      router.push(`/`)
    }
    const url = global.state.apiUrl+"/"
    const deleteFaq=(faqid) => {
        //const faqId=faq.id
        //const url=global.state.apiUrl+"/api/faqs/"+faqid
        //console.log("url:"+url)
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

        // const optionsFaq = {
        //     method: 'GET',
        //     url: global.state.apiUrl+"/api/faqs",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // };  
        // axios.request(optionsFaq).then(function (response) {
        //   global.state.faqs=response.data.data
        //   console.log(global.state.faqs);
        //   console.log("del"+new Date().toISOString().slice(11, 23))
        // }).catch(function (error) {console.error(error);})
        // .then(console.log(""))
        router.push(`/`);
    }
    
    //const pdfPath = "";
    // console.log("faq.pdfId");
    // console.log(faq);
    // console.log(faq.pdfId);
    //console.log(faq.value.pdfId);    
    //const urlPDF=ref("")
    //const urlPDFTest=ref("C://Mes Projets//VueJS//Faq//src//data//Fen_VehiculeEntretienListe.pdf")
    //const urlPDFTest=ref("../data/Fen_VehiculeEntretienListe.pdf") 

    //const downloadPdf = () => { 
       
    // if(faq.pdfId>0){
    //     //urlPDFTest="../data/Fen_VehiculeEntretienListe.pdf"
    //     console.log("PDF")
    //     const optionsPdf = {
    //         method: 'GET',
    //         url: global.state.apiUrl+"/api/pdf/"+faq.pdfId,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }
    //     axios.request(optionsPdf).then(function (response) {            
    //         const filename=response.data.data[0].filename
    //         console.log(filename);
    //         const content = JSON.stringify(response.data.data[0].pdf);
    //         const options = {
    //             filename: 'example.pdf',
    //             image: { type: 'jpeg', quality: 0.98 },
    //             html2canvas: { scale: 2 },
    //             jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    //         };
    //         this.$htmlToPdf(content, options);            
    //     })
    // }
    //}
</script>

<template>
    <div class="button-container"> 
        <button class="button-one" @click="closeFaq">{{global.state.trad.Close}}</button> 
        <button class="button-one" v-if="global.state.admin" @click="deleteFaq(faq.id)">{{global.state.trad.Delete}}</button>
    </div>
    <div class="question-container">  
        <h1 class="question">
            {{faq.question}}
        </h1> 
        <h2>
            {{faq.answer}}
            <!-- <p v-for="l in faq.answer">
                {{l.label}}
            </p> -->
        </h2>
        <div class="image-container">
            <div v-if="faq.picture">
                <img :src="url+faq.picture.replace(/\\/g, '/')" alt="Image">
            </div>
            <!-- <div v-if="pdfPath">
                <iframe :src="pdfPath" width="100%" height="800px"></iframe>
            </div> -->
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
.question-container {
    display: grid;
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