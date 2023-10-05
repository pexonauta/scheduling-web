<template>
    <div class="content">
        <div class="container">
            <div class="row mt-5">
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/requests" title="Novos Registros" 
                    subtitle="Solicitações de Acesso" :qtd="amounts.requests"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/users" title="Usuários" 
                    subtitle="Usuários Cadastrados" :qtd="amounts.users"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/rooms" title="Pedidos de Agendamentos" 
                    subtitle="Solicitações de Agendamento de sala" :qtd="amounts.rooms"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/scheduling" title="Agendados" 
                    subtitle="Salas Agendadas " :qtd="amounts.schedulings"/>
                </div>
                <div class="col mt-2">
                    <CardInfoComponent router="/adm/management" title="Administrativo" 
                    subtitle="Algumas Opções Administrativas" qtd="-1"/>
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
    data() {
        return {
            amounts: {
                requests: 0,
                users: 0,
                rooms: 0,
                schedulings: 0,
            }
        }
    },
    unmounted() {
        this.amounts.requests = 0
        this.amounts.users = 0
        this.amounts.rooms = 0
        this.amounts.schedulings = 0
    },
    mounted() {
        const users =  JSON.parse(localStorage.getItem('Web-Agendamento-users'))
        const qtdRequests = users.filter(user => user.type === 0)
        const qtdUsers = users.filter(user => user.type === 1)
        const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
        const qtdSchedulingsRequest = schedulings.filter(scheduling => scheduling.status === 0)
        const qtdSchedulings = schedulings.filter(scheduling => scheduling.status === 1)
        this.amounts.requests = Number(qtdRequests.length)
        this.amounts.users = Number(qtdUsers.length)
        this.amounts.rooms = Number(qtdSchedulingsRequest.length)
        this.amounts.schedulings = Number(qtdSchedulings.length)
    }
}
</script>