<template>
  <v-main>
    <v-container fluid fill-height class="login-background">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="10" class="pa-6 rounded-lg">
            <v-form @submit.prevent="handleLogin" ref="form">
              <div class="text-center mb-6">
                <h1 class="text-h4 font-weight-bold teal--text text--darken-2">Welcome Back to Your Community</h1>
                <p class="text-subtitle-1 mt-2">
                  Connect with members, share experiences, and stay engaged.
                </p>
              </div>

              <!-- Success Message -->
              <v-alert v-if="successMessage" type="success" class="mb-4">
                {{ successMessage }}
              </v-alert>

              <!-- Error Message -->
              <v-alert v-if="error" type="error" class="mb-4">
                {{ error }}
              </v-alert>

              <!-- Email Input -->
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
              ></v-text-field>

              <!-- Password Input -->
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
              ></v-text-field>

              <!-- Remember Me -->
              <div class="d-flex justify-space-between align-center mb-2">
                <v-checkbox 
                  v-model="rememberMe" 
                  label="Keep me logged in" 
                  color="teal darken-2"
                ></v-checkbox>
                <router-link 
                  to="/forgot-password" 
                  class="teal--text text--darken-2 text-body-2"
                >
                  Forgot password?
                </router-link>
              </div>

              <!-- Submit Button -->
              <v-btn 
                block 
                color="teal darken-2" 
                dark 
                class="mt-4" 
                large 
                type="submit" 
                :loading="loading"
                :disabled="loading"
              >
                Log In
              </v-btn>

              <!-- Signup Link -->
              <div class="text-center mt-6">
                <p>
                  New to the community?
                  <router-link 
                    to="/signup" 
                    class="teal--text text--darken-2 font-weight-medium"
                  >
                    Join Us
                  </router-link>
                </p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rememberMe: false,
      loading: false,
      error: '',
      successMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.successMessage = '';
      
      // Validate form
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      try {
        // 1. First get CSRF cookie (Vue CLI version)
        await axios.get(`${this.apiUrl}/sanctum/csrf-cookie`);

        // 2. Attempt login
        const response = await axios.post(`${this.apiUrl}/login`, {
          email: this.email,
          password: this.password,
          remember: this.rememberMe
        }, {
          headers: {
            'Accept': 'application/json',
          },
          withCredentials: true
        });

        // Handle success
        this.successMessage = 'Login successful! Redirecting...';
        
        // Store auth data
        const token = response.data.token;
        const user = response.data.user;
        
        localStorage.setItem('auth-token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set axios defaults
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Redirect
        setTimeout(() => {
          this.$router.push('/WelcomePage');
        }, 1500);

      } catch (err) {
        // [Keep the same error handling logic]
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    apiUrl() {
      return process.env.VUE_APP_API_URL || 'http://localhost:8000/api';
    }
  }
};
</script>

<style scoped>
.login-background {
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%);
  min-height: 100vh;
}
</style>