<template>
  <v-app>
    <v-main>
      <!-- Hero Section -->
      <v-parallax
        :src="heroImage"
        height="90vh"
        class="hero"
        lazy
      >
        <div class="hero-content d-flex flex-column align-center justify-center text-center">
          <h1 class="text-h2 text-md-h1 font-weight-bold mb-4 white--text">
            Welcome to MyCommunityApp
          </h1>
          <p class="text-h5 text-md-h4 mb-8 white--text">
            Make a difference in your community today. "Enrich your life as well as those around you."
          </p>
          <div class="cta-buttons">
            <v-btn
              color="primary"
              x-large
              rounded
              class="mr-4 mb-2"
              @click="$router.push('/signup')"
              aria-label="Sign up for MyCommunityApp"
            >
              Join Now
            </v-btn>
            <v-btn
              outlined
              x-large
              rounded
              color="white"
              @click="$router.push('/explore')"
              aria-label="Explore communities"
            >
              Explore Communities
            </v-btn>
          </div>
        </div>
      </v-parallax>

      <!-- About Section -->
      <v-container class="about-section py-16">
        <v-row align="center">
          <v-col cols="12" md="6" class="about-text">
            <h2 class="text-h3 text-center text-md-left mb-6 primary--text">Our Story</h2>
            <p class="text-body-1 mb-8">
              Founded in 2023, we connect people through shared interests and local activities. 
              Our platform brings neighbors together to build stronger communities.
            </p>
            
            <v-row class="features-grid">
              <v-col
                v-for="(feature, index) in features"
                :key="index"
                cols="12"
                sm="6"
                lg="4"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    class="feature-card transition-swing pa-6 text-center"
                  >
                    <v-icon
                      size="64"
                      color="primary"
                      class="mb-4"
                    >
                      {{ feature.icon }}
                    </v-icon>
                    <h3 class="text-h5 mb-3">{{ feature.title }}</h3>
                    <p class="text-body-1">{{ feature.description }}</p>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="about-image">
            <v-img
              :src="aboutImage"
              alt="People connecting in a community gathering"
              class="rounded-lg"
              :aspect-ratio="16/9"
              lazy
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- Popular Communities -->
      <v-sheet color="grey lighten-4" class="py-16">
        <v-container>
          <h2 class="text-h3 text-center mb-8 primary--text">Popular Communities</h2>
          <template v-if="loadingPopular">
            <p class="text-center">Loading popular communities...</p>
          </template>
          <template v-else-if="communityChunks.length === 0">
            <p class="text-center">No popular communities available at the moment.</p>
          </template>
          <v-carousel
            v-else
            cycle
            height="400"
            hide-delimiters
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(chunk, i) in communityChunks"
              :key="i"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-col
                  v-for="community in chunk"
                  :key="community.id"
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <community-card :community="community" />
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-container>
      </v-sheet>

      <!-- Testimonials Section -->
      <v-container class="py-16">
        <h2 class="text-h3 text-center mb-8 primary--text">What Our Users Say</h2>
        <v-row>
          <v-col
            v-for="(testimonial, index) in testimonials"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card class="pa-6 h-100">
              <v-rating
                v-model="testimonial.rating"
                readonly
                color="amber"
                dense
                class="mb-3"
              ></v-rating>
              <p class="text-body-1 font-italic mb-6">"{{ testimonial.quote }}"</p>
              <div class="d-flex align-center">
                <v-avatar
                  :color="testimonial.color"
                  size="56"
                  class="mr-4"
                >
                  <span class="white--text text-h5">{{ getInitials(testimonial.name) }}</span>
                </v-avatar>
                <div>
                  <p class="text-subtitle-1 font-weight-bold mb-0">{{ testimonial.name }}</p>
                  <p class="text-caption">{{ testimonial.role }}</p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- How It Works -->
      <v-sheet color="primary" dark class="py-16">
        <v-container>
          <h2 class="text-h3 text-center mb-8">How It Works</h2>
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(step, i) in howItWorks"
              :key="i"
              :color="step.color"
              small
            >
              <template v-slot:opposite>
                <span class="text-h6">{{ step.step }}</span>
              </template>
              <v-card class="elevation-2">
                <v-card-title class="text-h5">{{ step.title }}</v-card-title>
                <v-card-text>{{ step.description }}</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-container>
      </v-sheet>

      <!-- Stats Counter - Updated Version -->
      <v-container class="py-16">
        <h2 class="text-h3 text-center mb-8 primary--text">Our Impact</h2>
        <v-row class="stats-grid" justify="center" align="center">
          <v-col
            v-for="(stat, index) in stats"
            :key="index"
            cols="12"
            sm="6"
            md="3"
            class="pa-2"
          >
            <v-card 
              class="pa-6 text-center stat-card" 
              elevation="2" 
              height="100%"
              :color="stat.color || 'white'"
            >
              <div class="stat-number text-h3 text-md-h2 font-weight-bold mb-2">
                {{ stat.value }}+
              </div>
              <div class="stat-label text-h6">
                {{ stat.label }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Newsletter Section -->
      <v-sheet color="secondary" dark class="py-16">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="8" class="text-center">
              <h2 class="text-h3 mb-4">Stay Updated</h2>
              <p class="text-body-1 mb-8">
                Subscribe to our newsletter for the latest news and upcoming events.
              </p>
              <v-form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                <v-text-field
                  v-model="email"
                  type="email"
                  label="Your email address"
                  outlined
                  rounded
                  hide-details
                  required
                  class="newsletter-input"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primary"
                  x-large
                  rounded
                  :loading="loadingNewsletter"
                  class="ml-2"
                >
                  Subscribe
                </v-btn>
              </v-form>
              <p v-if="newsletterStatus" :class="newsletterStatusClass">{{ newsletterStatus }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCommunityStore } from '@/stores/community'
import CommunityCard from '@/components/CommunityCard.vue'

// Import images
import heroImage from '@/assets/images/hero-bg.jpg'
import aboutImage from '@/assets/images/community-about.jpg'

// Pinia Store
const communityStore = useCommunityStore()

// State
const email = ref('')
const loadingNewsletter = ref(false)
const loadingPopular = ref(true)
const newsletterStatus = ref('')
const newsletterStatusClass = ref('')

// Data for features, testimonials, steps, and stats
const features = ref([
  {
    icon: 'mdi-account-group',
    title: 'Build Connections',
    description: 'Meet like-minded people in your area with shared interests'
  },
  {
    icon: 'mdi-calendar-check',
    title: 'Local Events',
    description: 'Discover and participate in community events and activities'
  },
  {
    icon: 'mdi-chat-processing',
    title: 'Engaging Discussions',
    description: 'Join meaningful conversations on topics you care about'
  }
])

const testimonials = ref([
  {
    quote: "This platform transformed how I connect with my neighbors. I've made real friends in my area!",
    rating: 5,
    name: "Maria Garcia",
    role: "Community Volunteer",
    color: "blue"
  },
  {
    quote: "Found my hiking group through this app. The events feature is incredibly useful for outdoor enthusiasts.",
    rating: 5,
    name: "James Wilson",
    role: "Outdoor Guide",
    color: "red"
  },
  {
    quote: "As a newcomer to the city, this app helped me find my community and feel at home quickly.",
    rating: 5,
    name: "Ana Lopez",
    role: "Graphic Designer",
    color: "purple"
  }
])

const howItWorks = ref([
  {
    step: 'Step 1',
    title: 'Sign Up',
    description: 'Create your free account in less than a minute',
    color: 'primary'
  },
  {
    step: 'Step 2',
    title: 'Find Communities',
    description: 'Browse or search for communities matching your interests',
    color: 'secondary'
  },
  {
    step: 'Step 3',
    title: 'Get Involved',
    description: 'Join discussions, attend events, and make connections',
    color: 'accent'
  }
])

const stats = ref([
  { value: 10000, label: 'Active Members', color: 'blue lighten-5' },
  { value: 500, label: 'Communities', color: 'green lighten-5' },
  { value: 200, label: 'Events Monthly', color: 'orange lighten-5' },
  { value: 50, label: 'Cities', color: 'purple lighten-5' }
])

// Computed
const communityChunks = computed(() => {
  const chunkSize = 3
  if (!communityStore.popular.length) {
    return []
  }
  return communityStore.popular.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize)
    if (!result[chunkIndex]) {
      result[chunkIndex] = []
    }
    result[chunkIndex].push(item)
    return result
  }, [])
})

