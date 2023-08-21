<template>
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Editar Sala</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
            <div v-if="alert.status" :class="'text-center alert ' + alert.type">
              {{ alert.message }}
            </div>
            <form>
                <div class="mb-3">
                    <label for="room" class="form-label">Sala:</label>
                    <input type="number" class="form-control" id="room" v-model="formData.room">
                </div>
                <div class="mb-3">
                  <label for="block" class="form-label">Bloco:</label>
                  <select class="form-select" v-model="formData.block" >
                      <option v-for="block in sortedBlocks" :key="block.id">{{ block.block.toUpperCase() }}</option>
                  </select>
                </div>
                <div class="mb-3">
                    <label for="capacity" class="form-label">Capacidade:</label>
                    <input type="number" class="form-control" id="capacity" v-model="formData.capacity">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Tipo:</label>
                    <div class="col-auto">
                      <select class="form-select" v-model="formData.type">
                          <option value="1" :selected="formData.type == 1">Aula</option>
                          <option value="2" :selected="formData.type == 2">Festa</option>
                      </select>
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
    props: {
      item: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        alert: {
          status: false,
          type: '',
          message: '',
        },
        formData: {
            id: '',
            room: '',
            block: '',
            capacity: '',
            type: '',
            
        },
        blocks: [],
      };
    },
    watch: {
        item: {
        handler(Item) {
            // Atualiza os dados 
            this.formData.id = Item.id;
            this.formData.room = Item.room;
            this.formData.capacity = Item.capacity;
            this.formData.type = Item.type;
            this.formData.block = Item.block;
            
        },
        immediate: true, 
        },
    },
    computed: {
        sortedBlocks() {
          return [...this.blocks].sort((a, b) => a.block.localeCompare(b.block));
        }
    },
    mounted() {
      this.blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges() {
        this.alertMessage('','')
        this.alert.status = false
       if(this.formData.room > 0 && !isNaN(this.formData.room) &&this.formData.block.length > 0 
        && isNaN(this.formData.block) && this.formData.capacity > 0 
        && this.formData.type.length > 0) {
          const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
          const roomIndex = rooms.findIndex(room => room.id === this.formData.id)
          console.log(roomIndex)
          if(roomIndex !== -1) {
            rooms[roomIndex] = { ...this.formData };
            localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(rooms));
            this.$emit('save-changes');
          }
          else {
            this.alertMessage('warning', 'Sala já Existente')
          }
       }else {
        this.alertMessage('danger', 'Todos os itens são obrigátorios')
       }

      },
      alertMessage(type,value) {
        this.alert.status = true
        this.alert.type = 'alert-'+type
        this.alert.message = value
      }
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