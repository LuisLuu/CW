const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: 'Socks',
      description: 'Warm and cozy socks',
      image: './assets/images/socks_green.jpg',
      url: 'https://www.google.com',
    //   inStock: true, // new data property //
      inventory: 100, // new data property //
      onSale: true, // new data property //
      details: ['50% cotton', '30% wool', '20% polyester'],
      sizes: [
        { id: 1, size: 'Small' },
        { id: 2, size: 'Medium' },
        { id: 3, size: 'Large' },
      ],
      variants: [
      { id: 2234, color: 'green', quantity: 50, image: './assets/images/socks_green.jpg' },
      { id: 2235, color: 'blue', quantity: 0, image: './assets/images/socks_blue.jpg' },
    ],
      selectedVariant: 0,
      outOfStockImage: './assets/images/OutOfStock.png',
    //   this is T7 challenge: 'This is T7 challenge',

    };
  },

  computed: {
    inStockComputed() {
      return this.variants[this.selectedVariant].quantity > 0;
    },
    displayImage() {
      return this.inStockComputed
        ? this.variants[this.selectedVariant].image
        : this.outOfStockImage;
    }
  },
  methods: {
    addToCart() {
      if (this.variants[this.selectedVariant].quantity > 0) {
        this.cart += 1;
        this.variants[this.selectedVariant].quantity -= 1;
      }
    },
    RemoveFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
        this.variants[this.selectedVariant].quantity += 1;
      }
    },
    updateImage(variantImage, index) {
      this.selectedVariant = index;
    },
  },
});
// app.mount("#app");
