<script setup>
    import {useRoute,useRouter} from "vue-router"
    import global from "../global"    
    const router=useRouter()
    const route=useRoute()
    global.state.nation=route.params.set.split('|')[0]
    global.state.produit=route.params.set.split('|')[1]
    global.state.produitUnique=route.params.set.split('|')[2]
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
        }
    // appel de la fonction pour sauvegarder une donnée dans un cookie
    setCookie("nation", global.state.nation, 365);
    setCookie("product", global.state.produit, 365);
    setCookie("productUnique", global.state.produitUnique);
    router.push(`/`);
</script>

<template>
    <div>
      <p>Paramètre "product" dans l'URL: {{ global.state.produit }}</p>
      <p>Paramètre "nation" dans l'URL: {{ global.state.nation }}</p>
    </div>
</template>