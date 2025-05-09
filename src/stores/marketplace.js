import { defineStore } from 'pinia';

export const useMarketplaceStore = defineStore('marketplace', {
  state: () => ({
    products: [],
    cart: [],
  }),
  actions: {
    async fetchProducts() {
      const res = await axios.get('/api/products');
      this.products = res.data;
    },
    addToCart(product) {
      this.cart.push(product);
    },
  },
});