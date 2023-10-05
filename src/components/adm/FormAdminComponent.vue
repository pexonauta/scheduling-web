<template>
    <form>
        <div v-if="alert.status" :class="'alert' + alert.type">
            {{ alert.message }}
        </div>
    <div class="mb-3 text-start">
        <label for="name" class="form-label">Nome:</label>
        <input type="text" class="form-control" id="name"  v-model="formAdmin.name" :disabled="buttonsD">
    </div>
    <div class="mb-3 text-start">
        <label for="lastname" class="form-label">Sobrenome:</label>
        <input type="text" class="form-control" id="lastname" v-model="formAdmin.lastname" :disabled="buttonsD">
    </div>
    <div class="mb-3 text-start">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" class="form-control" id="email" v-model="formAdmin.email" :disabled="buttonsD">
    </div>
        <button v-if="!buttonsD" @click="saveChanges('admin')" type="button" class="btn btn-primary">Salvar</button>
    </form>
</template>
<script>
export default {
    name: 'FormAdminComponent',
    props: {
        Admin: {
            type: Object,
            required: true,
        },
        buttonsD: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            alert: {
                status: false,
                message: '',
                type: '',
            },
            formAdmin: {
                id: '',
                name: '',
                lastname: '',
                email: '',
            }
        }
    },
    mounted() {
        const admin = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).admin
        this.formAdmin.id = admin.id
        this.formAdmin.name = admin.name
        this.formAdmin.lastname = admin.lastname
        this.formAdmin.email = admin.email
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges(value) {
        if(value == 'admin') {
            const adminEmail = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).admin
            const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))

            const adminsFilter = admins.filter(admin => admin.email.toLowerCase() 
            !== adminEmail.email.toLowerCase())

            const notFoundAdmin = adminsFilter.length === 0 ? -1:adminsFilter.findIndex(admin => admin.email.toLowerCase() 
            === this.formAdmin.email.toLowerCase())
            const notFoundUsers = users.findIndex(user => user.email.toLowerCase() 
            === this.formAdmin.email.toLowerCase())

            
            if(notFoundAdmin === -1 && notFoundUsers === -1 ) {
                const adminIndex = admins.findIndex(admin => admin.id === this.formAdmin.id)
                const adminUp = admins.find(admin => admin.id === this.formAdmin.id)
                adminUp.name = this.formAdmin.name
                adminUp.lastname = this.formAdmin.lastname
                adminUp.email = this.formAdmin.email
                admins[adminIndex] = {... adminUp} 
                localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins))
                this.$emit('save-changes')
            }
            else {
                this.alert.status = true
                this.alert.type = 'alert-warning'
                this.alert.message = 'E-mail já existente'
            }
            
        }
        
      },
    },
}
</script>