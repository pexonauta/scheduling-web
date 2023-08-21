<template>
    <div class="content">
        <div class="container">
            <div class="row mt-5">
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/requests" title="Novos Registros" subtitle="Registros feito em menos de 24h" qtd="20"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/users" title="Usuários" subtitle="Usuários cadastrados dentro do sistema " qtd="12"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/rooms" title="Pedidos de Agendamentos" subtitle="solicitações de agendamento de sala" qtd="12"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/scheduling" title="Agendados" subtitle="salas agendadas " qtd="8"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/management" title="Administrativo" subtitle="Algumas opções administrativas" qtd="-1"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CardInfoComponent from '@/components/adm/CardInfoComponent.vue';
export default {
    name: 'HomePage',
    components: {
        CardInfoComponent,
    },
}
</script>