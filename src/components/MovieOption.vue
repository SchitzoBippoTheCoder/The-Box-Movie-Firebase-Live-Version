<template>
    <div id="movieOptionContainer">
        <img :src="moviePath" id="movieOptionSelect" ref="movieOptionSelect">
        <img src="../assets/ShoppingCartIcon.png" id="shoppingCartIcon" v-if="showIcon">
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const moviePath = ref("");
const movieOptionSelect = ref(null);

const props = defineProps({
    id: String,
    show: Boolean,
});

let showIcon = ref(false);
showIcon = props.show;

let search = axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
        api_key: "e06cb446302dcf3a3cb1358720141aad",
        append_to_response: "videos",
    }
})

let searchResult = search.then((movieData) => {

    moviePath.value = `https://image.tmdb.org/t/p/w500/${movieData.data.poster_path}`;
})

</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
}

#movieOptionContainer {
    position: relative;
}

#movieOptionSelect:hover {
    transform: scale(1.1);
    z-index: 100000;
}

#movieOptionSelect {
    width: 200px;
    height: 300px;

    aspect-ratio: 2/3;

    box-shadow: -7px 12px 8px black;

    display: block;

    margin: 0px 30px 30px 30px;
}

#shoppingCartIcon {
    border-radius: 10px;

    height: 35px;
    width: 35px;

    position: absolute;

    top: 15px;
    left: 19px;

    box-shadow: 0px 5px 10px black;
}
</style>