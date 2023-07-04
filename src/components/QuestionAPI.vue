<script setup>
    //import {defineProps} from "vue"
    import {useRouter} from "vue-router"
    import product from "../data/product.json"
    import global from "../global"
    import {ref} from 'vue'
    //import jsPDF from "jsPDF"
    import axios from 'axios'
    const router=useRouter()
    const {faq,index}= defineProps(['faq','index'])
    const navigateToFAQ=()=>{
        router.push(`/faq/${faq.id}`)
    }
    const label = ref(faq.answer)
    let isTruncked=true;
    let nbCaract=200;
    let truncatedLabel=ref(faq.answer);
    //console.log(truncatedLabel);
    //console.log(truncatedLabel.value.length);
    if (truncatedLabel.value.length>nbCaract) {                
        truncatedLabel.value=truncatedLabel.value.slice(0, nbCaract)+ '...(+)';  
    }
    //let truncatedLabel=products.value=product.filter(product=>(product.company==="55" || product.company===""))
    
    const prod=product.filter(product=>(product.id===faq.productId))//.slice(0, 1)

    let prodLet="" //"["+prod[0].label+"] " //.slice(0, 1)
    //console.log(global.state.produit);
    if (global.state.produit===0){
        prodLet="["+prod[0].label+"] "
    }
    const doTruncatLabel=()=>{
        //console.log(truncatedLabel.value);
        //console.log(isTruncked);
        //console.log(label.value);
        if (!isTruncked){
            isTruncked=true;
            if (label.value.length>nbCaract) {                
                truncatedLabel.value=label.value.slice(0, nbCaract)+'...(+)';
                //console.log(truncatedLabel.value);
                //return truncatedLabel.value + '...(+)'
            }
            else {
                //console.log("no slice");
                isTruncked=false;
                truncatedLabel.value=label.value
                //return label.value+ '...(*)'
                }
        }else{
            isTruncked=false;
            //console.log("desactive slice");
            truncatedLabel.value=label.value
            //return label.value;
        }
    }
    //const url = global.state.apiUrl+"/"
    // const doTruncatLabel = computed(() => {
    //     //console.log(f.answer.value);
    //     if (!isTruncked){
    //         isTruncked===true;
    //         if (label.value.length>200) {return label.value.slice(0, 200) + '...'}
    //         else {return label.value}
    //     }else{
    //         isTruncked===false;
    //         return label.value;
    //     }
    // })    
    //uploads/2023-02-28T082750_76_signature.jpeg'
    //const myLabel = ref(faq.answer);
    // let myHeight = ref(100);
    // // const myDiv = truncatedLabel.value;
    // onMounted(() => {
    //     watchEffect(() => {
    //         myHeight.value = truncatedLabel.value.offsetHeight+100;
    //     });
    // });
    // const urlPDF=ref("")
    // const downloadPdf = () => {
    //     const optionsPdf = {
    //         method: 'GET',
    //         url: global.state.apiUrl+"/api/pdf/"+faq.pdfId,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     };
    //     axios.request(optionsPdf).then(function (response) {
    //         const pdfBlob = new Blob([new Uint8Array(response.data.data[0].pdf.data)], { type: 'application/pdf' })
    //         urlPDF.value=URL.createObjectURL(pdfBlob)
    //         // const doc = new jsPDF()
    //         // // let ls_text=""
    //         // // for(var c in response.data.data[0].pdf.data){
    //         // //      ls_text+=String.fromCharCode(parseInt(c))
    //         // // }
    //         // // console.log(ls_text);
    //         // const tb=[] 
    //         // var li_i=0
    //         // for(var c in response.data.data[0].pdf.data){
    //         //     tb[li_i]=String.fromCharCode(parseInt(c))
    //         //     li_i++
    //         // }
    //         // doc.text(tb,10,10)
    //         // //doc.text(response.data.data[0].pdf.data,10,10)
    //         // doc.save(response.data.data[0].filename)

    //         //Pour afficher un PDF à partir d’un tableau ASCII récupéré avec Axios, vous pouvez convertir le tableau ASCII en un objet Blob et 
    //         //ensuite utiliser URL.createObjectURL(blob) pour créer une URL de l’objet Blob. Vous pouvez ensuite utiliser cette URL pour afficher le PDF dans votre application VueJS3.

    //     }).catch(function (error) {console.error(error);}) 
    // }     
</script>

<template>    
    <!--<RouterLink  class="question" :to="`/faqs/${faq.id}`">-->
    <!-- <div class="question" :style="{ width: boxWidth + 'px', height: boxHeight + 'px' }" @click="navigateToFAQ" > -->
    <!-- <div class="question">   -->
    <div class="question">
        <p @click="navigateToFAQ">{{prodLet}}{{faq.question}}</p>  
        <h1 @click="doTruncatLabel">{{truncatedLabel}}</h1>
        <h2 class="image-container">
            <div v-if="faq.picture">
                <h2 @click="navigateToFAQ">{{global.state.trad.ClicPrintScreen}}</h2>

                <!-- <img :src="url+faq.picture.replace(/\\/g, '/')" alt="Image"> -->
            </div>
            <div v-if="faq.pdfId">
                <h2 @click="navigateToFAQ">{{global.state.trad.ClicPdf}}</h2>
            </div>
            
        </h2>
    </div>
</template>

<style scoped>
.image-container {
    display: flex;
    justify-content: left;
    align-items: left;
    height: 100%;
    font-weight:lighter;
    margin-left: 30px;
    font-size:10px;
  }

  .image-container img {
    max-width: 20%;
    max-height: 20%;
  }
.question {   
    align-content: flex-start;
    box-shadow: 1px 1px 10px rgba(2, 2, 2, 0.1) ;
    margin-bottom: 35px;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 20px;
    transition: height 0.5s ease;
}
.question p{
    margin-left: 20px;
    margin-bottom: 5px;
    font-weight: bold;
    font-size:25px;
    padding-left: 1px;
}
.question h1{
    margin-left: 20px;   
    font-weight:lighter;
    font-size:larger;
    padding-left: 10px;
}
.question .question-text {    
    padding-left: 10px;
}
.question .question-text h1 {
    font-weight: bold;
    padding-left: 10px;
}
h2 {
    color: rgb(21, 119, 73);
    font-size:medium
}
</style>