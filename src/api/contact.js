import api from './index'

export default {
  sendContactForm(data) {
    return api.post('/contact', data)
  }
}