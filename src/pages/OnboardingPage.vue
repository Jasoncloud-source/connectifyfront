<template>
  <v-container class="onboarding-container">
    <v-stepper v-model="currentStep" vertical class="elevation-0">
      <!-- Progress Steps -->
      <v-stepper-header class="elevation-0">
        <v-stepper-step :complete="currentStep > 1" step="1" editable>
          Welcome
        </v-stepper-step>
        <v-stepper-step :complete="currentStep > 2" step="2" editable>
          Profile Setup
        </v-stepper-step>
        <v-stepper-step step="3" editable>
          Explore
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Step 1: Welcome -->
        <v-stepper-content step="1">
          <v-card flat class="text-center py-8">
            <v-img
              src="@/assets/connectify-logo.svg"
              max-height="120"
              contain
              class="mb-6 mx-auto"
            ></v-img>
            <h1 class="text-h3 mb-4 primary--text">Welcome to Connectify!</h1>
            <p class="text-h6 mb-6">
              Let's get you connected with people who share your interests
            </p>
            <v-btn
              color="primary"
              x-large
              @click="currentStep = 2"
              class="mt-4"
            >
              Get Started
            </v-btn>
          </v-card>
        </v-stepper-content>

        <!-- Step 2: Quick Profile -->
        <v-stepper-content step="2">
          <v-card flat>
            <h2 class="text-h4 mb-6">Complete Your Profile</h2>
            <v-form ref="profileForm" @submit.prevent="saveProfile">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.name"
                    label="Full Name"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="profile.interest"
                    :items="['Technology', 'Sports', 'Arts', 'Business', 'Education']"
                    label="Primary Interest"
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="profile.avatar"
                    label="Profile Photo (Optional)"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    outlined
                  ></v-file-input>
                </v-col>
              </v-row>
              <div class="d-flex justify-space-between mt-6">
                <v-btn text @click="currentStep = 1">Back</v-btn>
                <v-btn color="primary" type="submit">Continue</v-btn>
              </div>
            </v-form>
          </v-card>
        </v-stepper-content>

        <!-- Step 3: Explore/Create -->
        <v-stepper-content step="3">
          <v-card flat>
            <h2 class="text-h4 mb-6">Get Started on Connectify</h2>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-6 text-center" height="100%">
                  <v-icon x-large color="primary" class="mb-4">mdi-account-group</v-icon>
                  <h3 class="text-h5 mb-4">Explore Communities</h3>
                  <p class="mb-4">Discover existing communities that match your interests</p>
                  <v-btn 
                    color="primary"
                    @click="exploreCommunities"
                  >
                    Browse Communities
                  </v-btn>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card class="pa-6 text-center" height="100%">
                  <v-icon x-large color="primary" class="mb-4">mdi-plus-circle</v-icon>
                  <h3 class="text-h5 mb-4">Create Your Community</h3>
                  <p class="mb-4">Start your own community and invite others to join</p>
                  <v-btn 
                    color="primary"
                    @click="createCommunity"
                  >
                    Create New
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>

            <div class="text-center mt-8">
              <v-btn 
                text 
                @click="skipToDashboard"
                class="mt-4"
              >
                Skip to Dashboard
              </v-btn>
            </div>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'  // Add this line


const router = useRouter()
const userStore = useUserStore()

// Check if onboarding is already complete
onMounted(async () => {
  if (userStore.onboardingComplete) {
    router.push('/dashboard')
  }
})

const currentStep = ref(1)
const profileForm = ref(null)

const profile = ref({
  name: '',
  interest: '',
  avatar: null
})

const rules = {
  required: value => !!value || 'Required'
}

const saveProfile = async () => {
  const { valid } = await profileForm.value.validate()
  if (!valid) return
  
  // Simple Pinia action (no API call for prototype)
  userStore.setUserProfile(profile.value)
  currentStep.value = 3
}

const exploreCommunities = () => {
  router.push('/communities')
}

const createCommunity = () => {
  router.push('/communities/new')
}

const skipToDashboard = () => {
  userStore.markOnboardingComplete()
  router.push('/dashboard')
}
</script>

<style scoped>
.onboarding-container {
  max-width: 800px;
  margin-top: 40px;
}

.v-stepper {
  background: transparent;
}
</style>