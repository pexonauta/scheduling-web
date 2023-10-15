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
        if(localStorage.getItem('Web-Agendamento-users') && localStorage.getItem('Web-Agendamento-schedulings')) {
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
        if(!localStorage.getItem('Web-Agendamento-users')) {
            localStorage.setItem('Web-Agendamento-users', JSON.stringify([]))
        }
        if(!localStorage.getItem('Web-Agendamento-schedulings')) {
            localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify([]))
        }
        if(!localStorage.getItem('Web-Agendamento-blocks')|| 
        JSON.parse(localStorage.getItem('Web-Agendamento-blocks')).length === 0) {
            const blocks = [
                {id: 1, block: "A"},
                {id: 2, block: "C"},
                {id: 3, block: "D"},
                {id: 4, block: "B"}]
            localStorage.setItem('Web-Agendamento-blocks', JSON.stringify(blocks))
            const rooms = [
                {id: 1, room: 20, block: 1, capacity: 30, type: "1"},
                {id: 2, room: 31, block: 4, capacity: 30, type: "1"},
                {id: 3, room: 21, block: 4, capacity: 30, type: "1"},
                {id: 4, room: 12, block: 2, capacity: 30, type: "1"},
                {id: 5, room: 15, block: 3, capacity: 30, type: "1"},
                {id: 6, room: 21, block: 2, capacity: 30, type: "1"},
                {id: 7, room: 7, block: 1, capacity: 30, type: "1"} ,
                {id: 8, room: 2, block: 3, capacity: 30, type: "2"}]
            localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(rooms))
        }
        if(!localStorage.getItem('Web-Agendamento-rooms') || 
        JSON.parse(localStorage.getItem('Web-Agendamento-rooms')).length === 0) {
            const blocks = [
                {id: 1, block: "A"},
                {id: 2, block: "C"},
                {id: 3, block: "D"},
                {id: 4, block: "B"}]
            localStorage.setItem('Web-Agendamento-blocks', JSON.stringify(blocks))
            const rooms = [
                {id: 1, room: 20, block: 1, capacity: 30, type: "1"},
                {id: 2, room: 31, block: 4, capacity: 30, type: "1"},
                {id: 3, room: 21, block: 4, capacity: 30, type: "1"},
                {id: 4, room: 12, block: 2, capacity: 30, type: "1"},
                {id: 5, room: 15, block: 3, capacity: 30, type: "1"},
                {id: 6, room: 21, block: 2, capacity: 30, type: "1"},
                {id: 7, room: 7, block: 1, capacity: 30, type: "1"} ,
                {id: 8, room: 2, block: 3, capacity: 30, type: "2"}]
            localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(rooms))
        }
    }
}
</script>