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
        },
        immediate: true, 
        },
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges() {
        // Aqui você pode enviar os dados editados para o componente pai
        this.$emit('save-changes', this.formData);
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