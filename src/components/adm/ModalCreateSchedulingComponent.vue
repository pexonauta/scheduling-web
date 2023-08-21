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
                <div class="mb-3">
                    <label for="block" class="form-label">Bloco:</label>
                    <input type="text" class="form-control" id="block" v-model="formData.block">
                </div>
                <div class="mb-3">
                    <label for="room" class="form-label">Sala:</label>
                    <input type="text" class="form-control" id="room" v-model="formData.room">
                </div>
                <div class="mb-3">
                    <label for="user" class="form-label">Usuário:</label>
                    <input type="text" class="form-control" id="user" v-model="formData.user">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Tipo de evento:</label>
                    <select class="form-select" v-model="formData.type">
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
            block: '',
            room: '',
            user: '',
            type: '',
        },
      };
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges() {
        if(this.formData.block.length == 0 || this.formData.room.length == 0 || this.formData.user.length == 0 || this.formData.type.length == 0 ) {
            this.messageShow = true
            this.messageError = 'Todos os itens são obrigatórios'
        }
        else {
            this.$emit('save-changes', this.formData);
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