<template>
    <div>
        <form @submit.prevent="submitForm">
          <div>
            <label for="imageInput">Choisir une image :</label>
            <input type="file" id="imageInput" ref="imageInput" style="display:none" @change="setImage">
            <button @click.prevent="selectImage">Parcourir</button>
          </div>
          <button type="submit">Envoyer</button>
          <button @click="addFaq">Add FAQ</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const image = ref(null);
    const imageInputRef = ref(null);

    const selectImage = () => {
        imageInputRef.value.click();
    };

    const setImage = (event) => {        
        image.value = event.target.files[0];
        console.log("setImage");
        console.log(image.value);
    };

    const addFaq=() => {
        console.log("ajout"+image.value);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var formdata = new FormData();
        formdata.append("question", "qq");
        formdata.append("answer", "pp");
        formdata.append("productId", "1");
        formdata.append("picture", image.value, "[PROXY]");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
        };

        fetch("http://localhost:3056/api/faq", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    const closeFaq=() => {
        console.log("close");
        router.push(`/`)
    }
</script>