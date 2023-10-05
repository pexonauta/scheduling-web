<template>
    <div class="content">
        <div class="search d-flex">
            <form action="#" class="w-100 d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                <input class="form-control w-25 me-4" type="date" aria-label="Data"  
                :value="dateToday" :min="minDate">
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
                
            </form>
            <button @click="eventMark" class="w-auto btn btn-success me-2" type="submit">Agendar</button>
            <ModalCreate v-if="modalCreate" @close-modal="closeModalCreate" @save-changes="createRequest"/>
        </div>
        <div class="container">
            <div class="row nothing" v-if="!schenduling">
                <div class="col">
                    <p>Nenhum Agendamento Encontrado, para agendar basta clicar aqui<router-link to="/Rooms"><ion-icon name="arrow-back-outline"></ion-icon></router-link></p>
                </div>
            </div>
            
            <div class="row" v-if="schenduling">
                <div class="col">
                    <table  v-if="schedulings.length !== 0" class="table table-striped table-sm">
                        <thead class="table-primary text-center">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Sala</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Solicitante</th>
                                <th scope="col">Entrada e Sáida</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody  class="text-center">
                            <tr v-for="scheduling in schedulings" :key="scheduling.id" :id="'key'+ scheduling.id">
                                
                                <td scope="row">{{ scheduling.id }}</td>
                                <td class="info" :id="'room' + scheduling.id"  @click="openModal('room', scheduling.id)">
                                    {{ findRoom(scheduling.room) }}
                                    <ModalRoom v-if="modals.room[scheduling.id]" :scheduling="scheduling.id" :room="scheduling.room" @close-modal="closeModal"/>
                                </td>
                                <td>{{ scheduling.type == 1 ? 'Aula' : scheduling.type == 2 ? 'Evento' : 
                                    scheduling.type == 3 ? 'Festa' : 'Curso ExtraCurricular' }}</td>
                                <td class="info" :id="'request' + scheduling.id" @click="openModal('request', scheduling.id)">
                                    {{ findUser(scheduling.user)  }} 
                                    <ModalRequester v-if="modals.request[scheduling.id]" :scheduling="scheduling.id" :requester="scheduling.user" @close-modal="closeModal"/>
                                </td>
                                <td>{{ scheduling.date }} a {{ scheduling.date }}</td>
                                <td>
                                    <button :id="'cancel'+scheduling.id" @click="event('cancel', scheduling.id)" class="btn btn-danger" >Revogar</button>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <table v-else class="table table-striped table-sm">
                        <thead class="table-primary text-center">
                            <div class="bg-warning p-3 fs-3">
                                Nenhum agendamento encontrado
                            </div>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="pagination" v-if="schenduling">

            </div>
        </div>
    </div>
</template>
<script>
import ModalRoom from '@/components/adm/ModalRoomComponent.vue'
import ModalRequester from '@/components/adm/ModalRequesterComponent.vue'
import ModalCreate from '@/components/adm/ModalCreateSchedulingComponent.vue'
export default {
    name: 'SchedulingAdmPage',
    data() {
        return {
            schenduling: true,
            modalCreate: false,
            minDate: '',
            modals: {
                room: {}, 
                request: {},
            },
            room: {},
            schedulings: [],
            adiditions: [
                'Ar Condicionado',
                'Projetor',
                'Quadro'
            ],
        }
    },
    components: {
        ModalRoom,
        ModalRequester,
        ModalCreate,
    },
    computed: {
        dateToday() {
            const today = new Date()
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    mounted() { 
        if(!localStorage.getItem('Web-Agendamento-schedulings')){
            localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify([]))
        }
        const schedulings = localStorage.getItem('Web-Agendamento-schedulings')  ?
        JSON.parse(localStorage.getItem('Web-Agendamento-schedulings')) : []

        this.schedulings = schedulings.filter(scheduling => scheduling.status === 1)
        const today = new Date();
        today.setDate(today.getDate())
        // Formate a data no formato "YYYY-MM-DD"
        const formattedDate = today.toISOString().substr(0, 10);

        this.minDate = formattedDate;
       
    },
    methods: {
        validatedSearch(event) {
            event.preventDefault()
        },
        openModal(type, itemId) {
            console.log(type,itemId)
            document.querySelector('#'+ type+ itemId).classList.remove('info')
            // Método para alternar o estado do modal do tipo 'room' para o item específico
            this.modals[type][itemId] = !this.modals[type][itemId];
        },
        closeModalCreate() {
            this.modalCreate = false
        },
        closeModal(type, itemId) {
            console.log(type,itemId)
            document.querySelector('#'+ type + itemId).classList.add('info')
        },
        event(value, data) {
            if(confirm('Tem certeza que deseja cancelar o agendamento ?')) {
                if(value === 'cancel') {
                    const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
                    
                    this.schedulings = schedulings.filter(scheduling => scheduling.id !== data)
                    localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify(this.schedulings))
                }
            }
            
        },
        eventMark() {
            this.modalCreate = true
        },
        createRequest(data) {
            this.modalCreate = false
            const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
            const scheLast = schedulings.length > 0 ? schedulings[schedulings.length - 1] : []
            
            const newScheduling = {
                id: scheLast.length === 0 ? 1 : Number(scheLast.id) + 1,
                room: data.room,
                type: data.type,
                user: data.user,
                date: data.date,
                status: data.status == 1 ? 1 : data.status == 2 ? 0 : 0,
            }
            schedulings.push(newScheduling);
            this.schedulings = schedulings.filter(scheduling => scheduling.status === 1)
            localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify(schedulings));
            
            
        },
        findUser(data) {
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const user = users.find(user => user.id === data)
            return user.name
        },
        findRoom(data) {
            const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
            const room = rooms.find(room => room.id === data)
            return room.block.toUpperCase()+room.room  
        },
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
