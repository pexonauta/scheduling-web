<template>
    <form>
    <div class="mb-3 text-start">
        <label for="name" class="form-label">Nome:</label>
        <input type="text" class="form-control" id="name"  v-model="formAdmin.name" :disabled="buttonsD">
    </div>
    <div class="mb-3 text-start">
        <label for="lastname" class="form-label">Sobrenome:</label>
        <input type="text" class="form-control" id="lastname" v-model="formAdmin.lastname" :disabled="buttonsD">
    </div>
    <div class="mb-3 text-start">
        <label for="email" class="form-label">E-mail</label>
        <input type="email" class="form-control" id="email" v-model="formAdmin.email" :disabled="buttonsD">
    </div>
        <button v-if="!buttonsD" @click="saveChanges('admin')" type="submit" class="btn btn-primary">Salvar</button>
    </form>
</template>
<script>
export default {
    name: 'FormAdminComponent',
    props: {
        Admin: {
            type: Object,
            required: true,
        },
        buttonsD: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {

            formAdmin: {
                name: '',
                lastname: '',
                email: '',
            }

        }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      saveChanges(value) {
        if(value == 'form') {
            this.$emit('save-changes');
        }
        if(value == 'password') {
            this.$emit('save-changes');
        }
        
      },
    },
}
</script>