const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const CartItem = {
  props: ['cartItem'],
  template: `
    <li class="shopping__item">
      <img class="shopping__item-img" :src="cartItem.img" alt="Shopping item 1">
      <div class="shopping__item-description">
        <h2 class="shopping__item-title">{{ cartItem.product_name }}</h2>
        <ul class="shopping__item-specifications">
          <li class="shopping__item-price">Price: <span class="shopping__item-cost">{{ "$" + cartItem.price.toFixed(2) }}</span>
          </li>
          <li class="shopping__item-color">Color: <span class="shopping__item-value">Blue</span>
          </li>
          <li class="shopping__item-size">Size: <span class="shopping__item-value">Xl</span></li>
          <li class="shopping__item-quantity"> Quantity: <span class="shopping__item-quantity-value">{{ cartItem.quantity }}</span></li>
        </ul>
      </div>
      <a class="shopping__item-delete" @click.prevent="$emit('remove', cartItem)" href="#">
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path
                  d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"/>
        </svg>
      </a>
  </li>`
};

const Cart = {
  data() {
    return {
      cartItems: [],
      grandTotal: 0
    }
  },

  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let item of data.contents) {
          this.$data.cartItems.push(item);
        }
        this.$data.grandTotal = data.amount;
      });
  },

  methods: {
    remove(item) {
      this.$data.grandTotal -= item.price;
      if (item.quantity > 1) {
        this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
          .then(data => {
            if (data.result === 1) {
              item.quantity--;
            }
          });
      } else {
        this.$parent.deleteJson(`/api/cart/${item.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result === 1) {
              this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
          });
      }
    },
  },

  components: {
    "cart-item": CartItem,
  },

  template: `
    <section class="shopping container">
      <h2 class="visually-hidden">Shopping field</h2>
      <section class="shopping__cart">
        <h2 class="visually-hidden">Shopping cart</h2>
        <ul class="shopping__list">
          <p class="shopping__list_empty" v-if="!cartItems.length">Cart is empty</p>
          <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @remove="remove"></cart-item>
        </ul>
       </section>
      <section class="shopping__order">
        <h2 class="visually-hidden">Order information</h2>
        <form class="shopping__form" action="#">
          <fieldset class="shopping__order-adress">
            <legend class="shopping__legend">shipping adress</legend>
            <input class="shopping__input" type="text" id="adress" placeholder="Bangladesh">
            <label class="visually-hidden" for="adress">Adress</label>
            <input class="shopping__input" type="text" id="state" placeholder="State">
            <label class="visually-hidden" for="state">State</label>
            <input class="shopping__input" type="text" id="postcode" placeholder="Postcode / Zip">
            <label class="visually-hidden" for="postcode">Postcode</label>
            <button class="shopping__quote" type="button">get a quote</button>
          </fieldset>
          <fieldset class="shopping__checkout">
            <h4 class="shopping__sub-total">sub total <span class="shopping__sub-total-price">{{ "$" + grandTotal.toFixed(2) }}</span>
            </h4>
            <h3 class="shopping__grand-total">grand total <span class="shopping__grand-total-price">{{ "$" + grandTotal.toFixed(2) }}</span></h3>
            <hr/>
            <button class="shopping__proceed" type="submit">proceed to checkout</button>
          </fieldset>
        </form>
      </section>
    </section>
    `
};

export {
  Cart
};