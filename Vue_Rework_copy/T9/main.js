const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
    }
},
  methods: {
    updateCartAdd(id) {
      this.cart.push(id);
    },
    updateCartRemove(id) {
      const index = this.cart.indexOf(id);
      if (index !== -1) {
        this.cart.splice(index, 1);
        // this is T10 challenge
      }
    }
  }
})
