<template>
  <div v-if="authStore.loading" class="d-flex justify-content-center align-items-center vh-100">
    <p>Loading...</p>
  </div>

  <div v-else-if="currentUserVid" class="container">
    <section class="mb-4">
      <ul class="list-unstyled">
        <li 
          v-for="message in messages" 
          :key="message.id" 
          :class="{ 'my-message': message.uid === currentUserVid, 'other-message': message.uid !== currentUserVid }"
          class="mb-3"
        >
          <div :class="message.uid === currentUserVid ? 'd-flex justify-content-end' : 'd-flex justify-content-start'">
            <div class="p-2 border rounded">
              <p class="mb-1">{{ message.text }}</p>
              <small class="text-muted">{{ new Date(message.createdAt.seconds * 1000).toLocaleTimeString() }}</small>
            </div>
          </div>
          <div class="text-muted mt-1">{{ message.user }}</div>
        </li>
      </ul>
    </section>

    <!-- Message Form -->
    <form @submit.prevent="sendMessage" class="d-flex justify-content-between">
      <input 
        v-model="newMessage" 
        type="text" 
        class="form-control me-2" 
        placeholder="Type your message here..." 
        required 
      />
      <button type="submit" class="btn btn-primary">Send</button>
    </form>
  </div>

  <div v-else class="d-flex justify-content-center align-items-center vh-100">
    <p>You are not logged in.</p>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const chatStore = useChatStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const newMessage = ref("");
    const messages = computed(() => chatStore.messages);

    const currentUserVid = computed(() => (authStore.user ? authStore.user.uid : null));

    watch(() => authStore.user, (newUser) => {
      if (!newUser) {
        router.push('/login');
      } else {
        chatStore.fetchMessages();
      }
    });

    onMounted(() => {
      const userFromSession = sessionStorage.getItem('userSession');
      if (!userFromSession) {
        router.push('/login');
      } else {
        chatStore.fetchMessages();
      }
    });

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        chatStore.sendMessage(authStore.user, newMessage.value);
        newMessage.value = "";
      }
    };

    return { currentUserVid, messages, newMessage, sendMessage, authStore };
  }
};
</script>