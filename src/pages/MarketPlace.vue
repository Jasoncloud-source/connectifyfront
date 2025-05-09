<template>
    <v-container>
      <v-row>
        <v-col v-for="product in store.products" :key="product.id" cols="12" md="4">
          <v-card>
            <v-img :src="product.image" />
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-actions>
              <v-btn @click="store.addToCart(product)" color="primary">Add to Cart</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useMarketplaceStore } from '@/stores/marketplace';
  const store = useMarketplaceStore();
  
  // Fetch products on load
  store.fetchProducts();
  </script>