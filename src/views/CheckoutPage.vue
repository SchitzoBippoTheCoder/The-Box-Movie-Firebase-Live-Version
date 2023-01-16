<template>
    <HeaderToShop title="Checkout" tagline="Thank you for shopping with us!" button-value="STORE"></HeaderToShop>
    <div id="backgroundImage">

    </div>
    <div id="paymentContainer">
        <h2 id="checkoutTitle">PAYMENT INFO</h2>
        <hr id="paymentInfoLine"/>
        <h3 id="checkoutHeader">Order Details</h3>
        <div id="paypalContainer">
            <img src="../assets/paypal-3384015_640.png" id="paypalLogo">
            <input id="paymentButton" type="button" value="PAYPAL" />
        </div>
        <div id="creditContainer">
            <img src="../assets/card-6518547_640.png" id="creditLogo">
            <input id="paymentButton1" type="button" value="CREDIT/DEBIT" />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p id="checkoutArgeement">By completing this purchse, you agree to The Box's Terms and Conditions</p>
        <input type="button" value="COMPLETE PURCHASE" id="checkoutButton" />
    </div>
    <div id="productContainer">
        <h2 id="checkoutTitle">SUMMARY</h2>
        <hr id="line" />
        <h3 id="checkoutHeader">Your Movie Box</h3>
        <p class="checkoutContent">{{ finalMovieLength }} total item(s)</p>
        <ul id="overflowBox">
            <li class="checkoutContentList" v-for="option in finalMovieOptions">{{ option }}</li>
        </ul>
        <hr id="line" />
        <br />
        <h3 class="checkoutContent">Total: </h3>
        <h3 class="checkoutContentLine">${{ parseFloat(finalMovieLength * 1.13).toFixed(2) }}</h3>
    </div>
</template>

<script setup>
import axios from 'axios';

import HeaderToShop from "../components/HeaderToShop.vue"

import { ref } from "vue";

import { indexStore } from "../store/index.js"
import { storeToRefs } from 'pinia';


const index = indexStore();
const { movieItems } = storeToRefs(index);

let finalMovieOptions = ref([]);
let finalMovieLength = ref(movieItems.value.length);

for (let i = 0; i < movieItems.value.length; i++) {
    let search = axios.get(`https://api.themoviedb.org/3/movie/${movieItems.value[i]}`, {
        params: {
            api_key: "e06cb446302dcf3a3cb1358720141aad",
            append_to_response: "videos",
            include_adult: false,
        }
    })

    let searchResult = search.then((movieData) => {
        finalMovieOptions.value.push(movieData.data.title);
    })
}

</script>

<style scoped>
.productList {
    margin-left: 550px;
}

#overflowBox {
    height: 130px;

    overflow-y: scroll;
}

#backgroundImage {
    position: fixed;

    top: 0px;
    left: 0px;

    z-index: -1000000;

    height: 100vh;
    width: 100%;
    background-image: url('../assets/movieBackground.jpg');
    background-size: cover;

    filter: brightness(20%);
}

#itemContainer {

    position: relative;

    margin-top: 20px;
    margin-bottom: 30px;

    z-index: 100000;

    overflow-y: scroll;
    overflow-x: hidden;

    top: 15px;

    height: 485px;
}

#overflowBox::-webkit-scrollbar {
    display: none;
}

#checkoutTitle {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 30px;
    margin-left: 35px;
}

#checkoutHeader {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: 475;

    margin-top: 25px;
    margin-left: 35px;
}

.checkoutContent {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 5px;

    width: 250px;

    display: inline;
}

.checkoutContentList {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 5px;

    width: 250px;

    color: black;
}

.checkoutContentLine {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 485px;
    margin-bottom: 5px;

    width: 250px;

    display: inline;
}

#checkoutArgeement {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 35px;

    width: 300px;
}

#paymentContainer {

    position: fixed;

    top: 125px;
    left: 150px;

    background-color: whitesmoke;

    height: 450px;
    width: 375px;


    box-shadow: -5px 10px 5px black;

    z-index: 99999999;

    border-radius: 10px;
}

#productContainer {

    position: fixed;

    top: 125px;
    left: 550px;

    background-color: whitesmoke;

    height: 450px;
    width: 650px;


    box-shadow: -5px 10px 5px black;

    z-index: 99999999;

    border-radius: 10px;

    margin-left: 5px;

    padding-left: 0px;
}


#line {
    width: 90%;
}

#paymentInfoLine {
    width: 83%;
}

#checkoutButton {
    outline: transparent;
    border-color: transparent;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;
    text-align: center;

    background-color: white;
    color: black;

    height: 30px;
    width: 200px;

    letter-spacing: 1px;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 10px;

    border-style: solid;
    border-color: black;
    border-radius: 5px;
}

#paymentButton {
    outline: transparent;
    border-color: transparent;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;

    background-color: white;
    color: black;

    height: 30px;
    width: 250px;

    letter-spacing: 1px;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 10px;

    border-style: solid;
    border-color: black;
    border-radius: 5px;
    display: inline;

    text-align: left;
    padding-left: 22px;
}

#paymentButton1 {
    outline: transparent;
    border-color: transparent;

    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;

    background-color: white;
    color: black;

    height: 30px;
    width: 245px;

    letter-spacing: 1px;

    margin-top: 0px;
    margin-left: 10px;
    margin-bottom: 10px;

    border-style: solid;
    border-color: black;
    border-radius: 5px;

    display: inline;

    text-align: left;
    padding-left: 17px;
}

#paymentButton:hover {
    border-style: solid;

    color: white;
    background-color: black;
    border-color: black;
    border-width: 2px;
}

#paymentButton1:hover {
    border-style: solid;

    color: white;
    background-color: black;
    border-color: black;
    border-width: 2px;
}

#checkoutButton:hover {
    border-style: solid;

    color: white;
    background-color: black;
    border-color: black;
    border-width: 2px;
}

#blurItemBackground {
    position: fixed;

    height: 512px;
    width: 100vw;

    background-color: black;
    opacity: 0.7;

    margin-top: 100px;

    top: 0px;
}

#paypalContainer {
    margin-left: 15px;
    margin-bottom: 1px;
}

#creditContainer {
    margin-left: 45px;
    margin-bottom: 5px;
}

#paypalLogo {
    height: 26px;
    width: 26px;

    border-style: solid;
    border-color: black;
    border-radius: 5px;

    border-width: 2px;
}

#creditLogo {
    height: 26px;
    width: 26px;

    border-style: solid;
    border-color: black;
    border-radius: 5px;

    border-width: 2px;

    margin-left: -10px;
}
</style>