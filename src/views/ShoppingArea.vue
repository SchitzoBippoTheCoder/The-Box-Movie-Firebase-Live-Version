<template>
  <HeaderToLogin title="The Box" tagline="Discover new movies!" button-value="LOGOUT" id="headerToLogin">
  </HeaderToLogin>

  <div id="movieOptionContainer">
    <MovieOption v-for="options in displayOptions" :id="options.id" class="movieOption"
      @click="showMovieModal(options.id)" show="true">
    </MovieOption>
  </div>
  <div id="blurBackground" ref="blurBackground" @click="closeModal()"></div>
  <MovieInfoModal :button-value="buttonValue" :id="movieID" class="movieInfoModal" ref="movieInfoModal"
    v-if="showModal"></MovieInfoModal>
  <input type="button" value="X" id="closeButton" @click="closeModal()" ref="closeButton" />
  <div id="backgroundImage"></div>
  <img src="../assets/ShoppingBagIcon.png" id="shoppingBagIcon" @click="moveToCheckout()" />
  <h2 id="shoppingBagText" @click="moveToCheckout()">{{ itemLength }}</h2>
  <select id="genreSelect" @change="getGenres()" ref="selector">
    <option value="Action">Action</option>
    <option value="Family">Family</option>
    <option value="Science Fiction">Science Fiction</option>
    <option value="Adventure">Adventure</option>
    <option value="Fantasy">Fantasy</option>
  </select>
</template>

<script setup>
import axios from "axios";
import MovieOption from "../components/MovieOption.vue";
import MovieInfoModal from "../components/MovieInfoModal.vue";

import { ref, watch } from "vue";
import HeaderToLogin from "../components/HeaderToLoginInfo.vue";

import { indexStore } from "../store/index.js";
import { storeToRefs } from "pinia";

import router from "../router";

const index = indexStore()

const { movieItems } = storeToRefs(index);
const { resultOptions } = storeToRefs(index);
const { searchOptions } = storeToRefs(index);
const { createdDiscoveryList } = storeToRefs(index);

const itemLength = ref();
let isMovieMade = createdDiscoveryList.value;

let displayOptions = ref();

watch(() => {
  itemLength.value = movieItems.value.length;
  displayOptions = ref(resultOptions.value);
});

let showModal = ref(false);
let showError = ref(false);

let movieID = ref("");
let buttonValue = ref("PURCHASE");

const blurBackground = ref();
const closeButton = ref();

let movieInfoModal = ref();

let selector = ref();

index.clearResultOption();
index.getMovies("Action");

function showMovieModal(searchMovieID) {
  showModal.value = true;

  blurBackground.value.style.display = "block";
  closeButton.value.style.display = "block";

  movieID = searchMovieID;

  for (let i = 0; i <= movieItems.value.length; i++) {
    if (movieItems.value[i] === searchMovieID) {
      buttonValue.value = "REMOVE";
      break;
    } else {
      buttonValue.value = "PURCHASE";
    }
  }
}

function closeModal() {
  showModal.value = false;

  blurBackground.value.style.display = "none";
  closeButton.value.style.display = "none";
}

function moveToCheckout() {
  if (itemLength.value <= 0) {
    return;
  } else {
    router.push("/checkout-area");
  }
}

function getGenres() {
  index.clearResultOption();
  index.getMovies(selector.value.value);
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#genreSelect {
  position: absolute;

  width: 200px;
  -webkit-appearance: none;
  outline: none;

  left: 36px;
  top: 93px;

  padding-left: 5px;
  margin-left: 3px;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: 2000px;
  font-size: large;

  color: white;

  background-color: transparent;

  border-top-color: transparent;
  border-right-color: transparent;
  border-left-color: transparent;

  border-bottom-width: 0.75px;
  border-bottom-color: white;
  border-radius: 3.5px;
}

#genreSelect option {
  background-color: black;
  outline: none;

  border-radius: 5px;

  padding-left: 5px;
}

#movieOptionContainer {
  display: grid;

  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: 350px 350px 350px 350px;

  padding: 10px;

  top: 30px;

  left: 50%;
  transform: translate(-50%, 0%);
}

.movieOption {
  display: block;
}

.movieInfoModal {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10000;
}

#backgroundImage {
  position: fixed;

  top: 0px;
  left: 0px;

  z-index: -1;

  height: 100%;
  width: 100%;
  background-image: url("../assets/movieBackground.jpg");
  background-size: cover;

  filter: brightness(25%);
}

#closeButton {
  position: fixed;

  top: 7%;
  right: 5%;

  outline: transparent;
  border-color: transparent;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: normal;

  border-radius: 5px;

  background-color: black;
  color: white;

  padding-left: 7px;

  text-align: center;
  vertical-align: middle;

  height: 30px;
  width: 30px;

  z-index: 100000;

  display: none;
}

#closeButton:hover {
  border-style: solid;
  border-color: white;
  border-width: 2px;
}

#blurBackground {
  position: fixed;

  display: none;

  height: 100%;
  width: 100%;

  background-color: black;
  opacity: 0.7;

  z-index: 9999;

  top: 0px;
}

#shoppingBagIcon {
  border-radius: 10px;

  height: 75px;
  width: 75px;

  position: fixed;

  bottom: 20px;
  right: 25px;

  box-shadow: 0px 0px 10px black;

  z-index: 100000000000000000000000000000000;
}

#shoppingBagText {
  height: 75px;
  width: 75px;

  position: fixed;

  bottom: -24px;
  right: 25px;

  text-align: center;
  vertical-align: middle;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: bold;

  color: black;

  z-index: 100000000000000000000000000000000;
}
</style>
