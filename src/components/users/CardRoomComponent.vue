<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Sala: {{ title }} 
                <span class="position-absolute end-0 fs-6 me-3 text-body-secondary">{{dateInChild()}}</span>
            </h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">Capacidade: {{ capacity }} </h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Tipo: {{ typeclass }} </h6>
            <p class="card-text">{{ adiditions.join(', ') }}.</p>
            <button type="submit" class="btn btn-primary" @click="scheduling">Agendar</button>
            <span :class="'float-end fs-4 '+ classe">{{ validateScheduling() }}</span>
        </div>
        
    </div>
    <ModalFormScheduling v-if="modalForm" :id="id" @close-modal="closeModal" @success="success"/>
</template>
<script>
import ModalFormScheduling from './ModalFormScheduling.vue'
export default {
    name: 'CardRoomComponent',
    components: {
        ModalFormScheduling
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        capacity: {
            type: String,
            required: true,
        },
        adiditions: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        modalForm: false,
        message: '',
        classe: '',
        typeclass: '',
        dateValidated: '',
    }),
    mounted() {
        this.typeclass = this.type == 1 ? 'Aula' : this.type == 2 ? 'Evento' : 
        this.type == 3 ? 'Festa' : 'Curso ExtraCurricular'
    },
    methods: {
        scheduling() {
            this.modalForm = true
            this.$emit('openModalSheduling')
        },
        closeModal() {
            this.modalForm = false
        },
        dateInChild() {
            const partesDaData = this.date.split('-'); // Divide a data em partes
            const dia = partesDaData[2]; // Obtém o dia
            const mes = partesDaData[1]; // Obtém o mês
            return `${dia}/${mes}`;
        },
        validateScheduling() {
            const today = new Date()
            const todayFormatted = today.toISOString().slice(0, 10);
            const nextYear = today.getFullYear()
            if(this.date >=  todayFormatted && this.date < Number(nextYear + 1) + '-01-01') {
                const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
                const scheduling = schedulings.findIndex(scheduling => scheduling.date == 
                this.date && scheduling.room === this.id)
                if(scheduling === -1) {
                    this.classe = 'text-success'
                    return 'Disponível' 
                }else {
                    
                    this.classe = 'text-warning'
                    return 'Indisponível'
                }
            }else {
                this.classe = 'text-warning'
                return 'Indisponível'
            }
            

        },
        success() {
            this.$emit('scheduling-success')
        },
    }
}
</script>