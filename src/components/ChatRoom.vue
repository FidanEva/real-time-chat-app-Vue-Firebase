<template>
  <div class="chat-room" v-if="currentUserVid && !authStore.loading">
    <section class="messages-container">
        <ul class="messages-list">
            <li v-for="message in messages" :key="message.id" 
                :class="{ 'my-message': message.uid === currentUserVid, 'other-message': message.uid !== currentUserVid }" class="message">
                <div class="message-wrap">
                    <div class="message-wrap-content">
                        <p>{{ message.text }}</p>
                        <small class="time">{{ new Date(message.createdAt.seconds * 1000).toLocaleTimeString() }}</small>
                    </div>
                </div>
                <div class="conversation-name">{{ message.user }}</div>
            </li>
        </ul>
    </section>
    <form class="message-form" @submit.prevent="sendMessage">
        <input v-model="newMessage" type="text" placeholder="Type your message here..." class="message-input" />
        <button type="submit" class="send-button">Send</button>
    </form>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useChatStore } from "../store/chatStore";
import { useAuthStore } from "../store/authStore";

export default {
  setup() {
    const chatStore = useChatStore();
    const authStore = useAuthStore();
    const newMessage = ref("");
    const messages = computed(() => chatStore.messages);

    const currentUserVid = computed(() => (authStore.user ? authStore.user.uid : null));

    watch(() => authStore.user, (newUser) => {
      if (newUser && !authStore.loading) {
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

<style scoped>
.chat-room {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 51px);
    margin: auto;
    overflow: hidden;
}

.messages-container {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
}

.messages-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.message {
    margin-bottom: 24px;
    position: relative;
    clear: both;
}

.message.my-message {
    float: right;
    text-align: right;
}

.message-wrap {
    display: flex;
    margin-bottom: 10px;
    line-height: 1.4;
}

.message-wrap-content {
    animation: flyIn .6s ease-in-out;
    background-color: #7269ef;
    border-radius: 8px 8px 8px 0;
    color: #fff;
    padding: 12px 20px;
    position: relative;
}

.message-wrap-content:before {
    border-bottom: 5px solid transparent;
    border-left: 5px solid #7269ef;
    border-right: 5px solid transparent;
    border-top: 5px solid #7269ef;
    bottom: -10px;
    content: "";
    left: 0;
    position: absolute;
    right: auto;
}

.time {
    color: hsla(0, 0%, 100%, .5);
    font-size: 12px;
    margin-top: 4px;
    text-align: right;
}

.conversation-name {
    font-size: 14px;
    font-weight: 500;
}

.my-message .message-wrap-content {
    background-color: #f5f7fb;
    border-radius: 8px 8px 0 8px;
    color: #343a40;
    order: 2;
    text-align: right;
}

.my-message .message-wrap-content:before {
    border-bottom: 5px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid #f5f7fb;
    border-top: 5px solid #f5f7fb;
    left: auto;
    right: 0;
}

.my-message .time {
    color: #7a7f9a;
    text-align: left;
}

.message-form {
    display: flex;
    padding: 20px;
    background: #007dd0;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ccc;
}

.message-input {
    flex-grow: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
}

.send-button {
    padding: 10px 20px;
    background: #28a745;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
}

.send-button:hover {
    background: #218838;
}
</style>
