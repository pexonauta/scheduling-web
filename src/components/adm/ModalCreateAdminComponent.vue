<template>
<div class="modal">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Novo Administrador</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
        <div class="alert alert-danger text-center" v-if="this.messageShow">
            {{ this.messageError }}
        </div>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="lastname" class="form-label">Sobrenome:</label>
                <input type="text" class="form-control" id="lastname" v-model="formData.lastname" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="formData.email" autocomplete="off">
            </div>
            <div class="mb-3">
                <div class="form-check inline-block">
                    <input class="form-check-input" type="radio" v-model="formData.type" value="Default" name="type" checked autocomplete="off">
                    <label class="form-check-label" for="exampleRadios1">
                        Padrão
                    </label>
                </div>
                <div class="form-check inline-block">
                    <input class="form-check-input" type="radio" v-model="formData.type" value="elevator" name="type" autocomplete="off">
                    <label class="form-check-label" for="exampleRadios1">
                        Superior
                    </label>
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Senha:</label>
                <input type="password" class="form-control" id="password" v-model="formData.password" autocomplete="off">
            </div>
        </form>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
        <button type="submit" class="btn btn-success" @click="saveChanges">Criar</button>
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
            id: '',
            name: '',
            lastname: '',
            email: '',
            type: 'Default',
            password: '',
        },
    };
    },
    methods: {
    closeModal() {
        this.$emit('close-modal');
    },
    saveChanges(e) {
        e.preventDefault()
        if(this.formData.name.length == 0 || this.formData.lastname.length == 0 || this.formData.email.length == 0 || this.formData.type.length == 0 || this.formData.password.length == 0 ) {
            this.messageShow = true
            this.messageError = 'Todos os itens são obrigatórios'
        }
        else {
            const users =JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const admins =JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
            const type = this.formData.type.toLocaleLowerCase() == 'default' ? 1 :
            this.formData.type.toLocaleLowerCase() == 'elevator' ? 2 : ''
            this.formData.type = type
            if(!users.some(user => user.email === this.formData.email) && !admins.some(admin => admin.email === this.formData.email)) {
                if(admins.length > 0) {
                    const lastAdmin = admins[admins.length - 1] 
                    this.formData.id = Number(lastAdmin.id) + 1
                    admins.push(this.formData)
                    localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins))
                    this.$emit('create-admin')
                }else {
                    this.formData.id = 1
                    admins.push(this.formData)
                    localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins))
                    this.$emit('create-admin')
                }
                
                

            }else {
                this.messageShow = true
                this.messageError = 'E-mail já cadastrado'
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