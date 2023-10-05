<template>
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Dados do Solicitante</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
            <form>
                <div class="mb-3 text-start">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" disabled>
                </div>
                <div class="mb-3 text-start">
                <label for="lastname" class="form-label">Sobrenome:</label>
                <input type="text" class="form-control" id="lastname" v-model="formData.lastname" disabled>
                </div>
                <div class="mb-3 text-start">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" v-model="formData.email" disabled>
                </div>
            </form>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            </div>
        </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    props: {
      requester: {
        type: Number,
        required: true,
      },
      scheduling: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        formData: {
            name: '',
            lastname: '',
            email: '',
        },
      };
    },
    unmounted() {
        this.$emit('close-modal', 'request', this.scheduling);
    },
    mounted() {
      const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
      const user = users.find(user => user.id === this.requester)
      this.formData.name = user.name
      this.formData.lastname = user.lastname
      this.formData.email = user.email
    },
    methods: {
      closeModal() {
        this.$emit('close-modal','request', this.scheduling);
      }
    },
  };
</script>
  
<style lang="scss" scoped>
.modal {
    display: block !important;
    background-color: rgba(0, 0, 0, 0.6); 
    z-index: 999;

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