<template>
  <v-container fluid class="welcome-background">
    <v-row justify="center" align="center" class="pt-16">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="welcome-card rounded-lg shadow-md" elevation="6"> <!-- Reduced elevation -->

          <!-- Welcome Header -->
          <v-card-title class="text-center teal darken-2 white--text py-4">
            <h1 class="text-h4 font-weight-bold">Welcome to Our Community</h1>
          </v-card-title>

          <!-- User Profile Section (Authenticated Users) -->
          <v-card-text v-if="isAuthenticated" class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img :src="userPhotoUrl" alt="User Photo" cover lazy-src="/images/default-avatar.png"></v-img> <!-- Lazy-loaded avatar -->
            </v-avatar>

            <div class="text-h5 font-weight-medium">{{ userName }}</div>
            <div class="text-h6 font-weight-medium darken-4">{{ userEmail }}</div> <!-- Improved contrast -->
            <div class="text-body-2 teal--text font-weight-medium">{{ userRole }}</div>

            <v-divider class="my-6"></v-divider>

            <p class="text-body-2 mx-auto welcome-text">
              Welcome to the community! We are thrilled to have you here. Connect, collaborate, and share your experiences with others in our growing community.
            </p>

            <!-- Action Buttons -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn block color="teal darken-1" dark large to="/feed" class="hover-opacity">
                  <v-icon left>mdi-comment</v-icon> View Feed
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6">
                <v-btn block outlined color="teal darken-1" large to="/profile" class="hover-opacity">
                  <v-icon left>mdi-account-edit</v-icon> Edit Profile
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Guest View (if not authenticated) -->
          <v-card-text v-else class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img src="/images/default-avatar.png" alt="Guest" cover lazy-src="/images/default-avatar.png"></v-img> <!-- Added fallback -->
            </v-avatar>

            <div class="text-h5 font-weight-medium">Hello, Guest</div>

            <v-divider class="my-6"></v-divider>

            <p class="text-body-2 mx-auto welcome-text">
              Welcome to the community platform! Engage, share, and collaborate with other members.
            </p>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuth } from '../services/auth.service'

const { isAuthenticated, currentUser, loadUserInfo } = useAuth()

onMounted(async () => {
  await loadUserInfo()
})

const userName = computed(() => currentUser.value?.name || 'Guest User')
const userEmail = computed(() => currentUser.value?.email || 'guest@example.com')
const userRole = computed(() => currentUser.value?.role?.name || 'Member')
const userPhotoUrl = computed(() => {
  return currentUser.value?.user_photo 
    ? `/storage/${currentUser.value.user_photo}` 
    : '/images/default-avatar.png' // Added fallback image
})
</script>

<style scoped>
.welcome-background {
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%);
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.welcome-card {
  border-radius: 16px;
  overflow: hidden;
}

.v-btn {
  border-radius: 8px;
}

.hover-opacity:hover {
  opacity: 0.85; /* Added subtle hover effect */
}

.v-divider {
  margin-top: 24px;
  margin-bottom: 24px;
}

.text-h4 {
  font-weight: bold;
}

.welcome-text {
  max-width: 85%;
  line-height: 1.6; /* Improved readability */
}
</style>