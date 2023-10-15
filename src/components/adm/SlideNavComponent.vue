<template>
     <div class="slideBar" id="slideNav" ref="slideNav">
        <div @click="openSelectImage" class="profile-image">
            <img src="@/assets/img/profile_test_dog.jpg" alt="">
            <input @change="profileImage" type="file" name="imageProfile"  id="profileImage">
        </div>
        <div class="nav-links">
            <ul>
                <li :class="{active:  isActiveRouter('/adm') || isActiveRouter('/adm/')}">
                    <RouteLink router="/adm/" text="Inicio" icon="home-outline"/>
                </li>
                <li :class="{active: isActiveRouter('/adm/requests')}">
                    <RouteLink router="/adm/requests" text="Pedidos de Entrada" icon="person-add-outline"/>
                </li>
                <li :class="{active: isActiveRouter('/adm/users')}">
                    <RouteLink router="/adm/users" text="Usuários" icon="people-outline"/>
                </li>
                <li :class="{active: isActiveRouter('/adm/rooms')}">
                    <RouteLink router="/adm/rooms" text="Salas Solicitação" icon="duplicate-outline"/>
                </li>
                <li :class="{active: isActiveRouter('/adm/scheduling')}">
                    <RouteLink router="/adm/scheduling" text="Agendadas" icon="calendar-number-outline"/>
                </li>
                <li :class="{active: isActiveRouter('/adm/management')}">
                    <RouteLink router="/adm/management" text="Feramentas" icon="construct-outline"/>
                </li>
                <li class="leave" @click="modalLogout = true">
                    <button>
                        <span class="icon"><ion-icon name="exit-outline"></ion-icon></span>
                        <span class="title"> Sair</span>
                    </button>
                </li>
            </ul>
        </div>
        <div @click="closeNav" class="toggle" id="toggle" ref="toggle"></div>
    </div>
    <ModalInput
    v-if="modalLogout"
    title="Deslogar"
    text="Você tem certeza que deseja sair ?" 
    button="Sair"
    @close-Modal="modalLogout = false"
    @save-change="adminlogout"
    />
