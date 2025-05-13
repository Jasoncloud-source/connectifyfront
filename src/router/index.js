import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import AboutUs from '../pages/AboutUs.vue';
import CommunityEvents from '../pages/CommunityEvents.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from '../pages/SignUpPage.vue';
import ContactUs from '../pages/ContactUs.vue';
import OnboardingPage from '../pages/OnboardingPage.vue';
import CommunityPage from '../pages/CommunitiesPage.vue';
import CommunityDetail from '../pages/CommunityDetail.vue';
import NewsLetterVerify from '../pages/NewsLetterVerify.vue'
import ChatBox from '@/components/ChatBox.vue';


const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL || 'http://localhost:8080'), // ✅ Ensures fallback if BASE_URL is missing
  routes: [
    {path: '/chat', name: 'ChatBox', component: ChatBox},
    { path: '/', name: 'home', component: HomePage },
    { path: '/about-us', name: 'AboutUs', component: AboutUs },
    { path: '/event', name: 'Events', component: CommunityEvents },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/signup', name: 'SignUpPage', component: SignUpPage },
    { path: '/contact-us', name: 'ContactUs', component: ContactUs },
    
    { path: '/communities', name: 'Communities', component: CommunityPage },
    { path: '/community/:id', name: 'CommunityDetail', component: CommunityDetail },
    { path: '/newsletter-verify', name: 'NewsLetterVerify', component: NewsLetterVerify },
  
    {path: '/onboarding', name: 'WelcomePage', component: OnboardingPage},
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../pages/DashboardPage.vue')
    },
    {
      path: '/communities',
      name: 'communities',
      component: () => import('../pages/CommunitiesPage.vue')
    },
    {
      path: '/create-community',
      name: 'create-community',
      component: () => import('../pages/CreateCommunityPage.vue')
    }
  
  
  ],
});

export default router;