<template>
    <table class="table table-striped table-sm" v-if="validatedAdmin">
        <thead class="table-primary text-center">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Sobrenome</th>
                <th scope="col">Email</th>
                <th scope="col">Tipo</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody class="text-center" >
            <tr v-for="admin in admins" :key="admin.id">
                <td scope="row">{{ admin.id }}</td>
                <td>{{ admin.name }}</td>
                <td>{{ admin.lastname }}</td>
                <td>{{ admin.email }}</td>
                <td>{{ admin.type === 1  ? 'Padrão' : 'Superior' }}</td>
                <td>
                    <button @click="handleEdit(admin)" class="btn btn-primary me-2">Editar</button>
                    <button 
                    class="btn btn-danger"
                    @click="modalInput = true, 
                    think = admin.id" 
                    >
                    Excluir</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="!validatedAdmin" class="text-center w-100 alert alert-warning fs-2">
        Nenhum Adminstrador Registrado
    </div>
    <ModalEdit 
    v-if="modalEdit" 
    :item="adminEdit"
    @close-modal="modalEdit = false" 
    @email-existing="emailExisting" 
    @save-changes="editAdmin" 
    />
    <ModalInput 
    v-if="modalInput"
    title="Delete"
    text="Tem certeza que deseja executar está ação ?"
    button="Enviar"
    @save-change="handleDelete"
    @close-modal="modalInput = false"
    />
</template>
<script>
import ModalEdit from './ModalEditAdminComponent.vue'
import ModalInput from '../users/ModalInputComponent.vue'
export default {
    name: 'TableAdminsComponent',
    components: {
        ModalEdit,
        ModalInput,
    },
    props: {
        adminSearch: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            think: null,
            modalEdit: false,
            modalInput: false,
            validatedAdmin: false,
            admins: [
                {}
            ],
            adminEdit: {
                id: '',
                name: '',
                lastname: '',
                email: '',
                type: '',
            },
        }

    },
    watch: {
        adminSearch: {
            immediate: true, // Executa o manipulador imediatamente ao criar o componente
            handler(search) {
                if (Object.keys(search).length !== 0) {
                    this.search(search)
                }
                else {
                    this.search(search = {search: ''})
                }
                
            },
        },
    },
    mounted() {
        console.log(this.adminSearch)
        if(localStorage.getItem('Web-Agendamento-admins') != []) {
            const adminsRegisters = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
            if(adminsRegisters.length > 0) {
                this.validatedAdmin = true
                this.admins = adminsRegisters
            }

        }else {
            if(JSON.parse(localStorage.getItem('Web-Agendamento-auth')).admin) {
                const adminAuth = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user
                const admin = {
                    id: adminAuth.id,
                    name: adminAuth.name,
                    lastname: adminAuth.lastname,
                    email: adminAuth.email,
                    type: adminAuth.type,
                }
                localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admin))
            }else {
                this.$router.push('/')
            }
        }
    },
    methods: {
        handleEdit(data) {
            this.modalEdit = true
            this.adminEdit = data
        },
        handleDelete() {
            const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
            const adminIndex = admins.findIndex(admin => admin.id === this.think)
            if(adminIndex !== -1) {
                admins.splice(adminIndex, 1);
                this.admins = admins
                localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins))
                this.$emit('admin-deleted')
                if(JSON.parse(localStorage.getItem('Web-Agendamento-admins')).length == 0) {
                    this.validatedAdmin = false
                }
            }else {
                this.$emit('admin-no-see')
            }
            this.modalInput = false
            this.think = null
        },
        editAdmin() {
            this.modalEdit = false
            const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
            this.admins = admins
            this.$emit('admin-edit')
        },
        search(search) {
            const value = search.search
            if(search.search.length > 0 && value !== null) {
                const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'));
                const filteredAdmins = admins.filter(admin => {
                    // Converta o nome do administrador e o termo de pesquisa para minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
                    const adminName = admin.name.toLowerCase();
                    const searchLower = value.toLowerCase();

                    // Verificar se o nome do administrador inclui o termo de pesquisa
                    return adminName.includes(searchLower);
                });
                this.admins = filteredAdmins
            }else {
                const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'));
                this.admins = admins
            }
        },
        emailExisting() {
            this.$emit('emailAlert')
        }
    }
}
</script>