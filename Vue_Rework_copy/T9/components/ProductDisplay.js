app.component('ProductDisplay', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        details : {
            type: Array,
            required: true
            // this is T9 challenge
        },
    },
    template:
    /*html*/
    `<div class="product-image">
				<img v-bind:src="displayImage" :class="{ 'out-of-stock-img': !inStockComputed }" />
			</div>

			<div class="product-info">
				<ul>
					<h1 v-if="onSale">{{title2}}</h1>
					<h1 v-else>{{title1}}</h1>
					<h2>{{ description }}</h2>


					<ul>
						<li v-for="detail in details">{{ detail }}</li>
					</ul>

					<!-- Display sizes below the details list -->
					<div class="sizes-row">
						<span
							v-for="size in sizes"
							:key="size.id"
							class="size-item"
							:class="{ selected: selectedSize === size.id }"
							@click="selectedSize = size.id"
						>
							{{ size.size }}
						</span>
					</div>
				</ul>

				<p v-if="inventory > 10">In Stock</p>
				<p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
				<p v-else>Out of Stock</p>

				<div class="color-circles-row">
					<div
						v-for="(variant, index) in variants"
						:key="variant.id"
						@mouseover="updateImage(variant.image, index)"
						class="color-circle"
						:style="{ backgroundColor: variant.color }"
					></div>
				</div>
                <p>Shipping: {{ shipping }}</p>

				<div class="button-row">
					<button
						class="AddButton"
						:class="{ disabledButton: !inStockComputed }"
						:disabled="!inStockComputed"
						@click="addToCart"
					>
						Add to Cart
					</button>

					<button class="RemoveButton" @click="RemoveFromCart">Remove</button>
					<!-- This is T6 challenge -->
				</div>
			</div>`,
            data() {
    return {
      product: 'Socks',
      brand: 'VUE',
      SaleCondition: 'is on sale',
      description: 'Warm and cozy socks',
      image: './assets/images/socks_green.jpg',
      url: 'https://www.google.com',
      inventory: 100,
      onSale: true,

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
      selectedSize: null,

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
    },
    title1() {
      return this.brand + ' ' + this.product;
    },
    title2() {
        return this.brand + ' ' + this.product+ ' ' + this.SaleCondition;
    },
    shipping() {
      if (this.premium) {
        return 'Free Shipping';
      }
      return 'Shipping: $2.99';
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    RemoveFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
    },
    updateImage(variantImage, index) {
      this.selectedVariant = index;
    },
  },

})
