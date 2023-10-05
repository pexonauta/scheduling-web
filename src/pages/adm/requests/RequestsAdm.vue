<template>
    <div class="content">
        <div class="search mt-3 w-75">
            <form action="#" class="d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
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
                            <button id="accept" @click="event('accept', user)" class="btn btn-success me-2" >Aceitar</button>
                            <button id="deny" @click="event('deny', user)" class="btn btn-warning" >Negar</button>
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'RequestsPage',
    components: {
    },
    data() {
        return {
            alert: {
                status: false,
                type: '',
                message: '',
            },
            users: [],
            user: {
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
        event(value,data) {
            if(value === 'accept') {
                if(confirm('Certeza ?')) {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
                    const userIndex = users.findIndex(user => user.id === data.id && user.email === data.email);
                    if (userIndex >= 0) {
                        this.user = users[userIndex]
                        this.user.type = 1
                        users[userIndex] = { ...this.user };
                        localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
                        this.alert.status = true
                        this.alert.type = 'alert-success'
                        this.alert.message = 'Usuário Aceito'
                        const useras = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
                        this.users = useras.filter(user => user.type === 0);
                    }
                }
            }
            if(value === 'deny') {
                if(confirm('Tem certeza disso ?')) {
                    const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
                    const userIndex = users.findIndex(user => user.id === data.id && user.email === data.email);
                    if (userIndex >= 0) {
                        this.user = users[userIndex]
                        this.user.type = -1
                        users[userIndex] = { ...this.user };
                        localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
                        this.alert.status = true
                        this.alert.type = 'alert-success'
                        this.alert.message = 'Usuário negado'
                        const useras = JSON.parse(localStorage.getItem('Web-Agendamento-users'));
                        this.users = useras.filter(user => user.type === 0);
                    }
                   
                    
                }
            }
        }
    }
}
</script>

<style src="./style.scss" lang="scss" scoped />