<template>
    <footer class="w-100 position-absolute bottom-0">
        <div class="creator" v-if="nootBook">
            <h3>{{user.name}}</h3>
        </div>
        <div class="infos-aditions" v-if="nootBook">
            CopyRight@2023 Project Private
        </div>
        <div class="icons">
            <a href="https://laravel.com" target="_blank" class="button">
                <ion-icon name="logo-laravel"></ion-icon>
            </a>
            <a href="https://vuejs.org" target="_blank" class="button">
                <ion-icon name="logo-vue"></ion-icon>
            </a>
            <a href="https://www.instagram.com/pexoweb_/" target="_blank" class="button">
                <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a href="https://twitter.com/login" target="_blank" class="button">
                <ion-icon name="logo-twitter"></ion-icon>
            </a>
            <a href="https://www.facebook.com" target="_blank" class="button">
                <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a href="https://github.com/pexonauta" target="_blank" class="button">
                <ion-icon name="logo-github"></ion-icon>
            </a>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            nootBook: true,
            user: {
                id: '',
                name: '',
                email: '',
                type: '',
            },
        }
    },
    mounted() {
        // Adicionar o event listener para verificar a largura da tela ao carregar o componente
        this.checkScreenWidth();

        // Adicionar o event listener para verificar a largura da tela quando houver redimensionamento da janela
        window.addEventListener('resize', this.checkScreenWidth);
        if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).auth === 'authenticated' && JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user) {
            const user = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user
            this.user.id = user.id
            this.user.name = user.name
            this.user.email = user.email
            this.user.type = user.type
        }else {
            this.$router.push('/')
        }
    },
    unmounted() {
        // Remover o event listener quando o componente for destruído para evitar vazamentos de memória
        window.removeEventListener('resize', this.checkScreenWidth);
        this.user.id = ''
        this.user.name = ''
        this.user.email =''
        this.user.type = ''
    },
    methods: {
        checkScreenWidth() {
        // Atualizar o valor da propriedade 'nootBook' com base na largura da tela
        this.nootBook = window.innerWidth > 768;
        },
    },
}
</script>
<style lang="scss" scoped>
footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #3498db !important;
    color: #fff;

    .icons {
        font-size: 2em;
        ion-icon {
            color: #fff;
            margin-right: 15px;
            transition: all .3s ease-in-out;
            
        }
        ion-icon:hover {
            transform: scale(1.4);
        }
    }
}
</style>