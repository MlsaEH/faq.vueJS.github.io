<script setup>
    import AddFaq from "../components/AddFaq.vue"
    //import AddFaq from "../components/addFaqPicture.vue"
    import {useRoute} from "vue-router"
    const route=useRoute()
</script>
<template>    
    <div>           
        <AddFaq/>
    </div>
</template>