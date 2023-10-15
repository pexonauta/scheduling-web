<template>
    <div class="modal fade show" 
    id="exampleModal" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true" 
    role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Solitar Agendamento</h1>
                <button type="button" class="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
                <div v-if="alert.status" :class="'alert '+ alert.type">
                    {{ alert.message }}
                </div>
                <div class="mb-3 row">
                    <label for="staticRoom" class="col-sm-2 col-form-label">Sala:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" :value="findBlock(room.block) + room.room">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">E-mail:</label>
                    <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" v-model="user.email">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="date" class="col-sm-2 col-form-label">Data:</label>
                    <div class="col-sm-6">
                        <input type="date" class="form-control" v-model="formData.date" :min="minDate">
                    </div>
                    <label :class="'col-sm-2 fs-4 col-form-label ' + classe">{{validatedDate()}}</label>
                </div>
                <div class="mb-3 row">
                    <label for="type" class="col-sm-5 col-form-label">Tipo do Agendamento:</label>
                    <div class="col-sm-6">
                        <select class="form-select" v-model="formData.type" >
                            <option selected>Escolha a ocasião</option>
                            <option value="1">Aula</option>
                            <option value="2">Evento</option>
                            <option value="3">Festa</option>
                            <option value="4">Curso ExtraCurricular</option>
                        </select>    
                        
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" 
                data-bs-dismiss="modal" @click="closeModal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="newScheduling">Enviar</button>
            </div>
            </div>
        </div>
        </div>
</template>
<script>
export default {
    props: ['id'],
    data: () => ({
        classe: '',
        minDate: '',
        dateValidated: false,
        alert: {
            status: false,
            type: '',
            message: '',
        },
        room: {},
        user: {},
        formData: {
            room: '',
            type: 'Escolha a ocasião',
            user: '',
            date: '',
        },
    }),
    mounted() {
        const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
        const room = rooms.filter(room => room.id === this.id)[0]
        this.room = room
        this.formData.room = room.id
        const authenticated = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user
        this.user = authenticated
        this.formData.user = this.user.id
        const today = new Date()
        const todayFormatted = today.toISOString().slice(0, 10);
        this.minDate = todayFormatted
        this.formData.date = todayFormatted

    },
    methods: {
        validatedDate() {
            const today = new Date()
            const todayFormatted = today.toISOString().slice(0, 10);
            const nextYear = today.getFullYear()
            if(this.formData.date >=  todayFormatted && this.formData.date < Number(nextYear + 1) + '-01-01') {
                const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
                const scheduling = schedulings.findIndex(scheduling => scheduling.date == 
                this.formData.date && scheduling.room === this.id)
                if(scheduling === -1) {
                    this.classe = 'text-success'
                    this.dateValidated = true
                    return 'Disponível' 
                }else {
                    this.classe = 'text-warning'
                    this.dateValidated = false
                    return 'Indisponível'
                }
            }else {
                this.classe = 'text-warning'
                this.dateValidated = false
                return 'Indisponível'
            }
        },
        newScheduling() {
            console.log(!isNaN(this.formData.type))
            if(this.dateValidated) {
                if(!isNaN(this.formData.type) && this.formData.type !== null && 
                this.formData.type !== 'Escolha a ocasião') {
                    const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
                    const scheLast = schedulings.length > 0 ? schedulings[schedulings.length - 1] : []
                    
                    const newScheduling = {
                        id: scheLast.length === 0 ? 1 : Number(scheLast.id) + 1,
                        room: this.formData.room,
                        type: this.formData.type,
                        user: this.formData.user,
                        date: this.formData.date,
                        status: 0,
                    }
                    schedulings.push(newScheduling);
                    localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify(schedulings));
                    this.$emit('success')
                    this.$emit('close-modal')
                }
                else {
                    this.alert.status = true
                    this.alert.type = 'alert-warning'
                    this.alert.message = 'Coloque qual o tipo de agendamento'
                }
            }else {
                this.alert.status = true
                this.alert.type = 'alert-warning'
                this.alert.message = 'Data Inválida'
            }
            
        },
        closeModal() {
            this.$emit('close-modal')
        },
        findBlock(id) {
            const blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))
            const block = blocks.find(block => block.id === id)
            if(block){return block.block}
        },
    }
}
</script>
<style scoped>
.modal {
    display: block !important;
    background-color: #00000079 !important;
}
</style>