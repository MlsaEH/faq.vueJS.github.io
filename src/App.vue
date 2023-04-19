<script setup>
    import {RouterView} from "vue-router"
    console.log(process.env.NODE_ENV);
    //import {RouterView} from "../node_modules/vue-router/dist/vue-router"
</script>

<template>    
    <div class="container">
        <RouterView/>
    </div>
</template>

<style scoped>
    .container {
        max-width: 1000px;
        margin: 0 auto;
    }
</style>