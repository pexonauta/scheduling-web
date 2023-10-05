<template>

    <div class="profile-content" ref="modalContainer">
        <ion-icon @click="eventProfile" name="person-circle-outline"></ion-icon>
        <div class="profile-links" id="profileModel">
            <ul>
                <li><button @click="openModal('profile')">Perfil</button></li>
                <li><button @click="openModal('config')">Configurações</button></li>
                <li class="logout" @click="openModal('sair')"><button>Sair</button></li>
            </ul>
        </div>
    </div>
    <div class="profile-modal" v-if="modals.profile" >
        <ModalProfileComponent title="Perfil" @close-profile-modal="closeProfileModal"/>
    </div>
    <div class="system-modal" v-if="modals.config">
        <ModalSystemComponent title="Configurações" @close-profile-modal="closeSystemModal"/>
    </div>
    <ModalLogout
    v-if="modals.logout" 
    title="Deslogar"
    text="Tem certeza que deseja sair ?"
    button="Enviar"
    @close-Modal="modals.logout = false"
    @save-change="eventLogout"
    />
</template>
<script>
import ModalProfileComponent from './ModalProfileComponent.vue'
import ModalSystemComponent from './ModalSystemComponent.vue'
import ModalLogout from './ModalInputComponent.vue';
export default {
    name: "ProfileComponent",    
    components: { 
        ModalProfileComponent,
        ModalSystemComponent,
        ModalLogout, 
    },
    data() {
        return {
            modals: {
                profile: false,
                config: false,
                logout: false,
            }
        };
    },
    mounted() {
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).auth !== 'authenticated') {
            this.$router.push('/')
        }
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).admin) {
            this.$router.push('/adm/')
        }
        // Adicionar o event listener ao nível do documento (ou ao elemento que engloba toda a página)
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        // Remover o event listener quando o componente for destruído para evitar vazamentos de memória
        document.removeEventListener('click', this.handleOutsideClick);
        this.modals.profile = false
        this.modals.config = false
    },
    methods: {
        eventProfile() {
            let profileModel = document.querySelector("#profileModel");
            if (profileModel.classList.contains("active")) {
                profileModel.classList.remove("active");
            }
            else {
                profileModel.classList.add("active");
            }
        },
        openModal(value) {
            if (value == 'profile') {
                if(this.modals.config == false) {
                    this.modals.profile = true
                }
                else {
                    this.modals.config = false
                    this.modals.profile = true
                }
            }
            if (value == 'config') {
                if(this.modals.profile == false) {
                    this.modals.config = true
                }
                else {
                    this.modals.profile = false
                    this.modals.config = true
                }
            }
            if (value == 'sair') {
                this.modals.logout = true
            }
        },
        closeProfileModal() {
            this.modals.profile = false; // Alterando o valor da variável para false
        },
        closeSystemModal() {
            this.modals.config = false;
        },
        handleOutsideClick(event) {
            // Verificar se o clique ocorreu fora do modal
            const modalElement = this.$refs.modalContainer;
            let profileActive = document.querySelector('#profileModel')
            if (modalElement && !modalElement.contains(event.target)) {
                // Emitir o evento personalizado para o componente filho
                if(profileActive.classList.contains('active')) {
                    profileActive.classList.remove('active')
                }
            }
        },
        eventLogout() {
            const auth = {
                auth: 'undefined'
            }
            localStorage.setItem('Web-Agendamento-auth', JSON.stringify(auth))
            this.$router.push('/')
        },  
    },

}
</script>
<style lang="scss" scoped>
.profile-content {
    widows: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    ion-icon {
        color: #fff;
        transform: scale(3);
        cursor: pointer;
    }
    .profile-links {
        margin-top: 10%;
        opacity: 0; /* Inicialmente oculto */
        pointer-events: none; /* Impede interações com links ocultos */
        position: absolute;
        right: -70%;
        top: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        text-align: center;
        transition: opacity 0.3s ease-in-out;
        z-index: 9999;
    ul {
            margin: 0;
            padding: 10px;
            list-style: none;
            li {
                margin-bottom: 5%;
            }
            button{
                color: #fff;
                background-color: transparent;
                border: none;
                transition: .2s ease-in-out;
            }
            button:hover {                       
                text-decoration: underline;
            }
            .logout button{
                color: rgb(136, 35, 35);
                text-decoration: none;
                transition: 0.2s ease-in-out;
            }
            .logout button:hover{
                color: rgb(216, 31, 31);
            }
        } 
    }
    .profile-links.active {
        opacity: 1; /* Torna visível quando está ativo */
        pointer-events: auto;
    }
}
@media (max-width: 1208px) {
    /* Estilos para dispositivos móveis */
    .profile-links {
        right: -40% !important;
    }
    
}
</style>