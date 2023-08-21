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
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).auth !== 'authenticated') {
            this.$router.push('/')
        }
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).admin) {
            this.$router.push('/adm/')
        }
    }
}
</script>
<style lang="scss" scoped>
main {
    margin-left: 10%;
}

</style>