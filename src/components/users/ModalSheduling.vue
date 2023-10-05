<template>
    <div class="modal fade show" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cancelamento</h5>
              <button type="button" class="btn-close" @click="this.$emit('close-Modal')"></button>
            </div>
            <div class="modal-body">
              <p>Tem Certeza que deseja cancelar o agendamento ?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="this.$emit('close-Modal')">Fechar</button>
              <button type="button" class="btn btn-primary" @click="this.$emit('cancel-scheduling')">Enviar</button>
            </div>
          </div>
        </div>
      </div>
</template>
<style scoped>
.modal {
    display: block !important;
    background-color: #00000079 !important;
}
</style>