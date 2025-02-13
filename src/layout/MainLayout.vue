<template>
  <div>
    <!-- Header Section -->
    <header class="bg-primary text-white py-3 mb-4">
      <div class="container d-flex justify-content-between align-items-center">
        <h1 class="mb-0">Main Layout</h1>
        <button 
          @click="logOut" 
          type="submit" 
          class="btn btn-outline-light"
        >
          Log out
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <router-view />
    </main>
  </div>
</template>


<script>
import { useAuthStore } from '@/store/authStore';
import { ref} from "vue";
import { useRouter} from 'vue-router';

export default {
    setup() {
        const errorMessage = ref('');
        const router = useRouter();
        const authStore = useAuthStore();

        const logOut = async () => {
            try {
                await authStore.logout();
                await router.push('/login');
            } catch (error) {
                console.error('Login Failed:', error);
                errorMessage.value = error.message;
            }
        };
        return {
            logOut
        }
    }
}
</script>
