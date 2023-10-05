<template>
    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Configurações</h5>
            <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div v-if="alert.status" :class="'alert ' + alert.type">
                {{ alert.message }}
            </div>
            <FormAdminComponent v-if="formData" :buttonsD="disabledButtons" @save-changes="adminUpdate"/>
           <FormPassword v-if="!formData" @save-changes="adminPass"/>
            <button v-if="buttonPassword" @click="eventAlterPassword" class="btn btn-info me-2">Alterar Senha</button>
            <button v-if="buttonAlter" @click="eventEdit" class="btn btn-primary ">Alterar Dados</button>
        </div>
        <div class="modal-footer">
            <button @click="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button v-if="buttonBack" @click="eventBack" type="button" class="btn btn-danger">Voltar</button>
        </div>
        </div>
    </div>
    </div>
</template>
<script>
import FormAdminComponent from './FormAdminComponent.vue';
import FormPassword from './FormPasswordComponent.vue';

export default {
    name: 'ModalConfigAdmComponent',
    components: {
        FormAdminComponent,
        FormPassword,
    },
    props: {
        Admin: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            buttonSave: false,
            buttonBack: false,
            buttonAlter: true,
            buttonPassword: true,
            disabledButtons: true,
            formData: true,
            alert: {
                status: false,
                type: '',
                message: '',
            },
            formAdmin: {
                name: '',
                lastname: '',
                email: '',
            }

        }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges(value) {
        if(value == 'form') {
            this.$emit('save-changes');
        }
        if(value == 'password') {
            this.$emit('save-changes');
        }
        
      },
      eventBack() {
        if(this.formData == false) {
            this.buttonPassword = true;
            this.buttonAlter = true;
            this.formData = true;
            this.buttonBack = false;
        }else {
            this.disabledButtons = true;
            this.buttonAlter = true;
            this.buttonPassword = true;
            this.buttonBack = false;
        }
      },
      eventAlterPassword() {
        this.formData = false;
        this.buttonBack = true;
        this.buttonAlter = false;
        this.buttonPassword = false;

        this.formPassword = true;
        this.buttonSavePass = true;
      },
      eventEdit() {
        this.buttonAlter = false;
        this.buttonPassword = false;
        this.disabledButtons = false;

        this.buttonSave = true;
        this.buttonBack = true;
      },
      adminUpdate() {
        this.alert.status = true
        this.alert.type = 'alert-success'
        this.alert.message = 'Dados Atualizados!'
      },
    },
}
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
background-color: rgb(177, 177, 177) !important;
backdrop-filter: blur(15px); 
-webkit-backdrop-filter: blur(15px);
box-shadow: 4px 2px 3px rgba(0, 0, 0, 0.048);
}

.modal-header {
border-radius: 10px 10px 0 0;
    .btn-close {
        background-color: #fff !important;
    }
}

.modal-footer {
border-radius: 0 0 10px 10px;
}
</style>