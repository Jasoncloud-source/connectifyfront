<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6" elevation="2">
          <h1 class="text-h3 text-center mb-6 primary--text">Contact Us</h1>
          
          <v-form @submit.prevent="submitForm" ref="contactForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  label="Full Name"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  outlined
                  required
                  type="email"
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  :rules="[rules.required]"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  label="Your Message"
                  :rules="[rules.required, rules.minLength(10)]"
                  outlined
                  required
                  rows="5"
                ></v-textarea>
              </v-col>
              
              <v-col cols="12">
                <v-btn
                  type="submit"
                  color="primary"
                  x-large
                  block
                  :loading="loading"
                  :disabled="loading"
                >
                  Send Message
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4" lg="6">
        <v-card class="pa-6" elevation="2">
          <h2 class="text-h4 mb-4">Other Ways to Reach Us</h2>
          
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>support@mycommunityapp.com</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Phone</v-list-item-title>
                <v-list-item-subtitle>+1 (555) 123-4567</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="primary">mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Address</v-list-item-title>
                <v-list-item-subtitle>
                  123 Community Street<br>
                  Cityville, ST 12345<br>
                  United States
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          
          <div class="mt-6">
            <h3 class="text-h5 mb-4">Business Hours</h3>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(day, i) in businessHours" :key="i">
                    <td>{{ day.name }}</td>
                    <td>{{ day.hours }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Thank You!</v-card-title>
        <v-card-text>
          Your message has been sent successfully. We'll get back to you soon.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="successDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const successDialog = ref(false)
const contactForm = ref(null)

const businessHours = [
  { name: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { name: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { name: 'Sunday', hours: 'Closed' }
]

const rules = {
  required: value => !!value || 'This field is required.',
  email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
  minLength: length => value => (value || '').length >= length || `Minimum ${length} characters`
}

const submitForm = async () => {
  const { valid } = await contactForm.value.validate()
  
  if (!valid) return
  
  loading.value = true
  
  try {
    await axios.post('/api/contact', form.value)
    successDialog.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
    contactForm.value.resetValidation()
  } catch (error) {
    appStore.showSnackbar('Failed to send message. Please try again later.', 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

.v-list-item {
  padding-left: 0;
}
</style>