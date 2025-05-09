<template>
    <v-container v-if="community">
      <v-row>
        <v-col cols="12" md="8">
          <v-card>
            <v-img :src="community.image" height="300" cover></v-img>
            <v-card-title>{{ community.name }}</v-card-title>
            <v-card-subtitle>
              {{ community.category }} • {{ community.members }} members
            </v-card-subtitle>
            <v-card-text>
              <p>{{ community.description }}</p>
              <v-chip-group>
                <v-chip v-for="tag in community.tags" :key="tag">{{ tag }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <community-chat :community-id="id" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCommunity } from '@/services/community.service'
  import CommunityChat from '@/components/ChatBox.vue'
  
  const route = useRoute()
  const { fetchCommunityById } = useCommunity()
  const id = route.params.id
  const community = ref(null)
  
  onMounted(async () => {
    community.value = await fetchCommunityById(id)
  })
  </script>