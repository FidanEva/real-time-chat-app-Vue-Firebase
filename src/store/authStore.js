import { defineStore } from "pinia";
import { auth } from "../firebase/firebaseConfig";
import { loginWithGoogle, loginWithEmail, signUpWithEmail, logout } from "../services/authService";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  }),

  actions: {
    async loginWithGoogle() {
      this.loading = true;
      try {
        await loginWithGoogle();
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        this.error = error.message;
        console.error("Google Login Error:", error.message);
      } finally {
        this.loading = false;
      }
    },

    async loginWithEmail(email, password) {
      this.loading = true;
      try {
        const user = await loginWithEmail(email, password);
        this.setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        this.error = error.message;
        console.error("Email Login Error:", error.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async signUpWithEmail(email, password) {
      this.loading = true;
      try {
        const user = await signUpWithEmail(email, password);
        this.setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        this.error = error.message;
        console.error("Sign-Up Error:", error.message);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await logout();
        this.setUser(null);
        localStorage.removeItem('user');
      } catch (error) {
        this.error = error.message;
        console.error("Logout Error:", error.message);
      } finally {
        this.loading = false;
      }
    },

    setUser(user) {
      this.user = user;
      this.loading = false;
    }
  }
});

onAuthStateChanged(auth, (user) => {
  const authStore = useAuthStore();
  authStore.setUser(user);
  if (user) {
    sessionStorage.setItem('userSession', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('userSession');
  }
});
