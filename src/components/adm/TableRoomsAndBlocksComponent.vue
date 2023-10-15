<template>
    <div v-if="messages.value" :class="'text-center alert alert-'+ messages.type">
        {{ messages.message }}
    </div>
    <form class="row g-3">
        <div class="col-auto">
            <input type="number" class="form-control" id="room" name="room" placeholder="Sala" v-model="formRoom.room">
        </div>
        <div class="col-auto">
            <input type="number" class="form-control" id="capacity" name="capacity" placeholder="Capacidade" v-model="formRoom.capacity">
        </div>
        <div class="col-auto">
            <select class="form-select" v-model="formRoom.type">
                <option selected>Tipos</option>
                <option value="1">Aula</option>
                <option value="2">Festa</option>
            </select>
        </div>
        <div class="col-auto">
            <select class="form-select" v-model="formRoom.block" >
                <option selected>Blocos</option>
                <option v-for="block in sortedBlocks" :key="block.id" :value="block.id">{{ block.block.toUpperCase() }}</option>
            </select>
        </div>
        <div class="col-auto">
            <button @click="createRoom" type="submit" class="btn btn-primary mb-3">Criar Sala</button>
        </div>
    </form>
    <form class="row g-3">
        <div class="col-auto">
            <input type="text" class="form-control" id="block" name="block" placeholder="Bloco" v-model="formBlock.block">
        </div>
        <div class="col-auto">
            <button @click="createBlock" type="submit" class="btn btn-primary mb-3">Criar Bloco</button>
        </div>
        <div v-if="blocks.length > 0 && !tableBlocks" class="col-auto">
            <button @click="showBlocks('show')" type="button" class="btn btn-success mb-3">Mostrar Blocos</button>
        </div>
        <div v-if="blocks.length > 0 && tableBlocks" class="col-auto">
            <button @click="showBlocks('hidden')" type="button" class="btn btn-danger mb-3">Esconder</button>
        </div>
    </form>
    <table v-if="tableBlocks && blocks.length > 0" class="table table-striped table-sm">
        <thead class="table-primary text-center">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Bloco</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <tr v-for="block in blocks" :key="block.id">
                <td scope="row">{{ block.id }}</td>
                <td> {{ block.block }} </td>
                <td>
                    <button 
                    class="btn btn-danger"
                    @click="modalInput.status = true, 
                    modalInput.handle = handleDeleteBlock,
                    modalInput.think = block.id" 
                    >Excluir</button>
                </td>
            </tr>
        </tbody>
    </table>
    <table v-if="rooms.length > 0" class="table table-striped table-sm">
        <thead class="table-primary text-center">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Sala</th>
                <th scope="col">Bloco</th>
                <th scope="col">Capacidade</th>
                <th scope="col">Tipo</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <tr v-for="room in rooms" :key="room.id">
                <td scope="row"> {{ room.id }} </td>
                <td>{{ room.room }}</td>
                <td>{{ findBlock(room.block) }}</td>
                <td>{{ room.capacity }}</td>
                <td>{{ room.type == 1 ? 'Aula' : room.type == 2 ? 'Festa' : ''}}</td>
                <td>
                    <button 
                    class="btn btn-primary me-2"
                    @click="handleEdit(room)"
                    >Editar</button>
                    <button 
                    class="btn btn-danger"
                    @click="modalInput.status = true, 
                    modalInput.handle = handleDeleteRoom,
                    modalInput.think = room.id" 
                    >Excluir</button>
                </td>
            </tr>
        </tbody>
    </table>
    <table v-else class="table table-striped table-sm">
        <div class="text-center w-100 alert alert-warning fs-2">
            Nenhuma sala registrada
        </div>
    </table>
    <ModalEdit 
    v-if="modalEdit" 
    :item="roomEdit"
    @save-changes="edit" 
    @close-modal="modalEdit = false" 
    />
    <ModalInput
    v-if="modalInput.status" 
    title="Deletar"
    text="Tem certeza que deseja executar está ação ?"
    button="Enviar"
    @save-change="modalInput.handle"
    @close-modal="modalInput.status = false"
    />
