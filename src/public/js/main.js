import {Header} from "./components/HeaderComponent.js";
import {Footer} from "./components/FooterCompontent.js";
import {Catalog} from "./components/CatalogComponent.js";
import {Cart} from "./components/CartComponent.js";
import {Error} from "./components/ErrorComponent.js";
import {FeaturedItems} from "./components/FeaturedItems.js";

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const App = {
  el: '#app',

  components: {
    "my-header": Header,
    "my-footer": Footer,
    "catalog": Catalog,
    "cart": Cart,
    "error": Error,
    "featured-items": FeaturedItems
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error)
          this.$refs.error.text = error;
        });
    },

    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          console.log(error)
          this.$refs.error.text = error;
        });
    },

    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          console.log(error)
          this.$refs.error.text = error;
        });
    },

    deleteJson(url, data) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => {
          console.log(error)
          this.$refs.error.text = error;
        });
    },
  },
};

export {
  App
}