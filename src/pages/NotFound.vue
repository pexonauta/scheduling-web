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
                <router-link to="/Home" class="button">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                    Voltar
                </router-link>
            </div>
        </div>
    </main>
    <FooterComponent />
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
    name: "NotFoundPage",
    components: { 
        NavBarComponent,
        FooterComponent, 
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
            
        }
    }
    a {
        font-size: 1.4em;
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
    a:hover {
        color: rgb(11, 73, 131);
        text-decoration: underline;
    }
}
</style>
  