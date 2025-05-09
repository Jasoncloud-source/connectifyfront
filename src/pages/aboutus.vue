<template>
  <v-main>
    <!-- Hero Section -->
    <section class="about-hero">
      <v-container>
        <v-row align="center" class="fill-height">
          <v-col cols="12" md="6">
            <h1 class="text-h3 text-md-h2 font-weight-bold">Our Community Story</h1>
            <p class="text-h6 mt-4">Building connections that matter since 2023</p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              src="@/assets/images/about-hero.jpg"
              alt="Community members together"
              class="elevation-6 rounded-lg"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Mission Section -->
    <section class="mission-section py-15">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-chip color="primary" class="mb-4">Our Why</v-chip>
            <h2 class="text-h3 font-weight-bold mb-6">Creating Meaningful Connections</h2>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mission-card pa-6">
              <v-icon color="primary" size="60" class="mb-4">mdi-heart-multiple</v-icon>
              <h3 class="text-h4 mb-4">Our Mission</h3>
              <p class="text-body-1">
                To bridge gaps between neighbors by providing a platform that fosters genuine relationships and 
                community engagement through shared interests and local activities.
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mission-card pa-6">
              <v-icon color="primary" size="60" class="mb-4">mdi-eye-outline</v-icon>
              <h3 class="text-h4 mb-4">Our Vision</h3>
              <p class="text-body-1">
                A world where technology brings people together in real life, creating stronger, more resilient 
                communities where everyone feels they belong.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Team Section -->
    <section class="team-section py-15 bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-chip color="primary" class="mb-4">The People</v-chip>
            <h2 class="text-h3 font-weight-bold mb-10">Meet Our Team</h2>
          </v-col>
          <v-col 
            v-for="(member, i) in teamMembers" 
            :key="i" 
            cols="12" sm="6" md="4" lg="3"
          >
            <v-card class="team-card pa-4 text-center" elevation="4">
              <v-avatar size="150" class="mb-4">
                <v-img :src="member.avatar" :alt="member.name"></v-img>
              </v-avatar>
              <h3 class="text-h5">{{ member.name }}</h3>
              <p class="text-body-1 primary--text mb-2">{{ member.role }}</p>
              <div class="social-links mt-2">
                <v-btn
                  v-for="(social, s) in member.social"
                  :key="s"
                  :href="social.link"
                  target="_blank"
                  icon
                  size="small"
                  class="mx-1"
                >
                  <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Values Section -->
    <section class="values-section py-15">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center">
            <v-chip color="primary" class="mb-4">Core Values</v-chip>
            <h2 class="text-h3 font-weight-bold mb-10">What Guides Us</h2>
          </v-col>
          <v-col 
            v-for="(value, i) in coreValues" 
            :key="i" 
            cols="12" md="6" lg="3"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                :class="['value-card', { 'on-hover': isHovering }]"
                class="pa-6 text-center"
              >
                <v-icon size="60" :color="value.color" class="mb-4">{{ value.icon }}</v-icon>
                <h3 class="text-h5 mb-4">{{ value.title }}</h3>
                <p class="text-body-1">{{ value.description }}</p>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-15 primary">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4 white--text">Ready to Join Our Community?</h2>
            <p class="text-h5 white--text mb-8">
              Become part of something bigger and start connecting today.
            </p>
            <v-btn
              x-large
              color="white"
              class="primary--text font-weight-bold"
              @click="$router.push('/signup')"
            >
              Get Started
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>

<script setup>
import { ref } from 'vue';

const teamMembers = ref([
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: require('@/assets/images/team/alex.jpg'),
    social: [
      { icon: 'mdi-twitter', link: '#' },
      { icon: 'mdi-linkedin', link: '#' }
    ]
  },
  {
    name: "Maria Garcia",
    role: "Community Manager",
    avatar: require('@/assets/images/team/maria.jpg'),
    social: [
      { icon: 'mdi-instagram', link: '#' },
      { icon: 'mdi-facebook', link: '#' }
    ]
  },
  {
    name: "Mary Jane",
    role: "Tech Lead",
    avatar: require('@/assets/images/team/mary.jpg'),
    social: [
      { icon: 'mdi-github', link: '#' },
      { icon: 'mdi-twitter', link: '#' }
    ]
  },
  {
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: require('@/assets/images/team/sarah.jpg'),
    social: [
      { icon: 'mdi-dribbble', link: '#' },
      { icon: 'mdi-behance', link: '#' }
    ]
  }
]);

const coreValues = ref([
  {
    title: "Community First",
    description: "We prioritize real human connections over everything else.",
    icon: "mdi-account-group",
    color: "primary"
  },
  {
    title: "Authenticity",
    description: "Genuine interactions are at the heart of what we do.",
    icon: "mdi-heart",
    color: "red"
  },
  {
    title: "Innovation",
    description: "We constantly evolve to better serve our communities.",
    icon: "mdi-lightbulb",
    color: "amber"
  },
  {
    title: "Inclusivity",
    description: "Everyone is welcome and valued in our spaces.",
    icon: "mdi-handshake",
    color: "green"
  }
]);
</script>

<style scoped>
.about-hero {
  padding: 120px 0;
  background-color: #f5f7fa;
}

.mission-card {
  height: 100%;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.team-card {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}

.value-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  height: 100%;
}

.value-card.on-hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}

.cta-section {
  background: linear-gradient(135deg, #3f51b5, #2196f3);
}
</style>