<template>
    <v-card>
      <v-img :src="community.image" height="200"></v-img>
      <v-card-title>{{ community.name }}</v-card-title>
      <v-card-subtitle>{{ community.members }} members</v-card-subtitle>
      <v-card-actions>
        <v-btn color="primary" @click="$router.push(`/communities/${community.id}`)">
          Join
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  defineProps({
    community: {
      type: Object,
      required: true
    }
  })
  </script>