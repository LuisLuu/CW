const app = Vue.createApp({
  data() {
    return {
      product: 'Socks',
      description: 'Warm and cozy socks',
      image: './assets/images/socks_green.jpg',
      url: 'https://www.google.com',
      inStock: true,
      inventory: 5,
      onSale: true,
    };
  },
});
// app.mount("#app");
