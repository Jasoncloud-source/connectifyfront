<template>
  <v-main>
    <v-container fluid fill-height class="signup-background">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="12" class="signup-card pa-6 rounded-xl shadow-lg">
            <v-form @submit.prevent="register" ref="form" class="fade-in">
              <div class="text-center mb-6">
                <h1 class="text-h4 font-weight-bold text-green-darken-2">
                  Join Your Community Today!
                </h1>
                <p class="text-subtitle-1 text-green-darken-1">
                  Connect with like-minded people and start collaborating!
                </p>
              </div>

              <v-alert v-if="successMessage" type="success" class="mb-4">
                {{ successMessage }}
              </v-alert>

              <v-alert v-if="errorMessage" type="error" class="mb-4">
                {{ errorMessage }}
              </v-alert>

              <!-- Name Field -->
              <v-text-field
                v-model="name"
                label="Full Name"
                prepend-inner-icon="mdi-account"
                :rules="[v => !!v || 'Name is required']"
                required
                outlined
                dense
                class="fade-in"
              ></v-text-field>

              <!-- Email Field -->
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                :rules="[
                  v => !!v || 'Email is required',
                  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
                ]"
                required
                outlined
                dense
                class="fade-in"
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="[v => !!v || 'Password is required']"
                required
                outlined
                dense
                class="fade-in"
              ></v-text-field>

              <!-- Confirm Password Field -->
              <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-check"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                :rules="[
                  v => !!v || 'Please confirm your password',
                  v => v === password || 'Passwords must match'
                ]"
                required
                outlined
                dense
                class="fade-in"
              ></v-text-field>

              <v-btn
                block
                class="signup-btn rounded-lg text-body-1 font-weight-bold"
                color="green darken-2"
                dark
                large
                type="submit"
                :loading="loading"
              >
                Let's Get Started!
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const form = ref(null);

// Form data
const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// UI states
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// API configuration
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:8000/api';

const register = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;

  try {
    await axios.get(`${apiUrl}/sanctum/csrf-cookie`);
    const response = await axios.post(`${apiUrl}/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    }, {
      headers: { 'Accept': 'application/json' },
      withCredentials: true
    });

    successMessage.value = 'Registration successful! Redirecting...';
    localStorage.setItem('auth-token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    setTimeout(() => router.push({ name: 'WelcomePage' }), 1500);
  } catch (error) {
    errorMessage.value = error.response?.status === 422
      ? Object.values(error.response.data.errors).flat().join(' ')
      : error.response?.data.message || 'Registration failed';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.signup-background {
  background: linear-gradient(to right, #c8e6c9, #81c784);
  min-height: 100vh;
}

.signup-btn {
  transition: background-color 0.3s ease-in-out;
}
.signup-btn:hover {
  background-color: #66bb6a !important;
}

.signup-card {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
.signup-card:hover {
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.5s ease-in-out forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
