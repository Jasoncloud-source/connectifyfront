<!-- src/App.vue -->
<script setup>
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
//import NavBar from '@/components/NavBar.vue'
//import CommunityList from '@/components/CommunityList.vue'
const route = useRoute()
const hideLayout = ['login', 'register', 'welcome'].includes(route.name)
</script>

<template>
  <v-app>
    
    <AppLayout v-if="!hideLayout">
      <router-view />
    </AppLayout>
    <router-view v-else />
  </v-app>
  
</template>
