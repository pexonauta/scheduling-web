<template>
    <form>
        <div class="mb-3 text-start">
            <label for="password" class="form-label">Senha:</label>
            <input type="password" class="form-control" id="password" v-model="formPassword.password">
        </div>
        <div class="mb-3 text-start">
            <label for="confirmPassword" class="form-label">Confirmar Senha:</label>
            <input type="password" class="form-control" id="confirmPassword" v-model="formPassword.confirmPassword">
        </div>
        <button @click="saveChanges" type="submit" class="btn btn-primary">Salvar</button>
    </form>
</template>
<script>
export default {
    name: 'FormPasswordComponent',
    data() {
        return {
            formPassword: {
                passoword: '',
                confirmPassword: '',
            }

        }
    },
    methods: {
      saveChanges() {
        this.$emit('save-changes');
        
      },
    },
}
</script>