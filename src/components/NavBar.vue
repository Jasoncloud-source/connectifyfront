<template>
  <!-- Side Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    color="teal-darken-1"
    dark
    app
    v-if="isAuthenticated || !hideForUnauthenticated"
  >
    <!-- User Profile -->
    <v-layout column align-center class="py-4">
      <v-avatar size="100">
        <v-img :src="userAvatar" alt="User avatar" />
      </v-avatar>
      <p class="white--text font-weight-medium mt-3 text-center">
        {{ userName }}
      </p>
    </v-layout>

    <!-- Navigation Links -->
    <v-list flat>
      <v-list-item v-for="path in filteredPaths" :key="path.text">
        <router-link :to="path.route" class="d-flex align-center text-decoration-none">
          <v-icon>{{ path.icon }}</v-icon>
          <span class="ml-2">{{ path.text }}</span>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- App Bar -->
  <v-app-bar color="teal darken-4" app>
    <v-app-bar-nav-icon
      v-if="isAuthenticated || !hideForUnauthenticated"
      @click.stop="drawer = !drawer"
    />

    <v-toolbar-title class="text-uppercase">
      <span class="font-weight-light">MyCommunityApp</span>
    </v-toolbar-title>

    <v-spacer />

    <!-- Dropdown Menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon left>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="path in filteredPaths" :key="path.text">
          <router-link :to="path.route" class="text-decoration-none">
            <v-list-item-title>{{ path.text }}</v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Logout Button -->
    <v-btn v-if="isAuthenticated" text @click="handleLogout" class="ml-2"> 
      <v-icon left>mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../services/auth.service';

const drawer = ref(true);
const hideForUnauthenticated = ref(false); // Define this to fix the warning

const router = useRouter();
const { isAuthenticated, currentUser, isAdmin, logout, loadUserInfo } = useAuth();

onMounted(async () => {
  await loadUserInfo();
});

// User Info
const userName = computed(() => currentUser.value?.name || 'Guest');
const userAvatar = computed(() => currentUser.value?.user_photo || 'https://picsum.photos/1920/1080?random');

// Logout function
function handleLogout() {
  logout();
  router.push('/login');
}

// Define app navigation links
const allPaths = [
  { icon: 'mdi-home', text: 'Home', route: '/', public: true },
  { icon: 'mdi-magnify', text: 'Sign Up', route: '/signup', public: true },
  { icon: 'mdi-heart', text: 'About Us', route: '/about-us', public: true },
  { icon: 'mdi-mail', text: 'Contact Us', route: '/contact-us', public: true },

  { icon: 'mdi-lock', text: 'Login', route: '/login', showWhenLoggedOut: true },
  { icon: 'mdi-account', text: 'My Profile', route: '/profile', requiresAuth: true },
  { icon: 'mdi-account-multiple', text: 'Community', route: '/community', requiresAuth: true },
  { icon: 'mdi-forum', text: 'Forum', route: '/forum', requiresAuth: true },
  { icon: 'mdi-calendar', text: 'Events', route: '/events', requiresAuth: true },
  { icon: 'mdi-map', text: 'Map', route: '/map', requiresAuth: true },
  { icon: 'mdi-bell', text: 'Notifications', route: '/notifications', requiresAuth: true },
  { icon: 'mdi-message-text', text: 'Messages', route: '/messages', requiresAuth: true },

  { icon: 'mdi-account-group', text: 'User Management', route: '/admin/users', requiresAdmin: true },
  { icon: 'mdi-clipboard-list', text: 'System Reports', route: '/admin/reports', requiresAdmin: true },
];

// Filter paths based on user role
const filteredPaths = computed(() =>
  allPaths.filter((path) => {
    if (path.public) return true;
    if (!isAuthenticated.value && path.showWhenLoggedOut) return true;
    return isAuthenticated.value && (!path.requiresAdmin || isAdmin.value);
  })
);
</script>

<style scoped>
.text-decoration-none {
  text-decoration: none;
}
</style>
