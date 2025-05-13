<script setup>
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
const route = useRoute()

// Add 'onboarding' to routes that shouldn't use the layout
const hideLayout = ['login', 'register', 'welcome', 'onboarding'].includes(route.name)
</script>

<template>
  <v-app>
    <AppLayout v-if="!hideLayout">
      <router-view />
    </AppLayout>
    <router-view v-else />
  </v-app>
</template>