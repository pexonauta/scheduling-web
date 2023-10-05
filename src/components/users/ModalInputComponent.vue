<template>
    <div class="modal fade show" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
              <button type="button" class="btn-close" @click="this.$emit('close-Modal')"></button>
            </div>
            <div class="modal-body">
              <p>{{ text }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" 
                @click="this.$emit('close-Modal')">Fechar
            </button>
              <button type="button" class="btn btn-primary" 
                @click="this.$emit('save-change')">{{ button }}
            </button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
    props: {
        title: String,
        text: String,
        button: String,
    }
}
</script>
<style scoped>
.modal {
    display: block !important;
    background-color: #00000079 !important;
}
</style>