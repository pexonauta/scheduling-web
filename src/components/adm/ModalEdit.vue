<template>
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Editar Dados do Usuário</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div v-if="alert.status" :class="'alert ' + alert.type">
                {{ alert.message }}
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
                
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button 
            v-if="formData.type !== -1" 
            type="button" class="btn btn-danger" 
            @click="modalInput.status = true, 
            modalInput.handle = disableUser,
            modalInput.title = 'Desabilitar'">
            Desabilitar</button>

            <button 
            v-if="formData.type === -1" 
            type="button" class="btn btn-success" 
            @click="modalInput.status = true, 
            modalInput.handle = enableUser,
            modalInput.title = 'Ativar'">Ativar</button>
            <button type="button" class="btn btn-primary" @click="saveChanges">Salvar</button>
            </div>
        </div>
        <ModalInput
          v-if="modalInput.status"  
          :title="modalInput.title"
          text="Tem certeza que deseja fazer isso ?"
          button="Enviar"
          @save-change="modalInput.handle"
          @close-modal="modalInput.status = false"
        />
        </div>
    </div>
</template>
  
<script>
import ModalInput from '../users/ModalInputComponent.vue';
export default {
  components: {
    ModalInput
  },
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      modalInput: {
        status: false,
        handle: null,
        title: '',
      },
      alert: {
          status: false,
          type: '',
          message: '',
      },
      formData: {
          id: '',
          name: '',
          lastname: '',
          email: '',
          type: '',
      },
    };
  },
  watch: {
      item: {
      handler(Item) {
          // Atualiza os dados 
          this.formData.id = Item.id;
          this.formData.name = Item.name;
          this.formData.lastname = Item.lastname;
          this.formData.email = Item.email;
          this.formData.type = Item.type;
      },
      immediate: true, 
      },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    saveChanges() {
      const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
      const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
      const userIndex = users.findIndex(user => user.email.toLowerCase() === this.formData.email.toLowerCase())
      const adminIndex = admins.findIndex(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase())
      if(userIndex === -1 && adminIndex === -1) {
        const type = this.formData.type.toLocaleLowerCase() == 'default' ? 1 :
        this.formData.type.toLocaleLowerCase() == 'elevator' ? 2 : ''
        this.formData.type = type
        users[userIndex] = { ...this.formData };
        localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
        this.$emit('save-changes');
      } else {
        this.alert.status = true
        this.alert.type = 'alert-warning'
        this.alert.message = 'E-mail já existente'
      }
    },
    disableUser() {
      const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
      const userIndex = users.findIndex(user => user.email.toLowerCase() === this.formData.email.toLowerCase() && user.id === this.formData.id);
      if (userIndex !== -1) {
        this.formData.type = -1
        users[userIndex] = { ...this.formData };
        localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
        this.$emit('disable-on');
      } else {
        this.alert.status = true
        this.alert.type = 'alert-danger'
        this.alert.message = 'Usuário não encontrado'
      }
      this.modalInput.status = false
      this.modalInput.handle = null
    },
    enableUser() {
      const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
      const userIndex = users.findIndex(user => user.email.toLowerCase() === this.formData.email.toLowerCase() && user.id === this.formData.id);
      if (userIndex !== -1) {
        this.formData.type = 1
        users[userIndex] = { ...this.formData };
        localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
        this.$emit('enable-on');
      } else {
        this.alert.status = true
        this.alert.type = 'alert-danger'
        this.alert.message = 'Usuário não encontrado'
      }
      this.modalInput.status = false
      this.modalInput.handle = null
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