// Methods
const getInitials = (name) => {
  return name.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
}

const subscribeNewsletter = async () => {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    newsletterStatus.value = 'Please provide a valid email address.'
    newsletterStatusClass.value = 'text-error'
    return
  }

  loadingNewsletter.value = true
  try {
    await communityStore.subscribeNewsletter(email.value)
    email.value = ''
    newsletterStatus.value = 'Thank you for subscribing!'
    newsletterStatusClass.value = 'text-success'
  } catch (error) {
    newsletterStatus.value = 'Failed to subscribe. Please try again later.'
    newsletterStatusClass.value = 'text-error'
  } finally {
    loadingNewsletter.value = false
  }
}

// Lifecycle Hooks
onMounted(async () => {
  try {
    await communityStore.fetchPopularCommunities()
  } finally {
    loadingPopular.value = false
  }
})
</script>

<style scoped>
/* Custom styles */
.hero {
  margin-top: -64px; /* Offset for app bar */
  padding-top: 64px; /* Push content down */
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
  animation: fadeInUp 1s ease;
}

.feature-card {
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
}

/* Stats Section Styles */
.stats-grid {
  gap: 16px;
}

.stat-card {
  transition: all 0.3s ease;
  border-radius: 12px !important;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.stat-number {
  line-height: 1;
  margin-bottom: 8px;
  color: var(--v-primary-base) !important;
}

.stat-label {
  opacity: 0.9;
  color: rgba(0, 0, 0, 0.7);
}

@media (max-width: 960px) {
  .stat-number {
    font-size: 2rem !important;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    gap: 8px;
  }
  
  .stat-card {
    padding: 24px 12px !important;
  }
  
  .stat-number {
    font-size: 1.75rem !important;
  }
  
  .stat-label {
    font-size: 1rem !important;
  }
}

.newsletter-form {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .newsletter-form {
    flex-direction: column;
  }
  
  .hero {
    height: 80vh;
  }
  
  .hero-content h1 {
    font-size: 2rem !important;
  }
  
  .hero-content p {
    font-size: 1.2rem !important;
  }
}

@keyframes fadeInUp {
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