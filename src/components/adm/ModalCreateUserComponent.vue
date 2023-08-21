<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar Dados</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger text-center" v-if="this.messageShow">
            {{ this.messageError }}
          </div>
        <form>
          <div class="mb-3">
              <label for="name" class="form-label">Nome:</label>
              <input type="text" class="form-control" id="name" v-model="formData.name">
          </div>
          <div class="mb-3">
              <label for="lastname" class="form-label">Sobrenome:</label>
              <input type="text" class="form-control" id="lastname" v-model="formData.lastname">
          </div>
          <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input type="email" class="form-control" id="email" v-model="formData.email">
          </div>
          <div class="mb-3">
              <label for="password" class="form-label">Senha:</label>
              <input type="password" class="form-control" id="password" v-model="formData.password">
          </div>
          <div class="mb-3">
            <div class="form-check inline-block">
              <input class="form-check-input" type="radio" v-model="formData.type" value="enable" name="type" checked autocomplete="off">
              <label class="form-check-label" for="exampleRadios1">
                  Aceito
              </label>
            </div>
            <div class="form-check inline-block">
                <input class="form-check-input" type="radio" v-model="formData.type" value="prev" name="type" autocomplete="off">
                <label class="form-check-label" for="exampleRadios1">
                    Solicitação de entrada
                </label>
            </div>
            <div class="form-check inline-block">
                <input class="form-check-input" type="radio" v-model="formData.type" value="disable" name="type" autocomplete="off">
                <label class="form-check-label" for="exampleRadios1">
                    Desabilitado
                </label>
            </div>
        </div>
        </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="saveChanges">Salvar</button>
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
          password: '',
          type: 'enable',
        },

      };
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges() {
        if(this.formData.name.length == 0 || this.formData.lastname.length == 0 || this.formData.email.length == 0 || this.formData.password.length == 0 ) {
            this.messageShow = true
            this.messageError = 'Todos os itens são obrigatórios'
        }
        else {
          const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
          const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
          const userIndex = users.findIndex(user => user.email === this.formData.email)
          const adminIndex = admins.findIndex(admin => admin.email === this.formData.email)
          if(userIndex === -1 && adminIndex === -1) {
            users.length > 0 ? this.formData.id  = Number(users[users.length - 1].id) + 1 : this.formData.id = 1
            this.formData.type.toLocaleLowerCase() === 'enable' ? this.formData.type = 1 :
            this.formData.type.toLocaleLowerCase() === 'prev' ? this.formData.type = 0 : this.formData.type = -1
            users.push(this.formData)
            localStorage.setItem('Web-Agendamento-users', JSON.stringify(users))
            this.$emit('save-changes');
          }else {
            this.messageError = 'E-mail já cadastrado'
            this.messageShow = true
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