</template>
<script>
import RouteLink from './RouteLinkComponent.vue'
import ModalInput from '../users/ModalInputComponent.vue'
export default {
    name: 'NavigationComponent',
    components: {
        RouteLink,
        ModalInput,
    },
    data: () => ({
        modalLogout: false,
    }),
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    unmounted() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        isActiveRouter(route) {
           return this.$route.path === route
        },
        handleClickOutside(event) {
            const slideBar = document.getElementById('slideNav');
            if (!slideBar.contains(event.target)) {
                // Clique fora do slideBar, fechar o slideBar aqui
                if(slideBar.classList.contains('on')){
                    this.closeNav()
                }
            }
        },
        closeNav() {
            let navigation = document.querySelector('#slideNav')
            if(navigation.classList.contains('on')) {
                navigation.classList.remove('on')
            }
            else {
                navigation.classList.add('on')
            }
            
        },
        openSelectImage() {
            const fileInput = document.querySelector('#profileImage')
            fileInput.click()
        },
        profileImage(event) {
            const fileInput = event.target;
            if (fileInput.files && fileInput.files.length > 0) {
                // Aqui você pode acessar os arquivos selecionados pelo usuário
                console.log(fileInput.files[0]);
                // Faça o que precisa com o arquivo selecionado
            } else {
                // O usuário não selecionou nenhum arquivo
                console.log('Nenhum arquivo selecionado.');
            }
        },
        adminlogout() {
            const auth = {
                auth: 'undefined'
            }
            localStorage.setItem('Web-Agendamento-auth', JSON.stringify(auth))
            this.$router.push('/')
        }
    }
}
</script>
<style lang="scss" >
.slideBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100vh;
    background-color: rgb(0, 68, 255);
    overflow: scroll;
    transition: all .3s ease-in-out;
    z-index: 999;
    &::-webkit-scrollbar {
        display: none !important;
    }
    .profile-image {
        width: 40px;
        height: 40px;

        margin: 5% auto;
        position: relative;
        transition: all .3s ease-in-out;

        
        
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        &::after {
            content: 'Alterar Imagem';
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Cor preta com 50% de opacidade */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .7em;
            color: #fff; /* Cor do texto */
            font-weight: bold;
            cursor: pointer;
            opacity: 0; /* Inicialmente, o ::after será invisível */
            transition: opacity 0.3s ease-in-out; /* Transição para torná-lo visível gradualmente */
        }
        &:hover::after {
            opacity: 1;
        }
        input {
            display: none !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            opacity: 0;
            cursor: pointer;
        }
    }
    .nav-links {
        display: flex;
        align-items: center;
        justify-content: center;
        ul {
            position:absolute;
            width: 100%;
            top: 20%;
            left: 0;
            padding: 0;
            list-style: none;
            li  {
                position: relative;
                width: 100%;
                margin-bottom: 20px;
                transition: all .3s ease-in-out;
                a{
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px;
                    
                    background-color: #fff;
                    border-radius: 50%;
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #000;
                    transition: all .3s ease-in-out;
                    .icon {
                        margin-top: 8px;
                        font-size: 1.5em;
                        transition: .3s ease-in-out;
                    }
                    .title{
                        display: none;
                    }
                }
                a:hover {
                    color: #fff;
                    background-color: #000;
                    .icon {
                        transform: scale(1.2);
                    }
                }
                button{
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 15px;
                    
                    background-color: #fff;
                    border-radius: 50%;
                    font-size: 1.2em;
                    font-weight: bold;
                    color: #000;
                    border: none;
                    transition: all .3s ease-in-out;
                    .icon {
                        margin-top: 8px;
                        font-size: 1.5em;
                        transition: .3s ease-in-out;
                    }
                    .title{
                        display: none;
                    }
                }
                button:hover {
                    color: #fff;
                    background-color: #000;
                    .icon {
                        transform: scale(1.2);
                    }
                }
            }
            li:last-child {
                margin-bottom: 120%;
            }
            li.active a{
                background-color: #000;
                color: #09c3f1;
            }
        }
    }

    #toggle {
    position: fixed;
    left: 5px;
    bottom: 0px;
    height: 50px;
    width: 50px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #f7f5f5;
    transition: all .3s ease-in-out;
        &::before {
            content: '';
            position:   absolute;
            top: 45%;
            left: 25%;
            width: 26px;
            height: 4px;
            border-radius: 3px;
            background-color: #0ba1a1;
            transform: translateY(-5px);
            transition: 1s;
        }
        &::after {
            content: '';
            position:   absolute;
            top: 70%;
            left: 25%;
            width: 26px;
            height: 4px;
            border-radius: 3px;
            background-color: #0ba1a1;
            transform: translateY(-5px);
            transition: 1s;
        }
    }
}
.slideBar.on {
    width: 250px !important;
    .profile-image {
        width: 80px;
        height: 80px;
        &::after {
            font-size: 1em;
        }
    }
    a {
        border-radius: 20px 0 0 20px !important;
        .title{
            display: block !important;
            margin-left: 15px;
        }
        .icon {
            margin-top: 8px !important;
            position: absolute;
            left: 10px;
        }
    }
    button {
        width: 100%;
        border-radius: 20px 0 0 20px !important;
        .title{
            display: block !important;
            margin-left: 15px;
        }
        .icon {
            margin-top: 8px !important;
            position: absolute;
            left: 10px;
        }
    }
    #toggle {
        left: 190px;
        &::before {
            left: 24%;
            transform: translateY(0px) rotate(-410deg);
        }
        &::after {
            top: 45%;
            left: 24%;
            transform: translateY(0px) rotate(-130deg);
        }
    }
}
.leave button:hover {
    color: #8d1212 !important;
}

@media (max-height: 800px) {
    .slideBar {
        ul {
            top: 10% !important;
            li:last-child {
             margin-bottom: 100% !important;
            }
        }
    }
    .slideBar.on {
        ul {
            top: 25% !important;
            li:last-child {
                margin-bottom: 25% !important;
            }
        }
    }
}
@media (max-height: 450px) {
    .slideBar {
        ul {
            top: 20% !important;
        }
    }
}
</style>