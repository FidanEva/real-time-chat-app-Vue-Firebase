<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required minlength="6" />
      <button type="submit" :disabled="loading">Login</button>
    </form>
    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
    <button @click="goToSignup">Go to Signup</button>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';

export default {
  name: 'AppLogin',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const loading = computed(() => authStore.loading);

    onMounted(() => {
      const userFromSession = sessionStorage.getItem('userSession');
      if (userFromSession) {
        router.push('/chat');
      }
    });

    const login = async () => {
      try {
        await authStore.loginWithEmail(email.value, password.value);
        await router.push('/chat');
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    const goToSignup = () => {
      router.push('/signup');
    };

    return { email, password, errorMessage, loading, login, goToSignup };
  }
};
</script>

<style scoped>
.login-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input[type="email"],
input[type="password"] {
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