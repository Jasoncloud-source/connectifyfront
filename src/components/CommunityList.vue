<template>
    <div class="community-list">
      <h2>All Communities</h2>
      <!-- Show loading message while data is fetched -->
      <div v-if="loading">Loading communities...</div>
      <!-- Display communities when data is loaded -->
      <div v-else>
        <div 
          v-for="community in communities" 
          :key="community.id" 
          class="community-item"
        >
          <h3>{{ community.name }}</h3>
          <p>{{ community.description }}</p>
          <span class="category">{{ community.category }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        communities: [],
        loading: true, // Track loading state
      };
    },
    async created() {
      try {
        // Fetch data from Laravel API
        const response = await axios.get('http://localhost:8000/api/communities');
        this.communities = response.data;
      } catch (error) {
        console.error('Error fetching communities:', error);
      } finally {
        this.loading = false; // Turn off loading state
      }
    },
  };
  </script>
  
  <style scoped>
  .community-list {
    padding: 20px;
  }
  
  .community-item {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff;
  }
  
  .category {
    display: inline-block;
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.9em;
  }
  </style>