<template>
    <div class="content">
        <div class="search" v-if="scheduling">
            <form action="#" class="d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" 
                placeholder="Pesquise a Sala" aria-label="Search">
                <input class="form-control w-25 me-4" type="date" 
                aria-label="Data" v-model="date" :min="minDate">
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
            </form>
        </div>
        <div class="container">
            <div v-if="alert.status" :class="'text-center alert ' + alert.type">
                {{ alert.message }}
            </div>
            <div class="row nothing" v-if="schedulings.length <= 0">
                <div class="col">
                    <p>Nenhum Agendamento Encontrado, para agendar basta clicar aqui
                        <router-link to="/user/rooms">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </router-link>
                    </p>
                </div>
            </div>
            <div class="row" v-if="schedulings.length > 0">
                <div class="col" v-for="scheduling in schedulings" :key="scheduling.id">
                    <CardScheduling
                    :id="scheduling.id" 
                    @scheduling-success="successScheduling"/>
                </div>
            </div>
            <div class="pagination" v-if="scheduling">
               <PaginationComponent />
            </div>
        </div>
    </div>
</template>
<script>
import CardScheduling from '@/components/users/CardSchedulingComponent.vue'
import PaginationComponent from '@/components/users/PaginationComponent.vue'
export default {
    name: 'SchedulingPage',
    data() {
        return {
            scheduling: false,
            date: '',
            minDate: '',
            alert: {
                status: false,
                type: '',
                message: '',
            },
            schedulings: [],
            adiditions: [
                'Ar Condicionado',
                'Projetor',
                'Quadro'
            ]
        }
    },
    components: {
        PaginationComponent,
        CardScheduling
    },
    mounted() {
        if(JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))) {
           
            const user = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user
            const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
            const schedulingsFilter = schedulings.filter(scheduling =>
            scheduling.user === user.id)
            this.schedulings = schedulingsFilter 
            this.scheduling = schedulingsFilter.length > 0 ? true : false
        }
        if(this.date == '') {
            const today = new Date()
            const year = today.getFullYear();
            const month = (today.getMonth() + 1).toString().padStart(2, '0');
            const day = today.getDate().toString().padStart(2, '0');
            const todayFormatted = today.toISOString().slice(0, 10);
            console.log(todayFormatted)
            this.minDate = todayFormatted
            this.date = `${year}-${month}-${day}`;
        }
    },
    methods: {
        validatedSearch(event) {
            event.preventDefault()
        },
        successScheduling() {
            const user = JSON.parse(localStorage.getItem('Web-Agendamento-auth')).user
            const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
            const schedulingsFilter = schedulings.filter(scheduling =>
            scheduling.user === user.id)
            this.schedulings = schedulingsFilter 
            this.scheduling = schedulingsFilter.length > 0 ? true : false

            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Agendamento excluido com sucesso'
            setTimeout(() => {
                this.alert.status = false
                this.alert.type = ''
                this.alert.message = ''
            }, 5000)
        }   
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
