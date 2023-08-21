<template>
    <div class="content">
        <div class="search">
            <form action="#" class="d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                <input class="form-control w-25 me-4" type="date" aria-label="Data" :value="dateToday">
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
            </form>
        </div>
        <div class="container">
            <div class="row nothing" v-if="!schenduling">
                <div class="col">
                    <p>Nenhuma solicitação encontrada para agendar clique aqui<router-link to="/adm/scheduling"><ion-icon name="arrow-back-outline"></ion-icon></router-link></p>
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
                                    <button :id="'accept'+item.id" @click="event('accept', item.id)" class="btn btn-success me-2" >Aceitar</button>
                                    <button :id="'deny'+item.id" @click="event('deny', item.id)" class="btn btn-danger" >Negar</button>
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
export default {
    name: 'RoomsAdmPage',
    data() {
        return {
            schenduling: true,
            modals: {
                room: {}, 
                request: {},
            },
            room: {},
            adiditions: [
                'Ar Condicionado',
                'Projetor',
                'Quadro'
            ],
            items: [
                {id: '1', room: 'A20', type: 'padrao', requester: 'David', dateIn: '03/05', dateOut: '03/05'},
                {id: '2', room: 'salao', type: 'festa', requester: 'Gother', dateIn: '03/05', dateOut: '03/05'},
            ],
            
        }
    },
    components: {
        ModalRoom,
        ModalRequester,
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
        closeModal(type, itemId) {
            console.log(type,itemId)
            document.querySelector('#'+ type+ itemId).classList.add('info')
        },
        event(value, data) {
            const item = document.querySelector('#key' + data)
            if(confirm('Tem Certeza ?')) {
                if(value === 'accept') {
                    item.classList.add('hidden')
                }
                if(value === 'deny') {
                    item.classList.add('hidden')
                }
            }
            
        },

        
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
