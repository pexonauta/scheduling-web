<template>
    <NavBarComponent />
    <main>
        <router-view/>
    </main>
</template>
<script>
import NavBarComponent from '@/components/adm/NavBarComponent.vue'
export default {
    name: 'MainAdmin',
    components: {
        NavBarComponent,
    },
    mounted() {
        if(!localStorage.getItem('Web-Agendamento-auth') || 
        JSON.parse(localStorage.getItem('Web-Agendamento-auth')).auth !== 'authenticated' ||
        JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user) {
            this.$router.push('/scheduling-web/')
        }
    }
}
</script>
<style lang="scss" scoped>
main {
    margin-left: 10%;
}

</style>