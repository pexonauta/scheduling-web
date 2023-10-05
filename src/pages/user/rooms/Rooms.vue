<template>
    <div class="content">
        <div class="search" v-if="roomStatus">
            <form action="#" class="d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                <input class="form-control w-25 me-4" type="date" 
                aria-label="Data" v-model="date" :min="minDate">
            </form>
        </div>
        <div class="container">
            <div v-if="alert.status" :class="'text-center alert ' + alert.type">
                {{ alert.message }}
            </div>
            <div class="row nothing" v-if="!roomStatus">
                <div class="col">
                    <p>Nenhuma Sala Foi Encontrada, Tente Novamente Mais Tarde.</p>
                </div>
            </div>
            <div class="row" v-if="roomStatus">
                <div class="col" v-for="room in rooms" :key="room.id">
                    <CardRoomComponent
                    :id="room.id" 
                    :title="room.block.toUpperCase() + room.room" 
                    :date="date"
                    :type="room.type"
                    :capacity="room.capacity" 
                    :adiditions="adiditions"
                    @scheduling-success="successScheduling"/>
                </div>
            </div>
            <div class="pagination" v-if="roomStatus">
               <PaginationComponent />
            </div>
        </div>
    </div>
</template>
<script>
import CardRoomComponent from '@/components/users/CardRoomComponent.vue'
import PaginationComponent from '@/components/users/PaginationComponent.vue'
export default {
    name: 'RoomsPage',
    data() {
        return {
            date: '',
            minDate: '',
            roomStatus: false,
            alert: {
                status: false,
                type: '',
                message: '',
            },
            modalForm: {
                status: false,
                data: '',
            },
            rooms: [],
            adiditions: [
                'Ar Condicionado',
                'Projetor',
                'Quadro'
            ]
        }
    },
    components: {
    CardRoomComponent,
    PaginationComponent,
},
    mounted() {
        if(JSON.parse(localStorage.getItem('Web-Agendamento-rooms')).length > 0) {
            this.roomStatus = true
            this.rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
        }
        if(this.date == '' ) {
            const today = new Date()
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const todayFormatted = today.toISOString().slice(0, 10);
            this.minDate = todayFormatted
            this.date = `${year}-${month}-${day}`;
        }
        
    },
    methods: {
        successScheduling() {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Solicitação enviada com sucesso!'
            this.messageHidden()
        },
        messageHidden() {
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 3000);
        }
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
