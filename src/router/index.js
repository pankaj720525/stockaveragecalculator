import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StockAvgCal from '../views/StockAverageCalculator.vue'
import EmiCalculator from '../views/EmiCalculator.vue'
import HraCalculator from '../views/HraCalculator.vue'
import UpcomingEvents from '../views/UpcomingEvents.vue'
import AboutUs from '../views/AboutUs.vue'
import Feedback from '../views/Feedback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/home',
      component: Home,
    },
    {
      name: 'stock-average-calculator',
      path: '/',
      component: StockAvgCal,
    },
    {
      name: 'emi-calculator',
      path: '/emi-calculator',
      component: EmiCalculator,
    },
    {
      name: 'hra-calculator',
      path: '/hra-calculator',
      component: HraCalculator,
    },
    {
      name: 'upcoming-events',
      path: '/upcoming-events',
      component: UpcomingEvents,
    },
    {
      path: '/about-us',
      name: 'about_us',
      component: AboutUs,
    },
    {
      path: '/feedback',
      name: 'feedback_page',
      component: Feedback,
    },
  ],
})

export default router
