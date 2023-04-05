<script setup>
    const {product}= defineProps(['product'])
</script>
<template>
    <div class="product">       
        <p>{{product.label}}</p>                
    </div>
</template>
<script scoped>
    // K_c5 {
    //     display: flex;
    //     flex: 1 1;
    //     flex-direction: row;
    //     flex-wrap: wrap;
    //     justify-content: flex-end;
    //     max-width: 150px;
    //     max-width: max-content;
    // }
    // anchor {
    //     color: #000;
    //     font-size: 1.3rem;
    // }
</script>