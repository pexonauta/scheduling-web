<template>
    <form>
        <div v-if="alert.status" :class="'alert ' + alert.type">
            {{ alert.message }}
        </div>
        <div class="mb-3 text-start">
            <label for="password" class="form-label">Senha:</label>
            <input type="password" class="form-control" id="password" v-model="formPassword.password">
        </div>
        <div class="mb-3 text-start">
            <label for="confirmPassword" class="form-label">Confirmar Senha:</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="formPassword.confirmPassword">
        </div>
        <button @click="saveChanges" type="submit" class="btn btn-primary">Salvar</button>
    </form>
</template>
<script>
export default {
    name: 'FormPasswordComponent',
    data() {
        return {
            alert: {
                status: false,
                type: '',
                message: '',
            },
            formPassword: {
                password: '',
                confirmPassword: '',
            }

        }
    },
    methods: {
      saveChanges(event) {
        event.preventDefault()
        if(this.formPassword.password.length !== 0 && 
        this.formPassword.confirmPassword.length !== 0) {
            if(this.formPassword.password.length >= 8 && 
            this.formPassword.confirmPassword.length >= 8) {
                if(this.formPassword.password === this.formPassword.confirmPassword) {
                    this.alert.status = true
                    this.alert.type = 'alert-success'
                    this.alert.message = 'Senha Atualizada'
                    const adminAuth = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).admin
                    const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
                    const adminIndex = admins.findIndex(admin => admin.id === adminAuth.id)
                    adminAuth.password = this.formPassword.password
                    admins[adminIndex] = {...adminAuth}
                   
                    localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins))

                    this.formPassword.password = ''
                    this.formPassword.confirmPassword = ''
                    this.$emit('save-changes');
                }else {
                    this.alert.status = true
                    this.alert.type = 'alert-warning'
                    this.alert.message = 'Senhas Diferentes'
                }
            }else {
                this.alert.status = true
                this.alert.type = 'alert-warning'
                this.alert.message = 'A senha deve ter 8 caracteres no mínimo'
            }
        }else {
            this.alert.status = true
            this.alert.type = 'alert-danger'
            this.alert.message = 'Preencha os campos para proseguir'
        }
        
        
        
        
      },
    },
}
</script>