<template>
    <div class="newsletter-form">
      <v-form @submit.prevent="subscribe" ref="form">
        <v-alert
          v-if="message.text"
          :type="message.type"
          class="mb-4"
        >
          {{ message.text }}
        </v-alert>
  
        <v-text-field
          v-model="email"
          label="Your email address"
          type="email"
          :rules="emailRules"
          :disabled="loading"
          outlined
          dense
          required
        ></v-text-field>
  
        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          :disabled="loading"
          block
        >
          <span v-if="!loading">Subscribe</span>
          <span v-else>Processing...</span>
        </v-btn>
  
        <p class="disclaimer mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </v-form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from '@/axios';
  
  const email = ref('');
  const loading = ref(false);
  const message = ref({ text: '', type: '' });
  
  const emailRules = [
    v => !!v || 'Email is required',
    v => /.+@.+\..+/.test(v) || 'Valid email required'
  ];
  
  const subscribe = async () => {
    if (!(await validateForm())) return;
    
    loading.value = true;
    message.value = { text: '', type: '' };
  
    try {
      // 1. Get CSRF token
      await axios.get('/sanctum/csrf-cookie');
      
      // 2. Submit subscription
      const response = await axios.post('/api/newsletter/subscribe', {
        email: email.value
      });
  
      showSuccess('Please check your email to confirm subscription!');
      email.value = '';
    } catch (error) {
      handleError(error);
    } finally {
      loading.value = false;
    }
  };
  
  const validateForm = async () => {
    const { valid } = await form.value.validate();
    return valid;
  };
  
  const showSuccess = (text) => {
    message.value = { text, type: 'success' };
  };
  
  const handleError = (error) => {
    if (error.response?.status === 422) {
      message.value = {
        text: error.response.data.errors.email[0],
        type: 'error'
      };
    } else {
      message.value = {
        text: 'Subscription failed. Please try again later.',
        type: 'error'
      };
    }
  };
  </script>
  
  <style scoped>
  .newsletter-form {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .disclaimer {
    font-size: 0.8rem;
    color: #666;
    text-align: center;
  }
  </style>