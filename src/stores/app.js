import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    snackbar: {
      show: false,
      message: '',
      color: 'success'
    }
  }),
  actions: {
    showSnackbar(message, color = 'success') {
      this.snackbar.show = true
      this.snackbar.message = message
      this.snackbar.color = color
      
      setTimeout(() => {
        this.snackbar.show = false
      }, 3000)
    }
  }
})