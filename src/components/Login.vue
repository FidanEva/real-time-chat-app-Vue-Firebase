<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">{{ $t("login.title") }}</h1>
        <form @submit.prevent="login">
          <!-- Email Input -->
          <div class="mb-3">
            <input 
              v-model="email" 
              type="email" 
              class="form-control" 
              placeholder="Email" 
              required 
            />
          </div>

          <!-- Password Input -->
          <div class="mb-3">
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              placeholder="Password" 
              required 
              minlength="6" 
            />
          </div>

          <!-- Submit Button -->
          <div class="mb-3 text-center">
            <button 
              type="submit" 
              class="btn btn-primary w-100" 
              :disabled="loading"
            >
              Login
            </button>
          </div>
        </form>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>

        <!-- Go to Signup Button -->
        <div class="text-center mt-3">
          <button @click="goToSignup" class="btn btn-link">Go to Signup</button>
        </div>
      </div>
    </div>
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
      console.log(userFromSession);
      if (authStore.user) {
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