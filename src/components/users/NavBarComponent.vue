<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-bluer">
            <div class="container-fluid">
                <a class="navbar-brand text-white" href="#">
                <img src="@/assets/img/logo.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
                    Agendamento de Salas
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link class="nav-link" :class="{ active: isActiveRouter('/user/home')}" to="/user/home">Home</router-link>
                        <router-link class="nav-link" :class="{active: isActiveRouter('/user/rooms')}" to="/user/rooms">Salas</router-link>
                        <router-link class="nav-link" :class="{active: isActiveRouter('/user/schenduling')}" to="/user/schenduling">Agendamentos</router-link>
                        <router-link class="nav-link" :class="{active: isActiveRouter('/user/about')}" to="/user/about">Sobre Nós</router-link>
                    </div>
                </div>
                <div class="profile justify-content-end">
                    <ProfilePerfil />
                </div>
            </div>
        </nav>
</header>
</template>
<script>
import ProfilePerfil from './ProfilePerfilComponent.vue'
export default {
    name: 'NavBarComponent',
    data() {
        return {
        }
    },  
    components: {
        ProfilePerfil
    },
    methods: {
        isActiveRouter(route) {
           return this.$route.path === route
        }
    }

}
</script>
<style lang="scss" scoped>
.bg-bluer {
    background-color: #3498db;
}
.navbar-nav {
    a {
        font-size: 1.2em;
        color: #fff !important;
        position: relative;
        transition: 0.3s;
    }
    a::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20%;
        height: 2px;
        background-color: #fff;
        transition: 0.3s;
    }
    a.active::before {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        bottom: 20%;
        height: 2px;
        background-color: #fff;
        transition: 0.3s;
    }
    a:hover::before{
        width: 80%;
    }
    a.active {
        font-weight: bold;
    }
}


.profile {
    margin-right: 2%;
    width: 50px;
    height: 50px;
    transition: 3s;
}
</style>