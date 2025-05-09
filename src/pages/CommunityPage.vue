<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            label="Search communities"
            prepend-inner-icon="mdi-magnify"
            clearable
          ></v-text-field>
          
          <v-chip-group v-model="filterCategory" column multiple>
            <v-chip filter value="Technology">Technology</v-chip>
            <v-chip filter value="Sports">Sports</v-chip>
            <v-chip filter value="Arts">Arts</v-chip>
          </v-chip-group>
        </v-col>
  
        <v-col 
          cols="12" 
          md="6" 
          lg="4" 
          v-for="community in filteredCommunities" 
          :key="community.id"
        >
          <v-card height="100%">
            <v-img
              :src="community.image"
              height="200"
              cover
            ></v-img>
            
            <v-card-title>{{ community.name }}</v-card-title>
            <v-card-subtitle>
              {{ community.category }} • {{ community.members }} members
            </v-card-subtitle>
            
            <v-card-text>
              {{ community.description }}
            </v-card-text>
            
            <v-card-actions>
              <v-btn
                v-if="!community.joined"
                color="primary"
                @click="joinCommunity(community.id)"
              >
                Join
              </v-btn>
              
              <v-btn
                v-else
                color="secondary"
                @click="leaveCommunity(community.id)"
              >
                Leave
              </v-btn>
              
              <v-spacer></v-spacer>
              
              <v-btn
                icon
                @click="viewCommunity(community.id)"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCommunity } from '@/services/community.service'
  
  const router = useRouter()
  const { communities, fetchCommunities, joinCommunity, leaveCommunity } = useCommunity()
  
  const search = ref('')
  const filterCategory = ref([])
  
  onMounted(async () => {
    await fetchCommunities()
  })
  
  const filteredCommunities = computed(() => {
    return communities.value.filter(community => {
      const matchesSearch = community.name.toLowerCase().includes(search.value?.toLowerCase() || '') ||
                           community.description.toLowerCase().includes(search.value?.toLowerCase() || '')
      
      const matchesCategory = filterCategory.value.length === 0 || 
                            filterCategory.value.includes(community.category)
      
      return matchesSearch && matchesCategory
    })
  })
  
  const viewCommunity = (id) => {
    router.push(`/community/${id}`)
  }
  </script>
  
  <style scoped>
  .v-card {
    transition: transform 0.3s;
  }
  .v-card:hover {
    transform: translateY(-5px);
  }
  </style>