<template>
    <div class="modal">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">Informações da Sala</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
            <form>
                <div class="mb-3 text-start">
                  <label for="room" class="form-label">Bloco e Número da Sala:</label>
                  <input type="text" class="form-control" id="room" v-model="formData.room" disabled>
                </div>
                <div class="mb-3 text-start">
                  <label for="capacity" class="form-label">Capacidade da Sala:</label>
                  <input type="text" class="form-control" id="capacity" v-model="formData.capacity" disabled>
                </div>
                <div class="mb-3 text-start">
                <label for="type" class="form-label">Tipo da Sala:</label>
                <input type="text" class="form-control" id="type" v-model="formData.type" disabled>
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
      room: {
        type: Number,
        required: true,
      },
      scheduling: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        formData: {
            room: '',
            capacity: '',
            type: '',
        },
      };
    },
    unmounted() {
        this.$emit('close-modal', 'room', this.scheduling);
    },
    mounted() {
      console.log(this.scheduling)
      const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
      const room = rooms.find(room => room.id === this.room)
      this.formData.room = room.block.toUpperCase() + room.room
      this.formData.capacity = room.capacity
      this.formData.type = room.type == 1 ? 'Aula' : room.type == 2 ? 'Evento' : 
        room.type == 3 ? 'Festa' : 'Curso ExtraCurricular'
    },
    methods: {
      closeModal() {
        this.$emit('close-modal','room', this.scheduling);
      },
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