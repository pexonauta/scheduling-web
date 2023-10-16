<template>
    <div class="content">
        <div class="content-info">
            <div class="content-image">
                <img class="img-fluid" src="@/assets/img/HomePage.webp" alt="">
            </div>
            <div class="content-text">
                <h2>Sobre os Agendamentos</h2>
                <p>As os agendamentos é feito por periodo, as salas são 
                compostas por 30 cadeiras cada, tem um salão que é reservado 
                apenas final de semana, para ver as salas só clicar no botão abaixo.</p>
                <router-link to="/scheduling-web/user/rooms" class="button">
                    Ver 
                    <ion-icon name="arrow-redo-outline"></ion-icon>
                </router-link>
            </div>
        </div>
  </div>
</template>
<script>

export default {
    name: 'HomePage',
    components: {
    }
}
</script>
<style src="./style.scss" lang="scss" scoped />
