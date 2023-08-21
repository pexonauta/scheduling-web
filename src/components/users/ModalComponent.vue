<template>
    <div class="content-modal" ref="modalContainer">
        <div class="title">
            <h1> {{ title }} </h1>
        </div>
        
        <button @click="closeModal" class="close-modal">
            X
        </button>
        <form action="#">
            <div class="content-default" v-if="formTypes.default">
                <div class="form-group">
                    <InputComponent type="text" placeholder="Nome:" id="name" :disabled="inputsValidated.name"/>
                    <InputComponent type="email" placeholder="E-mail:" id="email" :disabled="inputsValidated.email"/>
                </div>
                <div class="form-group">
                    <label for="file-input" id="labelFile"  class="custom-file-input fileDisable" >
                        Alterar Imagem
                    </label>
                    <input id="file-input" type="file" @change="handleFileInputChange" :disabled="inputsValidated.image"/>
                </div>
            </div>
            <div class="content-password" v-else>
                <div class="form-group">
                    
                    <InputComponent type="password" placeholder="Senha Antiga:" id="lastPassword" />
                </div>
                <div class="form-group">
                    <InputComponent type="password" placeholder="Nova Senha:" id="password" />
                    <InputComponent type="password" placeholder="Confirma Sua Senha:" id="confirmPassword" />
                </div>
            </div>
           
            <button class="button-form edit" @click="editValidated"  id="buttonForm" >Editar</button>
            <button class="button-form eventPassword" @click="eventHandlePassword" v-if="formTypes.default">Alterar Senha</button>
            <button class="button-form eventEdit" @click="eventHandleEdit" v-if="!formTypes.default">Voltar</button>
        </form>
        
    </div>
</template>
<script>
import InputComponent from './InputComponent.vue';
export default {
    name: 'ModalComponent',
    components: {
        InputComponent
    },
    props: {
        title:{
            type: String,
            required: true,
        }
    },
    data() {
        return {
            formTypes: {
                default: true,
            },
            inputsValidated: {
                    name: true,
                    email: true,
                    image: true,
            } 
        }
    },
    mounted() {
        // Adicionar um ouvinte de eventos para o clique no documento
        document.addEventListener('click', this.handleOutsideClick);
    },
    methods: {
        closeModal() {
            this.$emit('close-profile-modal')
        },
        editValidated(e) {
            e.preventDefault();
            let button = document.querySelector('#buttonForm');
            button.innerHTML = 'Atualizar';
            button.classList.remove('edit');
            button.classList.add('update');
            if(this.formTypes.default) {
                let inputFile = document.querySelector('#labelFile')
            
                if(inputFile.classList.contains('fileDisable')) {
                    inputFile.classList.remove('fileDisable')
                }
            }

            this.inputsValidated.name = false;
            this.inputsValidated.email = false;
            this.inputsValidated.image = false;
        },
        handleFileInputChange(event) {
        const fileInput = event.target;
        if (fileInput.files && fileInput.files.length > 0) {
            // Aqui você pode acessar os arquivos selecionados pelo usuário
            console.log(fileInput.files[0]);
        }
        },
        eventHandlePassword(e) {
            e.preventDefault()
            let button = document.querySelector('#buttonForm');
            button.innerHTML = 'Atualizar';
            button.classList.remove('edit');
            button.classList.add('update');
            this.formTypes.default = false
        },
        eventHandleEdit(e) {
            e.preventDefault()
            let button = document.querySelector('#buttonForm');
            button.classList.remove('update');
            button.classList.add('edit');
            button.innerHTML = 'Editar';
            this.formTypes.default = true;
            this.inputsValidated.name = true;
            this.inputsValidated.email = true;
            this.inputsValidated.image = true;
        },
        handleOutsideClick(event) {
            // Verificar se o clique ocorreu fora do modal
            const modalElement = this.$refs.modalContainer;
            if (modalElement && !modalElement.contains(event.target)) {
                console.log('foraa')
            }
        },
    }
}
</script>
<style lang="scss" scoped>

#file-input {
    display: none;
}
.content-modal {
    position: absolute;
    width: 500px;
    height: 500px;
    top: 100%;
    left: 50%;
    transform: translate(-50%);
    background-color: rgba(204, 204, 204, 0.8);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    border-radius: 5px; 
    z-index: 999;
    .close-modal {
        position: absolute;
        right: 1%;
        top: 0;
        font-size: 2em;
        border: none;
        background-color: transparent;
        color: #fff;
        cursor: pointer;
    }
    .title {
        color: #fff;
        text-align: center;
        border-bottom: 1px solid #000;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }

    form {
        margin-top: 5%;
        padding: 10px;
        .form-group {
            width: 100%;
            margin-bottom: 3%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .custom-file-input {
                display: inline-block;
                padding: 8px 20px;
                background-color: #007bff;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
            }
            .fileDisable {
                cursor: default;
                background-color: rgb(101, 174, 216);
            }
        }
        .button-form {
            width: 40%;
            margin: 5% auto;
            padding: 5px;
            border-radius: 8px;
            
            color: #fff;
            font-weight: bold;
            border: none;

            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s ease-in-out;

        }
        .eventEdit {
            margin-top: -2%;
            width: 30%;
            background-color: rgb(57, 150, 204);
        }
        .eventEdit:hover {
            background-color: rgb(90, 170, 216);
        }
        .eventPassword {
            width: 30%;
            background-color: rgb(0, 121, 65);
        }
        .eventPassword:hover {
            background-color: rgb(15, 161, 93);
        }
        .edit {
            
            background-color: rgb(101, 189, 240);
        }
        .edit:hover {
            background-color: rgb(71, 132, 212);
        }
        .update {
            background-color: rgb(71, 212, 130);
        }
        .update:hover {
            background-color: rgb(26, 141, 74);
        }
    }
}
</style>