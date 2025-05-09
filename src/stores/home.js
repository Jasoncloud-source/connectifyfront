// stores/home.js
import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    stats: [
      { value: 10000, label: 'Active Members' },
      // ... other stats
    ],
    loading: false
  }),
  actions: {
    async subscribeNewsletter(email) {
      this.loading = true
      try {
        await axios.post('/api/newsletter', { email })
        // show success notification
      } catch (error) {
        // handle error
      } finally {
        this.loading = false
      }
    }
  }
})