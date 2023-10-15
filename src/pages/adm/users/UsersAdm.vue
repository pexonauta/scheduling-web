<template>
    <div class="content">
        <div class="search d-flex mt-3">
            <form action="#" class="w-100 d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" v-model="searchs.search" placeholder="Pesquise a Sala" aria-label="Search">
                <select class="w-50 me-4 form-select" v-model="searchs.type">
                    <option value="all" selected>Todos</option>
                    <option value="1">Desabilitados</option>
                    <option value="2">Aceitos</option>
                </select>
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
            </form>
            <button @click="modalUser" class="w-auto btn btn-success me-2" type="submit">Criar</button>
            <ModalCreateUser v-if="modalCreate" @close-modal="closeModalCreate" @save-changes="createUser"/>

        </div>
        <div v-if="alert.status" :class="'mt-2 text-center alert ' + alert.type">
            {{ alert.message }}
        </div>
        <div class="container mt-5">
            <table v-if="users.length > 0 && users !== 'vazio' " class="table table-striped table-sm">
                <thead class="table-primary text-center">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody class="table-secondary text-center">
                    <tr v-for="user in users" :key="user.id" :id="'key'+ user.id">
                        <td scope="row">{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.lastname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.type }}</td>
                        <td>
                            <button @click="handleEdit(user)" class="btn btn-primary me-2" >Editar</button>
                            <button @click="modalInput.status = true, modalInput.think = user.id" 
                            class="btn btn-danger" >Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-else class="table table-striped table-sm">
                <thead class="table-primary text-center">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
            </table>
            <ModalEdit 
            v-if="this.modalEdit" 
            :item="user"  
            @close-modal="modalEdit = false" 
            @save-changes="saveNewData" 
            @disable-on="disableUser" 
            @enable-on="enableUser"/>
            <ModalInput
            v-if="modalInput.status" 
            title="Deletar"
            text="Tem certezam que deseja excluir este usuário ?"
            button="Enviar"
            @save-change="handleDelete"
            @close-modal="modalInput.status = false"
            />
        </div>
    </div>
    <div v-if="users.length === 0" class="content">
        <div class="container mt-5">
            <div class="text-center w-100 alert alert-warning fs-2">
                Nenhum Usuário Registrado
            </div>
        </div>
    </div>
</template>
<script>
import ModalEdit from '@/components/adm/ModalEdit.vue'
import ModalCreateUser from '@/components/adm/ModalCreateUserComponent.vue'
import ModalInput from '@/components/users/ModalInputComponent.vue'
export default {
    name: 'RequestsPage',
    components: {
        ModalEdit,
        ModalCreateUser,
        ModalInput,
    },
    data() {
        return {
            modalCreate: false,
            modalEdit: false,
            modalInput: {
                status: false,
                think: null,
            },
            searchs: {
                search: '',
                type: 'all',
            },
            alert: {
                status: false,
                type: '',
                message: '',
            },
            user: {},
            users: [
            ],
        }
    },
    mounted() {
        if(JSON.parse(localStorage.getItem('Web-Agendamento-users'))) {
            this.alert.status = false
            this.alert.type = ''
            this.alert.message = ''
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === -1 || user.type === 1);
            this.users = filteredUsers;
        }else {
            const users = []
            localStorage.setItem('Web-Agendamento-users', JSON.stringify(users))
        }
        
    },      
    methods: {
        validatedSearch(event) {
            event.preventDefault()
            this.alert.status = false
            this.alert.type = ''
            this.alert.message = ''
            const search = this.searchs.search
            const type = this.searchs.type
            if(search.length > 0) {
                if(type === '1') {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const filteredUsers = users.filter(user => user.type === -1);
                    const searchUsers = filteredUsers.filter(user => {
                        // Converta o nome do administrador e o termo de pesquisa para minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
                        const userName = user.name.toLowerCase();
                        const searchs = search.toLowerCase();

                        // Verificar se o nome do administrador inclui o termo de pesquisa
                        return userName.includes(searchs);
                    });
                    if(searchUsers.length === 0) {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Nenhum usuario encontrado'
                        this.users = 'vazio'
                    }else {
                       this.users = searchUsers 
                    }
                }
                else if(type === '2') {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const filteredUsers = users.filter(user => user.type === 1);
                    const searchUsers = filteredUsers.filter(user => {
                        // Converta o nome do administrador e o termo de pesquisa para minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
                        const userName = user.name.toLowerCase();
                        const searchs = search.toLowerCase();

                        // Verificar se o nome do administrador inclui o termo de pesquisa
                        return userName.includes(searchs);
                    });
                    if(searchUsers.length === 0) {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Nenhum usuario encontrado'
                        this.users = 'vazio'
                    }else {
                       this.users = searchUsers 
                    }
                }
                else {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const filteredUsers = users.filter(user => user.type === -1 || user.type === 1);
                    const searchUsers = filteredUsers.filter(user => {
                        // Converta o nome do administrador e o termo de pesquisa para minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
                        const userName = user.name.toLowerCase();
                        const searchs = search.toLowerCase();

                        // Verificar se o nome do administrador inclui o termo de pesquisa
                        return userName.includes(searchs);
                    });
                    if(searchUsers.length === 0) {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Nenhum usuario encontrado'
                        this.users = 'vazio'
                    }else {
                       this.users = searchUsers 
                    }
                    

                }
            }else {
                if(type === '1') {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const filteredUsers = users.filter(user => user.type === -1);
                    if(filteredUsers.length > 0) {
                        this.users = filteredUsers;
                    }else {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Nenhum usuario encontrado'
                        this.users = 'vazio'
                    }
                    
                }
                else if(type === '2') {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const filteredUsers = users.filter(user => user.type === 1);
                    this.users = filteredUsers;
                }
                else {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const filteredUsers = users.filter(user => user.type === -1 || user.type === 1);
                    this.users = filteredUsers;
                }
            }
        },
        modalUser() {
            this.modalCreate = true
        },
        closeModalCreate() {
            this.modalCreate = false
        },
        handleEdit(data) {
            this.modalEdit = true
            this.user = data
        },
        handleDelete() {
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const user = users.find(user => user.id === this.modalInput.think)
            if(user) {
                users.splice(user, 1)[0];
                this.users = users
                localStorage.setItem('Web-Agendamento-users', JSON.stringify(users))
                this.userDeleted()
                if(JSON.parse(localStorage.getItem('Web-Agendamento-users')).length == 0) {
                    location.reload()
                }
            }else {
                this.userNoSee()
            }
        },
        saveNewData() {
            this.modalEdit = false
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Dados Atualizados'
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === -1 || user.type === 1);
            this.users = filteredUsers;
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000);
        },
        createUser() {
            this.modalCreate = false  
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Usuário Criado com sucesso'
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === -1 || user.type === 1);
            this.users = filteredUsers;
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000);
        },
        disableUser() {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Usuário Desabilitado'
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === 1 || user.type === -1);
            this.users = filteredUsers;
            this.modalEdit = false
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000);
        },  
        enableUser() {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Usuário Ativado, consegue entrar novamente.'
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === 1 || user.type === -1);
            this.users = filteredUsers;
            this.modalEdit = false
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000);
        },  
        userDeleted() {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Usuário Deletado'
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === -1 || user.type === 1);
            this.users = filteredUsers;
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000);
        },  
        userNoSee() {
            this.alert.status = true
            this.alert.type = 'alert-warning'
            this.alert.message = 'Usuário não encontrado !!'
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000);
        },
            
            
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />