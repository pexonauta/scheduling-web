<template>
    <div class="content mt-2">
        <button v-if="buttonBack.type" class="position-absolute top-5 end-0 btn btn-danger" @click="eventBack">Voltar</button>
        <button v-if="buttonCreate" id="btnCreate" class="position-absolute btn btn-success" @click="modalCreateShow">Criar</button>
        <ModalCreate v-if="modalCreate" @close-modal="modalCreate = false" @create-admin="createAdmin"/>
        <Search v-if="search" @validated-search="validatedSearch" :name="buttonBack.value" />
        

        <div class="container">
            <div class="row mt-2" v-if="cardShow">
                <div class="col">
                    <CardResouceComponent  @event-show="eventShow"  title="Administradores" 
                    subtitle="Todos os Administradores" :qtd="qtdAdmins" type="showAdmin"/>
                </div>
                <div class="col">
                    <CardResouceComponent  @event-show="eventShow"  title="Salas e Blocos" 
                    subtitle="Mostrar Todas as Salas e Blocos" type="showRoomAndBLock" qtd="-1" />
                </div>
            </div>
            <div class="row">
                <div class="col mt-5">
                    <div v-if="alert.status" :class="'text-center alert ' + alert.type">
                        {{ alert.message }}
                    </div>
                    <TableAdmins @emailAlert="alertEmail" @admin-edit="alertAdminEdit" @admin-no-see="alertNoAdmin" @admin-deleted="adminDeleted" v-if="viewResouces.tableAdmin" :adminSearch="adminSearch"/>
                    <TableRoomsAndBlock  v-if="viewResouces.tableRoomsAndBlock" :roomSearch="roomSearch"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Search from '@/components/adm/SearchComponent.vue'
import CardResouceComponent from '@/components/adm/CardResouceComponent.vue';
import TableAdmins from '@/components/adm/TableAdminsComponent.vue'
import ModalCreate from '@/components/adm/ModalCreateAdminComponent.vue'
import TableRoomsAndBlock from '@/components/adm/TableRoomsAndBlocksComponent.vue'
export default {
    name: 'ManagementPage',
    components: {
        CardResouceComponent,
        TableAdmins,
        Search,
        ModalCreate,
        TableRoomsAndBlock,
    },
    data() {
        return {
            search: false,
            cardShow: true,
            buttonCreate: false,
            modalCreate: false,
            adminSearch: {},
            roomSearch: {},
            qtdAdmins: 0,
            alert: {
                status: false,
                type: '',
                message: '',
            },
            buttonBack: {
                type: false,
                value: '',
            },
            viewResouces: {
                tableAdmin: false,
                tableRoomsAndBlock: false,
            },
        }
    },
    mounted() {
        this.alert.status = false
        const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
        this.qtdAdmins = Number(admins.length)
    },
    methods: {
        validatedSearch(value) {
            this.alert.status = false
            if(this.viewResouces.tableAdmin) {
                this.adminSearch = {search: value}
            }
            if(this.viewResouces.tableRoomsAndBlock) {
                this.roomSearch = {search: value}
            }
        },
        eventShow(value) {
            this.alert.status = false
            if(value == 'showAdmin') {
                this.cardShow = false
                this.search = true
                this.buttonCreate = true
                this.viewResouces.tableAdmin = true
                this.buttonBack.type = true
                this.buttonBack.value = value
            }
            if(value == 'showRoomAndBLock') {
                this.cardShow = false
                this.search = true
                this.viewResouces.tableRoomsAndBlock = true
                this.buttonBack.type = true
                this.buttonBack.value = value
            }
                
        },
        eventBack() {
            this.alert.status = false
            if(this.buttonBack.value == 'showAdmin') {
                this.cardShow = true
                this.search = false
                this.buttonCreate = false
                this.viewResouces.tableAdmin = false
                this.buttonBack.type = false
                this.buttonBack.value = ''
            }
            if(this.buttonBack.value == 'showRoomAndBLock') {
                this.cardShow = true
                this.search = false
                this.viewResouces.tableRoomsAndBlock = false
                this.buttonBack.type = false
                this.buttonBack.value = ''
            }
        },
        modalCreateShow() {
            this.alert.status = false
            this.modalCreate = true;
        },
        createAdmin() {
            this.modalCreate = false;
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Novo Administrador Criado!!'
            this.viewResouces.tableAdmin = false
            setTimeout(() => {
                this.viewResouces.tableAdmin = true
            }, 100)
        },
        adminDeleted() {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Administrador Deletado!!'
        },
        alertNoAdmin() {
            this.alert.status = true
            this.alert.type = 'alert-danger'
            this.alert.message = 'Administrador Não Encontrado!!'
        },
        alertAdminEdit() {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Dados Atualizados!!'
        },
        alertEmail() {
            this.alert.status = true
            this.alert.type = 'alert-danger'
            this.alert.message = 'E-mail já existente!!'
        },
        
    },
}
</script>

<style lang="scss" src="./style.scss" scoped/>