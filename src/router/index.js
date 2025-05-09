import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import AboutUs from '../pages/AboutUs.vue';
import CommunityEvents from '../pages/CommunityEvents.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from '../pages/SignUpPage.vue';
import ContactUs from '../pages/ContactUs.vue';
import WelcomePage from '../pages/WelcomePage.vue';
import CommunityPage from '../pages/CommunityPage.vue';
import CommunityDetail from '../pages/CommunityDetail.vue';
import NewsLetterVerify from '../pages/NewsLetterVerify.vue';


const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL || 'http://localhost:8080'), // ✅ Ensures fallback if BASE_URL is missing
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about-us', name: 'AboutUs', component: AboutUs },
    { path: '/event', name: 'Events', component: CommunityEvents },
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/signup', name: 'SignUpPage', component: SignUpPage },
    { path: '/contact-us', name: 'ContactUs', component: ContactUs },
    { path: '/welcome', name: 'WelcomePage', component: WelcomePage },
    { path: '/community', name: 'CommunityPage', component: CommunityPage },
    { path: '/community/:id', name: 'CommunityDetail', component: CommunityDetail },
    { path: '/newsletter-verify', name: 'NewsLetterVerify', component: NewsLetterVerify },
    {}
  
  ],
});

export default router;