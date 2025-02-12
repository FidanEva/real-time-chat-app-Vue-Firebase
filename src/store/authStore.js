import { defineStore } from "pinia";
import { auth } from "../firebase/firebaseConfig";
import { loginWithGoogle, loginWithEmail, signUpWithEmail, logout } from "../services/authService";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: true
  }),

  actions: {
    async loginWithGoogle() {
      try {
        await loginWithGoogle();
      } catch (error) {
        console.error("Google Login Error:", error.message);
      }
    },

    async loginWithEmail(email, password) {
      try {
        const user = await loginWithEmail(email, password);
        this.setUser(user);
      } catch (error) {
        console.error("Email Login Error:", error.message);
        throw error;
      }
    },

    async signUpWithEmail(email, password) {
      try {
        const user = await signUpWithEmail(email, password);
        this.setUser(user);
      } catch (error) {
        console.error("Sign-Up Error:", error.message);
        throw error;
      }
    },

    async logout() {
      try {
        await logout();
        this.setUser(null);
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    },

    setUser(user) {
      this.user = user;
      this.loading = (user === null);
    }
  }
});

onAuthStateChanged(auth, (user) => {
  const authStore = useAuthStore();
  authStore.setUser(user);
});