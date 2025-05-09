<template>
  <v-container class="onboarding-container">
    <!-- Progress Stepper -->
    <v-stepper v-model="currentStep" vertical class="elevation-0">
      <v-stepper-header class="elevation-0">
        <v-stepper-step
          v-for="(step, index) in steps"
          :key="index"
          :complete="currentStep > index + 1"
          :step="index + 1"
          editable
          @click="currentStep = index + 1"
        >
          {{ step.title }}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- Step 1: Welcome -->
        <v-stepper-content step="1">
          <v-card class="mb-12" flat>
            <v-row align="center">
              <v-col cols="12" md="6">
                <h1 class="text-h3 mb-4 primary--text">Welcome to MyCommunityApp!</h1>
                <p class="text-h6 mb-6">
                  We're excited to have you here. Let's get you set up.
                </p>
                <v-btn
                  color="primary"
                  x-large
                  @click="currentStep = 2"
                >
                  Get Started
                </v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  src="@/assets/images/welcome-illustration.svg"
                  alt="Welcome illustration"
                  contain
                  max-height="300"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-stepper-content>

        <!-- Step 2: Profile Setup -->
        <v-stepper-content step="2">
          <v-card class="mb-12" flat>
            <h2 class="text-h4 mb-6">Complete Your Profile</h2>
            
            <v-form ref="profileForm" @submit.prevent="saveProfile">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.firstName"
                    label="First Name"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="profile.lastName"
                    label="Last Name"
                    :rules="[rules.required]"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="profile.bio"
                    label="Short Bio"
                    outlined
                    rows="3"
                    hint="Tell others a bit about yourself"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="profile.interests"
                    :items="interestOptions"
                    label="Your Interests"
                    multiple
                    chips
                    outlined
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="profile.avatar"
                    label="Profile Picture"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    outlined
                  ></v-file-input>
                </v-col>
              </v-row>
              
              <div class="d-flex justify-space-between mt-6">
                <v-btn
                  text
                  large
                  @click="currentStep = 1"
                >
                  Back
                </v-btn>
                <v-btn
                  color="primary"
                  large
                  type="submit"
                  :loading="savingProfile"
                >
                  Save & Continue
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-stepper-content>

        <!-- Step 3: Community Discovery -->
        <v-stepper-content step="3">
          <v-card class="mb-12" flat>
            <h2 class="text-h4 mb-6">Discover Communities</h2>
            <p class="text-body-1 mb-6">
              Based on your interests, we recommend these communities:
            </p>
            
            <v-row v-if="loadingCommunities">
              <v-col cols="12" class="text-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-col>
            </v-row>
            
            <template v-else>
              <v-row>
                <v-col
                  v-for="community in recommendedCommunities"
                  :key="community.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-card>
                    <v-img
                      :src="community.image"
                      height="150"
                      class="align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    >
                      <v-card-title class="white--text">
                        {{ community.name }}
                      </v-card-title>
                    </v-img>
                    <v-card-text>
                      <p class="text-body-2 mb-2">{{ community.description }}</p>
                      <v-chip
                        v-for="tag in community.tags"
                        :key="tag"
                        small
                        class="mr-1 mb-1"
                      >
                        {{ tag }}
                      </v-chip>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        text
                        @click="joinCommunity(community.id)"
                      >
                        Join
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
              
              <div class="d-flex justify-space-between mt-6">
                <v-btn
                  text
                  large
                  @click="currentStep = 2"
                >
                  Back
                </v-btn>
                <v-btn
                  color="primary"
                  large
                  @click="completeOnboarding"
                >
                  Finish Setup
                </v-btn>
              </div>
            </template>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const currentStep = ref(1)
const savingProfile = ref(false)
const loadingCommunities = ref(false)

const steps = [
  { title: 'Welcome' },
  { title: 'Profile Setup' },
  { title: 'Join Communities' }
]

const profile = ref({
  firstName: '',
  lastName: '',
  bio: '',
  interests: [],
  avatar: null
})

const interestOptions = [
  'Sports', 'Technology', 'Art', 'Music', 
  'Cooking', 'Travel', 'Reading', 'Photography',
  'Gardening', 'Volunteering', 'Parenting', 'Fitness'
]

const recommendedCommunities = ref([])

const rules = {
  required: value => !!value || 'This field is required'
}

const saveProfile = async () => {
  const { valid } = await profileForm.value.validate()
  if (!valid) return
  
  savingProfile.value = true
  try {
    await userStore.updateProfile(profile.value)
    currentStep.value = 3
    loadRecommendedCommunities()
  } finally {
    savingProfile.value = false
  }
}

const loadRecommendedCommunities = async () => {
  loadingCommunities.value = true
  try {
    // This would be an API call in a real app
    recommendedCommunities.value = [
      {
        id: 1,
        name: 'Local Hiking Group',
        description: 'For outdoor enthusiasts who love to explore nature trails',
        image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7',
        tags: ['Outdoors', 'Hiking', 'Nature']
      },
      {
        id: 2,
        name: 'Tech Enthusiasts',
        description: 'Discuss the latest in technology and innovation',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        tags: ['Technology', 'Innovation', 'Gadgets']
      },
      {
        id: 3,
        name: 'Book Club',
        description: 'Monthly book discussions and literary events',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
        tags: ['Reading', 'Literature', 'Books']
      }
    ]
  } finally {
    loadingCommunities.value = false
  }
}

const joinCommunity = (communityId) => {
  // Add logic to join community
  const community = recommendedCommunities.value.find(c => c.id === communityId)
  if (community) {
    community.joined = true
  }
}

const completeOnboarding = () => {
  userStore.completeOnboarding()
  router.push('/')
}
</script>

<style scoped>
.onboarding-container {
  max-width: 1000px;
  margin-top: 32px;
}

.v-stepper {
  background: transparent;
}

.v-stepper__content {
  padding: 0;
}
</style>