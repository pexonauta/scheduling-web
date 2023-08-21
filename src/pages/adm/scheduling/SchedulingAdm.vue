<template>
    <div class="content">
        <div class="search d-flex">
            <form action="#" class="w-100 d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                <input class="form-control w-25 me-4" type="date" aria-label="Data"  :value="dateToday">
                
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
                    <table class="table table-striped table-sm">
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
                        <tbody class="text-center">
                            <tr v-for="item in items" :key="item.id" :id="'key'+ item.id">
                                
                                <td scope="row">{{ item.id }}</td>
                                <td class="info" :id="'room' + item.id"  @click="openModal('room', item.id)">
                                    {{ item.room }}
                                    <ModalRoom v-if="modals.room[item.id]" :room="item" @close-modal="closeModal"/>
                                </td>
                                <td>{{ item.type }}</td>
                                <td class="info" :id="'request' + item.id" @click="openModal('request', item.id)">
                                    {{ item.requester }} 
                                    <ModalRequester v-if="modals.request[item.id]" :requester="item" @close-modal="closeModal"/>
                                </td>
                                <td>{{ item.dateIn }} a {{ item.dateOut }}</td>
                                <td>
                                    <button :id="'cancel'+item.id" @click="event('cancel', item.id)" class="btn btn-danger" >Revogar</button>
                                </td>
                            </tr>
                        </tbody>
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
            modals: {
                room: {}, 
                request: {},
            },
            room: {},
            items: [
                {id: '1', room: 'A20', type: 'padrao', requester: 'David', dateIn: '06/08', dateOut: '09/08'},
                {id: '2', room: 'salao', type: 'festa', requester: 'Gother', dateIn: '09/08', dateOut: '09/08'},
            ],
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
    methods: {
        validatedSearch(event) {
            event.preventDefault()
        },
        openModal(type, itemId) {
            document.querySelector('#'+ type+ itemId).classList.remove('info')
            // Método para alternar o estado do modal do tipo 'room' para o item específico
            this.modals[type][itemId] = !this.modals[type][itemId];
        },
        closeModalCreate() {
            this.modalCreate = false
        },
        closeModal(type, itemId) {
            console.log(type,itemId)
            document.querySelector('#'+ type+ itemId).classList.add('info')
        },
        event(value, data) {
            const line = document.querySelector('#key' + data)
            if(confirm('Tem certeza que deseja cancelar o agendamento ?')) {
                if(value === 'cancel') {
                    const item = this.items.find((item) => item.id === data)
                    const today = new Date()
                    const nowmonth = (today.getMonth() + 1).toString().padStart(2, '0');
                    const nowday = (today.getDate() ).toString().padStart(2, '0');
                    // const hours = today.getHours()
                    if(item.dateIn.substring(3, 5) === nowmonth && item.dateIn.substring(0, 2) <= nowday || item.dateIn.substring(3, 5) === nowmonth && item.dateIn.substring(0, 2) === nowday -1) {
                        alert('Para fazer isso precisa de 24h de antecedência da data inicial')
                    }
                    else {
                        line.classList.add('hidden')
                    }
                }
            }
            
        },
        eventMark() {
            this.modalCreate = true
        },
        createRequest(data) {
            this.modalCreate = false
            console.log(data)
        }   
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
