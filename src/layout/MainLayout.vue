<template>
<header>
    <h1>Main Layout</h1>
    <button @click="logOut" type="sumbit">Log out</button>
</header>
<main>
    <router-view />
</main>
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
