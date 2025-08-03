const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      product: 'Socks',
      description: 'Warm and cozy socks',
      image: './assets/images/socks_green.jpg',
      url: 'https://www.google.com',
      inStock: true, // new data property //
      inventory: 5, // new data property //
      onSale: true, // new data property //
      details: ['50% cotton', '30% wool', '20% polyester'],
      sizes: [
        { id: 1, size: 'Small' },
        { id: 2, size: 'Medium' },
        { id: 3, size: 'Large' },
      ],
      variants: [
      { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
      { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
    ]

    };
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    RemoveFromCart() {
      this.cart -= 1
    },
    updateImage(variantImage) {
    this.image = variantImage
   },
  },
});
// app.mount("#app");
