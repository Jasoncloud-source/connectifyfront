import { ref } from 'vue'
import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Your Laravel API endpoint
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useCommunity = () => {
  const communities = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCommunities = async () => {
    try {
      loading.value = true
      const response = await api.get('/communities')
      communities.value = response.data.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch communities'
      console.error('fetchCommunities error:', error.value)
      return null
    } finally {
      loading.value = false
    }
  }

  const joinCommunity = async (id) => {
    try {
      const response = await api.post(`/communities/${id}/join`)
      const index = communities.value.findIndex(c => c.id === id)
      if (index !== -1) {
        communities.value[index] = response.data.community
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to join community'
      console.error('joinCommunity error:', error.value)
      throw err
    }
  }

  const leaveCommunity = async (id) => {
    try {
      const response = await api.post(`/communities/${id}/leave`)
      const index = communities.value.findIndex(c => c.id === id)
      if (index !== -1) {
        communities.value[index] = response.data.community
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to leave community'
      console.error('leaveCommunity error:', error.value)
      throw err
    }
  }
  
  const fetchPaginatedCommunities = async (page = 1, perPage = 6) => {
    try {
      loading.value = true
      const response = await api.get('/communities', {
        params: {
          page,
          per_page: perPage
        }
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch paginated communities'
      console.error('fetchPaginatedCommunities error:', error.value)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    communities,
    loading,
    error,
    fetchCommunities,
    joinCommunity,
    leaveCommunity,
    fetchPaginatedCommunities
  }
}