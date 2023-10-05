<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Sala: {{ room.block + room.room }} 
                <span class="position-absolute end-0 fs-6 me-3 text-body-secondary">{{ scheduling.date}}</span>
            </h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Capacidade: {{ room.capacity }} </h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Tipo: {{ scheduling.type }} </h6>
            <p class="card-text"></p>
            <button type="submit" class="btn btn-danger" @click="modalScheduling = true">Cancelar</button>
            <span class="float-end fs-4 text-success"> Agendado</span>
        </div>
        
    </div>
    <ModalSheduling 
    v-if="modalScheduling" 
    @close-modal="closeModal" 
    @cancel-scheduling="cancelScheduling"/>
</template>
<script>
import ModalSheduling from './ModalSheduling.vue'
export default {
    name: 'CardRoomComponent',
    components: {
        ModalSheduling
    },
    props: ['id'],
    data: () => ({
        modalScheduling: false,
        scheduling: [],
        room: [],
    }),
    mounted() {
        const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
        this.scheduling = schedulings.filter(scheduling => scheduling.id === this.id)[0]
        const dateParts = this.scheduling.date.split('-'); // Divide a data em partes
        const day = dateParts[2]; // Obtém o dia
        const month = dateParts[1]; // Obtém o mês
        this.scheduling.date = `${day}/${month}`; 
        const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
        this.room = rooms.filter(room => room.id === this.scheduling.room)[0] 
        console.log(this.scheduling)
    },
    methods: {
        cancelScheduling() {
            const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
            const schedulingsFilter = schedulings.filter(scheduling => scheduling.id !== this.id) 
            localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify(schedulingsFilter))
            this.$emit('scheduling-success')
            this.modalScheduling = false
        },
        closeModal() {
            this.modalScheduling = false
        },
    }
}
</script>