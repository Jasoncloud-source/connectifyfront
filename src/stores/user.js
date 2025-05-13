import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const userProfile = ref(null)
  const onboardingComplete = ref(false)

  async function setUserProfile(profileData) {
    try {
      const formData = new FormData()
      formData.append('name', profileData.name)
      formData.append('interest', profileData.interest)
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar)
      }

      const { data } = await api.post('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      userProfile.value = data.profile
      onboardingComplete.value = data.profile.onboarding_complete
    } catch (error) {
      console.error('Error saving profile:', error)
      throw error
    }
  }

  async function markOnboardingComplete() {
    try {
      await api.post('/complete-onboarding')
      onboardingComplete.value = true
    } catch (error) {
      console.error('Error completing onboarding:', error)
      throw error
    }
  }

  return { 
    userProfile,
    onboardingComplete,
    setUserProfile,
    markOnboardingComplete
  }
})