<template>
<div>
    <button @click="toggleView">{{ isLogin ? "Go to Signup" : "Go to Login" }}</button>
    <button v-if="isLogin" @click="logIn">Login</button>
    <button v-else @click="signUp">SignUp</button>

    <router-view />
</div>
</template>

<script>
import {
    useRouter
} from 'vue-router';
import { ref
} from 'vue';
import { useAuthStore } from "../store/authStore";

export default {
    name: "AuthLayout",
    setup() {
        const router = useRouter();
        const isLogin = ref(true);

        const toggleView = () => isLogin.value = !isLogin.value;

        const logIn = () => {
            // Check if the user is logged in before navigating to login
            const authStore = useAuthStore();
            if (authStore.user) {
                router.push("/chat"); // Already logged in, go directly to chat
            } else {
                router.push("/login"); // Navigate to login if not logged in
            }
        };

        const signUp = () => {
            router.push("/signUp");
        };

        return {
            isLogin,
            toggleView,
            logIn,
            signUp,
        };
    },
}
</script>
