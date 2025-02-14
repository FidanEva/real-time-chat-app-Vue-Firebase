<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Sign Up</h1>
        <form @submit.prevent="signUp">
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

          <!-- Username Input -->
          <div class="mb-3">
            <input 
              v-model="username" 
              type="text" 
              class="form-control" 
              placeholder="Username" 
              required 
            />
          </div>

          <!-- Submit Button -->
          <div class="mb-3 text-center">
            <button 
              type="submit" 
              class="btn btn-primary w-100" 
              :disabled="loading"
            >
              Sign Up
            </button>
          </div>
        </form>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>

        <!-- Go to Login Button -->
        <div class="text-center mt-3">
          <button @click="goToLogin" class="btn btn-link">Go to Login</button>
        </div>
      </div>
    </div>
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
      console.log(userFromSession);
      if (authStore.user) {
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