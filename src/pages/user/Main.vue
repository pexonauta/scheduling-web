<template>
    <NavBarComponent />

        <router-view />

    <FooterComponent />
</template>
<script>
import NavBarComponent from '@/components/users/NavBarComponent.vue'
import FooterComponent from '@/components/users/FooterComponent.vue'
export default {
    name: 'MainPage',
    components: {
        NavBarComponent,
        FooterComponent,
    }
}
</script>
<style src="@/assets/scss/main.scss" lang="scss"/>
