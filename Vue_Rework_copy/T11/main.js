const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
    }
},
  methods: {
    updateCartAdd() {
      this.cart.push(1); // Add an item (can be any value, e.g. product id)
    },
    updateCartRemove() {
      if (this.cart.length > 0) {
        this.cart.pop(); // Remove the last item
        // this is T10 challenge
      }
    }
  }
})
