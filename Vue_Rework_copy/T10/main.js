const app = Vue.createApp({
  data() {
    return {
      cart: 0,
      premium: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
    }
},
  methods: {
    updateCartAdd() {
      this.cart += 1;
    },
    updateCartRemove() {
      if (this.cart > 0) {
        this.cart -= 1;
        // this is T10 challenge
      }
    }
  }
})
