<template>
    <header>
        <div class="navBar bg-bluer">
            <div class="title">
                <h1>{{ 
                    isTitleRouter('/adm/requests') ? 'Solicitação de Acesso' : 
                    isTitleRouter('/adm/users') ? 'Usuários Cadastrados' :
                    isTitleRouter('/adm/rooms') ? 'Pedidos de Agendamentos' : 
                    isTitleRouter('/adm/scheduling') ? 'Salas Agendadas' : 
                    isTitleRouter('/adm/management') ? 'Gerenciamento de Recursos' :'Área Administrativa'
                    }}</h1>
            </div>
            <div class="config">
                <div class="configIcon" @click="modalConfig">
                    <ion-icon name="cog-outline"></ion-icon>
                </div>
                <ModalConfigAdm v-if="modalConfigAdm" @save-changes="saveConfig" @close-modal="closeModal"/>
            </div>
        </div>
        <SlideNavComponent />   
    </header>
</template>
<script>
import SlideNavComponent from './SlideNavComponent.vue';
import ModalConfigAdm from './ModalConfigAdmComponent.vue'
export default {
    name: 'NavBarComponentAdmin',
    data() {
        return {
            modalConfigAdm: false,
        }
    },  
    components: {
        SlideNavComponent,
        ModalConfigAdm,
    },
    mounted() {
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).auth !== 'authenticated') {
            this.$router.push('/')
        }
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user) {
            this.$router.push('/user/home')
        }
    },
    methods: {
        isTitleRouter(route) {
           return this.$route.path === route
        },
        modalConfig() {
            this.modalConfigAdm = true
        },
        closeModal() {
            this.modalConfigAdm = false
        },
        saveConfig() {
            this.modalConfigAdm = false
            console.log('Atualizações feitas')
        }

    }

}
</script>
<style lang="scss" scoped>
.bg-bluer {
    background-color: #3498db;
}
.navBar {
    max-width: 100%;
    margin-left: auto;
    height: 8vh;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #fff;
    padding: 5px;
    h1 {
        padding: 2px;
    }
    .config {
        margin-top: 1%;
        
        .configIcon {
            cursor: pointer;
            transition: transform .3s ease-in-out;
            ion-icon {
                font-size: 2em !important;
                color: #fff !important;
            }
        }
        .configIcon:hover {
            transform: scale(1.2);
        }
    }
    
}

</style>