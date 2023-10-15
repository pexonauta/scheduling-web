<template>
    <div class="content">
        <div class="search mt-3 w-75">
            <form action="#" class="d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="button">Search</button>
            </form>
        </div>
        <div v-if="alert.status" :class="'text-center alert ' + alert.type">
            {{ alert.message }}
        </div>
        <div class="container mt-5">
            <table v-if="users.length > 0" class="table table-striped table-sm">
                <thead class="table-primary text-center">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="user in users" :key="user.id" :id="'key'+ user.id">
                        <td scope="row">{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.lastname }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <button 
                            id="accept" 
                            class="btn btn-success me-2" 
                            @click="modalInput.status = true 
                            ,modalInput.handle = handleAccept,
                            userUp.id = user.id,type = 'aceitar'" >Aceitar</button>
                            <button 
                            id="deny" 
                            class="btn btn-warning" 
                            @click="modalInput.status = true,
                            modalInput.handle = handleDeny,
                            userUp.id = user.id, type = 'negar'" >Negar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table v-else class="table table-striped table-sm">
                <thead class="table-primary text-center">
                    <div class="bg-warning p-3 fs-3">
                        Nenhuma solicitação encontrada
                    </div>
                </thead>
            </table>
            <ModalInput
            v-if="modalInput.status"
            title="Solicitação"
            :text="'Tem certeza que deseja '+ type +' solicitação ?'"
            :button="type"
            @save-change="modalInput.handle(userUp.id)"
            @close-modal="modalInput.status = false"
            />
        </div>
    </div>
</template>
<script>
import ModalInput from '@/components/users/ModalInputComponent.vue'
export default {
    name: 'RequestsPage',
    components: {
        ModalInput,
    },
    data() {
        return {
            type: '',
            modalInput: {
                status:false,
                handle: null,
            },
            alert: {
                status: false,
                type: '',
                message: '',
            },
            users: [],
            userUp: {
                id: '',
                name: '',
                lastname: '',
                email: '',
                password: '',
                type: '',
            }
        }
    },
    mounted() {
        if(JSON.parse(localStorage.getItem('Web-Agendamento-users'))) {
            this.alert.status = false
            this.alert.type = ''
            this.alert.message = ''
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            const filteredUsers = users.filter(user => user.type === 0);
            this.users = filteredUsers;
        }else {
            const users = []
            localStorage.setItem('Web-Agendamento-users', JSON.stringify(users))
        }
    },
    methods: {
        handleAccept(data) {
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
            const userIndex = users.findIndex(user => user.id === data);
            if (userIndex >= 0) {
                this.userUp = users[userIndex]
                this.userUp.type = 1
                users[userIndex] = { ...this.userUp };
                localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
                this.alert.status = true
                this.alert.type = 'alert-success'
                this.alert.message = 'Usuário Aceito'
                const useras = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
                this.users = useras.filter(user => user.type === 0);
            }
            this.modalInput.status = false
            this.modalInput.handle = ''
        },
        handleDeny(data) {
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
            const userIndex = users.findIndex(user => user.id === data);
            if (userIndex >= 0) {
                this.userUp = users[userIndex]
                this.userUp.type = -1
                users[userIndex] = { ...this.userUp };
                localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
                this.alert.status = true
                this.alert.type = 'alert-success'
                this.alert.message = 'Usuário negado'
                const useras = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
                this.users = useras.filter(user => user.type === 0);
            }
            this.modalInput.status = false
            this.modalInput.handle = ''
        },
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />