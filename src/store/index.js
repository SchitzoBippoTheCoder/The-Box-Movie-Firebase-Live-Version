import { firestore } from "../firebase/index";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import  axios from "axios";
import { isProxy, toRaw } from 'vue';

export const indexStore = defineStore("main", {
  state: () => ({
    movieItems: [],
    previousResultOptions: [],
    resultOptions: [],
    createdDiscoveryList: false,
    currentDisplayPage: 0,
  }),
  getters: {},
  actions: {
    // Fills Firestore with information
    async populateFirestore() {
      const genres = new Map([[28, "Action"], [10751, "Family"], [878, "Science Fiction"], [12, "Adventure"], [14, "Fantasy"]]);

      genres.forEach(async (value, key) => {
        let data = (await axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "e06cb446302dcf3a3cb1358720141aad",
            with_genres: key,
            include_adult: false,
          }
        })).data.results;
        data = data.map((movie) => {
          return {
            id: movie.id,
          }
        });
        await setDoc(doc(firestore, "Genre", value), { data });
      });
    },

    // Fill display options with movies from Firestore
    async getMovies(genre) {
      this.previousResultOptions = (await getDoc(doc(firestore, "Genre", genre))).data().data;
      
      for (let i = 0; i < this.previousResultOptions.length; i ++) {
        this.resultOptions.push(this.previousResultOptions[i]);
      }
    },

    // Add items to the cart
    addMovieItem(movieObject) {
      this.movieItems.push(movieObject);
    },

    // Remove items from the cart
    removeMovieItem(arraySlot) {
      this.movieItems.splice(arraySlot, 1);
    },

    // Add movie options to the shopping area
    addResultOption(id) {
      this.resultOptions.push({ id });
    },

    // Makes sure that movie options aren't added again when the page loads more then once
    finishList() {
      this.createdDiscoveryList = true;
    },

    resetList() {
      this.createdDiscoveryList = false;
    },

    clearResultOption() {
      this.resultOptions.length = 0;
    }
  },
});

// Methods can also be async
// Learn getters - modify state variables without actually changing them
