<!-- src/layouts/AppLayout.vue -->
<template>
    <div class="app-layout">
      <!-- Navigation -->
      <NavBar />
      
      <!-- Main Content -->
      <v-main>
        <slot /> <!-- This will render your page content -->
      </v-main>
      
      <!-- Footer -->
      <FooterBar />
    </div>
  </template>
  
  <script setup>
  import NavBar from '@/components/NavBar.vue'
  import FooterBar from '@/components/FooterBar.vue'
  </script>
  
  <style scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>