<template>
    <NavBarComponent />
    <main>
        <div class="content">
            <div class="error">
                <h1>404</h1>
            </div>
            <div class="text-error">
                <p>Página não encontrada, por favor volte e tente novamente.</p>
            </div>
            <div class="back-link">
                <button @click="pageBack" to="/Home" class="button">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                    Voltar
                </button>
            </div>
        </div>
    </main>
    <FooterComponent />
</template>

<script>
import NavBarComponent from '@/components/users/NavBarComponent.vue';
import FooterComponent from '@/components/users/FooterComponent.vue';

export default {
    name: "NotFoundPage",
    components: { 
        NavBarComponent,
        FooterComponent, 
    },
    methods: {
        pageBack() {
            window.history.go(-1)
        }
    }
}
</script>
  
<style lang="scss" scoped>

.content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .error {
        text-align: center;
        h1 {
            font-size: 10em;
            font-weight: bold;
        }

    }
    .text-error {
        text-align: center;
        p {
            font-size: 1.4em;
            margin-bottom: 5px;
            
        }
    }
    .back-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    button {
        font-size: 1.4em;
        border: none;
        display: flex;
        align-items: center;
        justify-content: start;
        color: rgb(27, 135, 185);
        transition: .2s ease-in-out;
        ion-icon {
            margin-right: 5px;
            font-size: 1.2em;
        }
    }
    button:hover {
        color: rgb(11, 73, 131);
        text-decoration: underline;
    }
}
</style>
  