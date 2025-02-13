<template>
    <div>
        <component :is="currentComponent" />
    </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Login from '@/components/Login.vue';
import SignUp from '@/components/SignUp.vue';

export default {
    name: 'AuthLayout',
    components: { Login, SignUp },
    setup() {
        const route = useRoute();
        
        const currentComponent = computed(() => {
            return route.path === '/signup' ? SignUp : Login;
        });
        
        return { currentComponent };
    }
};
</script>