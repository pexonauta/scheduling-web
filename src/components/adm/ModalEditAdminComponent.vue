<template>
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Editar Dados</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
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
                  <div class="form-check inline-block">
                      <input class="form-check-input" type="radio" v-model="formData.type" value="Default" name="type" :checked="formData.type === 'default'" >
                      <label class="form-check-label" for="exampleRadios1">
                          Padrão
                      </label>
                  </div>
                  <div class="form-check inline-block">
                      <input class="form-check-input" type="radio" v-model="formData.type" value="elevator" name="type" :checked="formData.type === 'elevator'">
                      <label class="form-check-label" for="exampleRadios1">
                          Superior
                      </label>
                  </div>
              </div>
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="saveChanges">Atualizar</button>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
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
            this.formData.type = Item.type === 1 ? this.formData.type = 'default' :
            Item.type === 2 ? this.formData.type = 'elevator': ''
        },
        immediate: true, 
        },
    },
    mounted() {

    },  
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges() {
        const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'));
        const adminIndex = admins.findIndex(admin => admin.email === this.formData.email);
        const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
        const userIndex = users.findIndex(user => user.email === this.formData.email);

        if (adminIndex === -1 || adminIndex === 0 && userIndex === -1) {
          const type = this.formData.type.toLocaleLowerCase() == 'default' ? 1 :
          this.formData.type.toLocaleLowerCase() == 'elevator' ? 2 : ''
          this.formData.type = type
          admins[adminIndex] = { ...this.formData };
          localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins));
          this.$emit('save-changes');
        } else {
          this.$emit('email-existing')
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