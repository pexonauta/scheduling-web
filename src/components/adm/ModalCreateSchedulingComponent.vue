<template>
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Agendar Sala</h5>
            
            <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
            <div class="alert alert-danger text-center" v-if="this.messageShow">
                {{ this.messageError }}
            </div>
            <form>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="status" 
                    id="scheduling" value="1" @click="messageHidden" v-model="formData.status">
                    <label class="form-check-label" for="scheduling">Agendar</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="status" 
                    id="request" value="2" @click="messageHidden" v-model="formData.status">
                    <label class="form-check-label" for="inlineRadio2">Solicitação</label>
                  </div>
                <div class="mb-3">
                    <label for="block" class="form-label">Data de Agendamento:</label>
                    <input type="date" @click="messageHidden" class="form-control" id="block" 
                    v-model="formData.date" 
                    :min="minDate">
                </div>
                <div class="mb-3">
                    <label for="room" class="form-label">Sala:</label>
                    <select class="form-select" @click="messageHidden" v-model="formData.room">
                        <option selected>Escolha a sala</option>
                        <option v-for="room in rooms" :value="room.id" :key="room.id">
                            {{ room.block.toUpperCase() + room.room }} 
                        </option>
                    </select>    
                </div>
                <div class="mb-3">
                    <label for="user" class="form-label">Usuário:</label>
                    <select class="form-select" @click="messageHidden" v-model="formData.user"> 
                        <option selected>Escolha o usuário</option>
                        <option v-for="user in users" :value="user.id" :key="user.id">
                            {{ user.name +' - '+ user.email }}
                        </option>
                    </select>    
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Tipo do Agendamento:</label>
                    <select class="form-select" @click="messageHidden" v-model="formData.type" >
                        <option selected>Escolha a ocasião</option>
                        <option value="1">Aula</option>
                        <option value="2">Evento</option>
                        <option value="3">Festa</option>
                        <option value="4">Curso ExtraCurricular</option>
                    </select>    
                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
                <button type="button" class="btn btn-success" @click="saveChanges">Criar</button>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        messageShow: false,
        messageError: '',
        formData: {
            date: '',
            room: 'Escolha a sala',
            user: 'Escolha o usuário',
            type: 'Escolha a ocasião',
            status: 1,
        },
        minDate: '',
        rooms: [],
        users: [],

      };
    },
    mounted() {
        const today = new Date();
        today.setDate(today.getDate())
        // Formate a data no formato "YYYY-MM-DD"
        const formattedDate = today.toISOString().substr(0, 10);
        this.formData.date = formattedDate;
        this.minDate = formattedDate;
        if(JSON.parse(localStorage.getItem('Web-Agendamento-users')).length > 0) {
            const users =  JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const usersFilter = users.filter(user => user.type === 1)
            this.users = usersFilter
        }
        if(JSON.parse(localStorage.getItem('Web-Agendamento-rooms')).length > 0) {
            const rooms =  JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
            this.rooms = rooms
        }
       
    },
    methods: {
        messageHidden() {
            this.messageError = ''
            this.messageShow = false
        },
        closeModal() {
            this.$emit('close-modal');
        },
        saveChanges() {
            if(this.formData.room === 'Escolha a sala' || this.formData.user === 'Escolha o usuário' || this.formData.type === 'Escolha a ocasião' ) {
                this.messageShow = true
                this.messageError = 'Todos os itens são obrigatórios'
            }
            else {
                const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
                const today = new Date();
                let dm = '01-01'
                const nextYear = new Date(today.getFullYear() + dm);
                nextYear.setFullYear(today.getFullYear() + 1);

                const formattedDate = today.toISOString().substr(0, 10);
                const formattedNextYear = nextYear.toISOString().substr(0, 10);
                if(this.formData.date >= formattedDate && this.formData.date < formattedNextYear) {
                    if(schedulings.length > 0) {
                        const requestFind = schedulings.findIndex(scheduling =>
                        scheduling.date == this.formData.date &&
                        scheduling.room === this.formData.room)
                        if(requestFind === -1) {
                            this.$emit('save-changes', this.formData);
                        }else {
                            this.messageShow = true
                            this.messageError = 'Já tem outro agendamento neste dia!'
                        }
                    }else {
                        this.$emit('save-changes', this.formData);
                    }
                }else {
                    this.messageShow = true
                    this.messageError = 'Data Inválida'
                }
            }
        },
    },
};
</script>
  
<style lang="scss" scoped>
.modal {
    display: block !important;
    background-color: rgba(0, 0, 0, 0.6); 

}

.modal-dialog {
max-width: 400px;
}

.modal-content {
border-radius: 10px;
}

.modal-header {
border-radius: 10px 10px 0 0;
}

.modal-footer {
border-radius: 0 0 10px 10px;
}
</style>