import { defineStore } from "pinia";
import { sendMessage, subscribeToMessages } from "../services/chatService";
export const useChatStore = defineStore("chat", {
  state: () => ({ messages: [] }),
  actions: {
    sendMessage(user, text) {
      sendMessage(user, text);
    },
    fetchMessages() {
      subscribeToMessages(messages => this.messages = messages);
    }
  }
});
