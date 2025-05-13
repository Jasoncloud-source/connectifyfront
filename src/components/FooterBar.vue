<template>
    <v-footer color="teal darken-4">
      <v-row justify="center" no-gutters>
        <!-- Navigation Links -->
        <v-btn
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
          active-class="border"
        >
          {{ link.text }}
        </v-btn>
        
        <!-- Copyright Section -->
        <v-col class="text-center mt-4" cols="12">
          <strong>Community App</strong> &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Navigation links tailored for community app
  const links = ref([
  { text: 'Home', route: '/' },
  { text: 'About Us', route: '/about-us' },
  { text: 'Community Events', route: '/event' },
  { text: 'Contact Us', route: '/contact-us' },
  { text: 'Login', route: '/login' },
  { text: 'Sign Up', route: '/signup' },
{text: 'Communities', route: '/communities' },
  { text: 'Create Community', route: '/create-community' },
  { text: 'Dashboard', route: '/dashboard' },
  { text: 'Onboarding', route: '/onboarding' }
]);

  
  </script>
  
  <style scoped>
  /* Optionally add styles if needed */
  </style>
  