<script setup>
    import QuestionDesc from "../components/QuestionDesc.vue"
    import {useRoute} from "vue-router"
    //import {onMounted} from "vue"
    import {ref} from "vue"
    import global from "../global"
    import axios from "axios";
    //import {ref} from "vue"
    //import faqs from "../data/faqs.json"
    var faq=ref([])
    const route=useRoute()
    //const faqID=parseInt(route.params.id)     
    //console.log(global.state.apiUrl);
    const options = {
        method: 'GET',
        url: global.state.apiUrl+"/api/faqs/"+route.params.id,
        headers: {
            'Content-Type': 'application/json'
        }
        //,data: {id:faqID}
    };
    axios.request(options).then(function (response) {
            //console.log(response.data.data[0]);
            faq.value=response.data.data[0];
            //console.log("faq:"+faq.question);
        }).catch(function (error) {console.error(error);});
</script>

<template>    
    <div>                   
        <QuestionDesc
            :faq="faq"
        />
    </div>
</template>