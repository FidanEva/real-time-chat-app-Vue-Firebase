<template>
<div>
    <button @click="toggleView">{{ isLogin ? "Go to Signup" : "Go to Login" }}</button>

    <button v-if="isLogin" @click="logIn">Login</button>
    <button v-else @click="signUp">SignUp</button>
</div>
</template>

<script>
import {
    useRouter
} from 'vue-router';
import {
    ref
} from 'vue';

export default {
    name: "AppHome",
    setup() {
        const router = useRouter();
        const isLogin = ref(true);
        const toggleView = () => isLogin.value = !isLogin.value;

        const logIn = () => {
            router.push("login");
        }
        const signUp = () => {
            router.push("signUp");
        }
        return {
            isLogin,
            toggleView,
            logIn,
            signUp
        }
    }
}
</script>
