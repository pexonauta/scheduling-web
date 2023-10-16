<template>
    <header>
        <div class="navBar bg-bluer">
            <div class="title">
                <h1>{{ 
                    isTitleRouter('/scheduling-web/adm/requests') ? 'Solicitação de Acesso' : 
                    isTitleRouter('/scheduling-web/adm/users') ? 'Usuários Cadastrados' :
                    isTitleRouter('/scheduling-web/adm/rooms') ? 'Pedidos de Agendamentos' : 
                    isTitleRouter('/scheduling-web/adm/scheduling') ? 'Salas Agendadas' : 
                    isTitleRouter('/scheduling-web/adm/management') ? 'Gerenciamento de Recursos' :'Área Administrativa'
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
        if(!localStorage.getItem('Web-Agendamento-auth') || 
        JSON.parse(localStorage.getItem('Web-Agendamento-auth')).auth !== 'authenticated' ||
        JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user) {
            this.$router.push('/scheduling-web/')
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