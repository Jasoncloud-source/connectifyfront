import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue' 
import AboutUs from '@/pages/AboutUs.vue'
import CommunityEvents from '@/pages/CommunityEvents.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import ContactUs from '@/pages/ContactUs.vue'
import WelcomePage from '@/pages/WelcomePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about-us',
      name: 'about',      
      component: AboutUs
    },
    {
      path: '/event',
      name: 'Events',
      component: CommunityEvents
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/sign-up',
      name: 'SignUpPage',
      component: SignUpPage
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: WelcomePage
    }
  ]
})

export default router