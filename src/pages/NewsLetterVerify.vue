<template>
    <v-container>
      <v-alert
        :type="alertType"
        class="mt-12"
      >
        {{ alertMessage }}
      </v-alert>
      
      <v-btn 
        v-if="success"
        color="primary"
        class="mt-4"
        to="/"
      >
        Return Home
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const alertMessage = ref('Verifying your subscription...');
  const alertType = ref('info');
  const success = ref(false);
  
  onMounted(async () => {
    try {
      await axios.get(`/api/newsletter/verify/${route.params.token}`);
      alertMessage.value = 'Email verified successfully!';
      alertType.value = 'success';
      success.value = true;
    } catch (error) {
      alertMessage.value = error.response?.data?.message || 'Invalid verification link';
      alertType.value = 'error';
    }
  });
  </script>