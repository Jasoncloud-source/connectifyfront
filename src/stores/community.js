import { defineStore } from 'pinia'
import api from '@/services/api'

export const useCommunityStore = defineStore('community', {
  state: () => ({
    popular: [],
  }),
  actions: {
    async fetchPopularCommunities() {
      try {
        const { data } = await api.get('/communities/popular')
        this.popular = data
      } catch (error) {
        console.error('Failed to fetch popular communities:', error)
        throw error
      }
    },

    async subscribeNewsletter(email) {
      try {
        await api.post('/newsletter/subscribe', { email })
      } catch (error) {
        console.error('Failed to subscribe to the newsletter:', error)
        throw error
      }
    },
  },
})