<template>
  <div class="signup-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required minlength="6" />
      <input v-model="username" type="text" placeholder="Username" required />
      <button type="submit" :disabled="loading">Sign Up</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
    <button @click="goToLogin">Go to Login</button>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { updateProfile } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';

export default {
  name: 'AppSignup',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const username = ref('');
    const errorMessage = ref('');
    const loading = computed(() => authStore.loading);

    onMounted(() => {
      const userFromSession = sessionStorage.getItem('userSession');
      if (userFromSession) {
        router.push('/chat');
      }
    });

    const signUp = async () => {
      try {
        const userCredential = await authStore.signUpWithEmail(email.value, password.value);
        const user = userCredential.user;
        await updateProfile(user, { displayName: username.value });
        await router.push('/chat');
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const goToLogin = () => {
      router.push('/login');
    };

    return { email, password, username, errorMessage, loading, signUp, goToLogin };
  }
};
</script>

<style scoped>
.signup-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>