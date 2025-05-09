<template>
  <div class="chat-box">
    <div class="messages" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" :class="msg.sender_id === currentUser.id ? 'sent' : 'received'">
        <!-- Display file if present -->
        <div v-if="msg.file_path" class="file-attachment">
          <img v-if="isImage(msg.file_path)" :src="getFileUrl(msg.file_path)" class="chat-image" @click="openImageModal(msg.file_path)">
          <div v-else class="file-download">
            <a :href="getFileUrl(msg.file_path)" download>
              <i class="file-icon"></i> Download file
            </a>
          </div>
        </div>
        <div class="message-content">{{ msg.message }}</div>
        <div class="message-meta">
          <span class="message-time">{{ formatTime(msg.created_at) }}</span>
          <span v-if="msg.sender_id === currentUser.id" class="read-receipt">
            <span v-if="msg.read_at">✓✓</span>
            <span v-else>✓</span>
          </span>
        </div>
      </div>
      <div v-if="isTyping" class="typing-indicator">
        {{ typingUserName }} is typing...
      </div>
    </div>

    <div class="chat-input-area">
      <div class="file-upload-container">
        <label for="file-upload" class="file-upload-button">
          <i class="attachment-icon"></i>
        </label>
        <input 
          id="file-upload" 
          type="file" 
          ref="fileInput" 
          @change="handleFileUpload" 
          style="display: none"
          accept="image/*,.pdf,.doc,.docx"
        >
        <span v-if="file" class="file-name">{{ file.name }}</span>
        <button v-if="file" @click="removeFile" class="remove-file-button">×</button>
      </div>
      
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        @input="handleTyping"
        placeholder="Type a message..."
        class="message-input"
      >
      
      <button @click="sendMessage" class="send-button">
        <i class="send-icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Echo from 'laravel-echo';
//import Pusher from 'pusher-js';
import moment from 'moment';

export default {
  props: {
    receiver_id: {
      type: Number,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      file: null,
      isTyping: false,
      typingUserName: '',
      typingTimeout: null,
      echo: null
    };
  },
  mounted() {
    this.fetchMessages();
    this.setupEcho();
  },
  beforeUnmount() {
    if (this.echo) {
      this.echo.leave(`chat.${this.receiver_id}`);
      this.echo.leave(`typing.${this.currentUser.id}`);
    }
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await axios.get(`/api/messages/${this.receiver_id}`);
        this.messages = response.data;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        // Mark messages as read
        this.markMessagesAsRead();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim() && !this.file) return;

      try {
        const formData = new FormData();
        formData.append('receiver_id', this.receiver_id);
        formData.append('message', this.newMessage);
        if (this.file) {
          formData.append('file', this.file);
        }

        await axios.post('/api/send-message', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.newMessage = '';
        this.file = null;
        this.$refs.fileInput.value = '';
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    setupEcho() {
      this.echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.VUE_APP_PUSHER_APP_KEY,
        cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authEndpoint: '/api/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      });

      // Listen for new messages
      this.echo.private(`chat.${this.receiver_id}`)
        .listen('MessageSent', (data) => {
          this.messages.push(data.message);
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          // Mark as read if it's our own message
          if (data.message.sender_id === this.currentUser.id) {
            this.markMessagesAsRead();
          }
        });

      // Listen for typing indicators
      this.echo.private(`typing.${this.currentUser.id}`)
        .listen('UserTyping', (data) => {
          if (data.isTyping && data.userId !== this.currentUser.id) {
            this.isTyping = true;
            this.typingUserName = data.userName || 'User';
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
              this.isTyping = false;
            }, 2000);
          } else {
            this.isTyping = false;
          }
        });
    },
    handleTyping() {
      if (!this.newMessage.trim()) {
        this.stopTyping();
        return;
      }

      // Notify that user is typing
      axios.post('/api/typing', {
        receiver_id: this.receiver_id,
        is_typing: true,
        user_name: this.currentUser.name
      });

      // Reset typing status after 1.5s of inactivity
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(() => {
        this.stopTyping();
      }, 1500);
    },
    stopTyping() {
      axios.post('/api/typing', {
        receiver_id: this.receiver_id,
        is_typing: false
      });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    removeFile() {
      this.file = null;
      this.$refs.fileInput.value = '';
    },
    async markMessagesAsRead() {
      const unreadMessages = this.messages.filter(
        msg => msg.receiver_id === this.currentUser.id && !msg.read_at
      );
      
      if (unreadMessages.length > 0) {
        try {
          await axios.post('/api/messages/mark-as-read', {
            message_ids: unreadMessages.map(msg => msg.id)
          });
          
          // Update local messages
          this.messages = this.messages.map(msg => {
            if (unreadMessages.some(m => m.id === msg.id)) {
              return { ...msg, read_at: new Date().toISOString() };
            }
            return msg;
          });
        } catch (error) {
          console.error('Error marking messages as read:', error);
        }
      }
    },
    getFileUrl(filePath) {
      return `/storage/${filePath}`;
    },
    isImage(filePath) {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(filePath);
    },
    openImageModal(imageUrl) {
      // Implement image modal opening logic here
      console.log('Open image:', imageUrl);
    },
    formatTime(timestamp) {
      return moment(timestamp).format('HH:mm');
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      container.scrollTop = container.scrollHeight;
    }
  },
  watch: {
    receiver_id() {
      if (this.echo) {
        this.echo.leave(`chat.${this.receiver_id}`);
      }
      this.messages = [];
      this.fetchMessages();
      this.setupEcho();
    }
  }
};
</script>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 12px;
  max-width: 70%;
}

.sent {
  margin-left: auto;
  text-align: right;
}

.received {
  margin-right: auto;
  text-align: left;
}

.message-content {
  padding: 8px 12px;
  border-radius: 18px;
  display: inline-block;
  word-break: break-word;
}

.sent .message-content {
  background-color: #007bff;
  color: white;
}

.received .message-content {
  background-color: #e9ecef;
  color: #333;
}

.message-meta {
  font-size: 0.75rem;
  color: #666;
  margin-top: 4px;
}

.read-receipt {
  margin-left: 4px;
  color: #666;
}

.typing-indicator {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
  margin: 8px 0;
}

.chat-input-area {
  display: flex;
  padding: 12px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  outline: none;
  margin: 0 10px;
}

.send-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0069d9;
}

.file-upload-container {
  display: flex;
  align-items: center;
}

.file-upload-button {
  cursor: pointer;
  padding: 8px;
}

.file-name {
  margin-left: 8px;
  font-size: 0.85rem;
  color: #666;
}

.remove-file-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin-left: 4px;
}

.file-attachment {
  margin-bottom: 8px;
}

.chat-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  cursor: pointer;
}

.file-download a {
  color: #007bff;
  text-decoration: none;
}

.file-download a:hover {
  text-decoration: underline;
}
</style>