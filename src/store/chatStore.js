import { defineStore } from "pinia";
import { sendMessage, subscribeToMessages } from "../services/chatService";
export const useChatStore = defineStore("chat", {
  state: () => ({ messages: [] }),
  actions: {
    sendMessage(user, text) {
      sendMessage(user, text);
    },
    fetchMessages() {
      try{
        subscribeToMessages(messages => this.messages = messages);
      }catch(error){
          console.error('Error fetching messages:', error);
      }
    }
  }
});