</template>
<script>
import ModalEdit from './ModalEditRoomComponent.vue'
import ModalInput from '../users/ModalInputComponent.vue'
export default {
    name: 'TableAdminsComponent',
    components: {
        ModalEdit,
        ModalInput,
    },
    props: {
        roomSearch: {
            type: Object,
            required: false,
        }
    },
    data() {
        return {
            tableBlocks: false,
            modalEdit: false,
            modalInput: {
                status: false,
                handle: null,
                think: null,
            },
            messages: {
                value: false,
                type: '',
                message: '',
            },
            formRoom: {
                room: '',
                block: 'Blocos',
                capacity: '',
                type: 'Tipos',
            },
            formBlock: {
                block: '',
            },
            roomEdit: {},
            rooms: [],
            blocks: [],
        }

    },
    mounted() {
        if(localStorage.getItem('Web-Agendamento-blocks')) {
            this.blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))
        }
        else {
            const block = []
            localStorage.setItem('Web-Agendamento-blocks', JSON.stringify(block))
        }
        if(localStorage.getItem('Web-Agendamento-rooms')) {
            this.rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
        }
        else {
            const room = []
            localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(room))
        }
    },
    computed: {
        sortedBlocks() {
            return [...this.blocks].sort((a, b) => a.block.localeCompare(b.block));
        }
    },
    watch: {
        roomSearch: {
            immediate: true, // Executa o manipulador imediatamente ao criar o componente
            handler(search) {
                if (isNaN(Object.keys(search))) {
                    this.search(search)
                    console.log(search)
                }
                else {
                    this.search(search = {search: ''})
                }
                
            },
        },
    },
    methods: {
        search(search) {
            const value = search.search;

            // Verifique se o valor da pesquisa é um número
            if (!isNaN(value) && value !== null) {
                const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'));
                const filteredRooms = rooms.filter(room => {
                    // Converta o nome do quarto em uma string
                    const roomName = room.room.toString();
                    const searchLower = value.toString();

                    // Verificar se o nome do quarto inclui o valor da pesquisa
                    return roomName.includes(searchLower);
                });
            this.rooms = filteredRooms;
            }
            else {
                const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'));
                this.rooms = rooms
            }
        },
        handleEdit(value) {
            this.modalEdit = true
            this.roomEdit = value
        },
        handleDeleteRoom() {
            const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
            const roomIndex = rooms.findIndex(room => room.id === this.modalInput.think)
            if(roomIndex !== -1) {
                rooms.splice(roomIndex, 1);
                this.rooms = rooms
                this.handleDeleteAllScheduling(this.modalInput.think)
                localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(rooms))
                this.message('success', 'Sala excluído com sucesso')
            }else {
                this.message('danger', 'Ocorreu um erro, Tente Novamente')
            }
            this.modalInput.status = false
            this.modalInput.handle = null
            this.modalInput.think = null  
        },
        handleDeleteBlock() {
            const blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))
            const blockIndex = blocks.findIndex(block => block.id === this.modalInput.think)
            if(blockIndex !== -1) {
                blocks.splice(blockIndex, 1);
                this.blocks = blocks
                this.handleDeleteAllRoom(this.modalInput.think)
                localStorage.setItem('Web-Agendamento-blocks', JSON.stringify(blocks))
                this.message('success', 'Bloco excluído com sucesso')
            }else {
                this.message('danger', 'Ocorreu um erro, Tente Novamente')
            }
            this.modalInput.status = false
            this.modalInput.handle = null
            this.modalInput.think = null 
        },
        edit() {
            this.modalEdit = false
            this.rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
        },
        message(type, message) {
            this.messages.value = true
            this.messages.type = type
            this.messages.message = message
            this.timeMessage()
        },
        timeMessage() {
            setTimeout(() => {
                this.messages.value = false
                this.messages.type = ''
                this.messages.message = ''
            }, 4000);
        },
        createRoom(event) {
            event.preventDefault()
            if(this.formRoom.room.length == 0 || this.formRoom.block.length == 0 || 
                this.formRoom.block == 'blocos' || this.formRoom.capacity.length == 0 || 
                this.formRoom.type.length == 0 || this.formRoom.type.toLocaleLowerCase() == 'tipos') {
                this.message('danger','Todos os itens são obrigatórios')
            }else {
                const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
                // this.formBlock.block = this.formBlock.block.toLocaleUpperCase()
                
                if(rooms.length > 0) {
                    const roomIndex = rooms.findIndex(room => room.room === this.formRoom.room && room.block === this.formRoom.block)
                    if(roomIndex !== -1) {
                        this.message('warning', 'Está Sala já existe')
                    }else {
                        const room = {
                            id: Number(rooms[rooms.length - 1].id) + 1,
                            room: this.formRoom.room,
                            block: this.formRoom.block,
                            capacity: this.formRoom.capacity,
                            type: this.formRoom.type,
                        }
                        rooms.push(room)
                        localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(rooms))
                        this.rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
                        this.message('success', 'Sala Criada Com Sucesso')
                        this.formRoom.room = ''
                        this.formRoom.block = 'Blocos'
                        this.formRoom.capacity = ''
                        this.formRoom.type = 'Tipos'
                    }
                }else {
                    const room = {
                        id: 1,
                        room: this.formRoom.room,
                        block: this.formRoom.block,
                        capacity: this.formRoom.capacity,
                        type: this.formRoom.type,
                    }
                    rooms.push(room)
                    localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(rooms))
                    this.rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
                    this.message('success', 'Sala Criada Com Sucesso')
                    this.formRoom.room = ''
                    this.formRoom.block = 'Blocos'
                    this.formRoom.capacity = ''
                    this.formRoom.type = 'Tipos'
                }
                
            }
            
        },
        createBlock(event) {
            event.preventDefault()
            if(this.formBlock.block.length == 0) {
                this.message('danger', 'Todos os itens são obrigatórios')
            }else {
                if(isNaN(this.formBlock.block)) {
                    this.formBlock.block = this.formBlock.block.toLocaleUpperCase()
                    const blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))
                    if(blocks.length > 0) {
                        if(blocks.find(block => block.block === this.formBlock.block )) {
                            this.message('danger', 'Bloco já existente')
                        }else {
                            const blockLast = blocks[blocks.length - 1]
                            const block = {
                                id: Number(blockLast.id) + 1,
                                block: this.formBlock.block,
                            }
                            blocks.push(block)
                            localStorage.setItem('Web-Agendamento-blocks', JSON.stringify(blocks))
                            this.getBlocks()
                            this.message('success', 'Bloco Criado Com Sucesso')
                            this.formBlock.block = ''
                        }
                        
                    }
                    else {
                        const block = {
                            id: 1,
                            block: this.formBlock.block,
                        }
                        blocks.push(block)
                        localStorage.setItem('Web-Agendamento-blocks', JSON.stringify(blocks))
                        this.getBlocks()
                        this.message('success', 'Bloco Criado Com Sucesso')
                        this.formBlock.block = ''
                    }
                }
                else {
                    this.message('danger', 'Apenas letras')
                }
                
            }
            
        },
        getBlocks() {
            this.blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))   
        },
        showBlocks(value) {
            if(value === 'show') {
                this.tableBlocks = true
            }
            if(value === 'hidden') {
                this.tableBlocks = false
            }
            
        },
        handleDeleteAllScheduling(id) {
            const schedulings = JSON.parse(localStorage.getItem('Web-Agendamento-schedulings'))
            const schedulingsFilter = schedulings.filter(scheduling => scheduling.room !== id)
            localStorage.setItem('Web-Agendamento-schedulings', JSON.stringify(schedulingsFilter))
        },
        handleDeleteAllRoom(id) {
            const rooms = JSON.parse(localStorage.getItem('Web-Agendamento-rooms'))
            const roomsFilter = rooms.filter(room => room.block !== id)
            const findIdScheduling = rooms.filter(room => room.block === id)[0]
            this.handleDeleteAllScheduling(findIdScheduling.id)
            localStorage.setItem('Web-Agendamento-rooms', JSON.stringify(roomsFilter))
        },
        findBlock(id) {
            const blocks = JSON.parse(localStorage.getItem('Web-Agendamento-blocks'))
            const block = blocks.filter(block => block.id === id)[0]
            return block.block.toLocaleUpperCase()
        },
    }
}
</script>