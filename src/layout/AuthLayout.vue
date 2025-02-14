<template>
<LanguageController />

<div>
    <component :is="currentComponent" />
</div>
</template>

<script>
import {
    computed
} from 'vue';
import {
    useRoute
} from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';
import LanguageController from '@/components/LanguageController.vue';

export default {
    name: 'AuthLayout',
    components: {
        Login,
        SignUp,
        LanguageController
    },
    setup() {
        const route = useRoute();

        const currentComponent = computed(() => {
            return route.path === '/signup' ? SignUp : Login;
        });

        return {
            currentComponent
        };
    }
};
</script>
