<template>
    <div class="content-modal">
        <div class="title">
            <h1> {{ title }} </h1>
        </div>
        
        <button @click="closeModal" class="close-modal">
            X
        </button>
        <div v-if="alert.status" :class="'text-center alert ' + alert.type">
            {{ alert.message }}
        </div>
        <form action="#">
            <div class="content-default" v-if="formTypes.default">
                <div class="form-group">
                    <input class="form-input-nb" type="text" v-model="user.name" placeholder="Nome:" id="name" :disabled="inputsValidated.name"/>
                    <input class="form-input-nb" type="email" v-model="user.email" placeholder="E-mail:" id="email" :disabled="inputsValidated.email"/>
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
                    <input class="form-input-nb" type="password" id="lastPassword" v-model="newPassword.last" placeholder="Senha Antiga:" required/>
                </div>
                <div class="form-group">
                    <input class="form-input-nb" type="password" id="password" v-model="newPassword.new" placeholder="Nova Senha:" required/>
                    <input class="form-input-nb" type="password" id="confirmPassword" v-model="newPassword.confirm" placeholder="Confirma Sua Senha:" required/>
                </div>
            </div>
           
            <button class="button-form edit" @click="editValidated"  id="buttonForm" >Editar</button>
            <button class="button-form eventPassword" @click="eventHandlePassword" v-if="formTypes.default">Alterar Senha</button>
            <button class="button-form eventEdit" @click="eventHandleEdit" v-if="!formTypes.default">Voltar</button>
        </form>
        
    </div>
</template>
<script>

export default {
    name: 'ModalProfileComponent',
    components: {
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
            user: {
                id: '',
                name: '',
                email: '',
            },
            formData: {
                name: '',
                email: '',
            },
            alert: {
                status: false,
                type: '',
                message: '',
            },
            newPassword: {
                last: '',
                new: '',
                confirm: '',
            },
            inputsValidated: {
                    name: true,
                    email: true,
                    image: true,
            } 
        }
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('Web-Agendamento-auth'))
        this.user.id = user.user.id
        this.user.name = user.user.name
        this.user.email = user.user.email
        this.formData.name = user.user.name
        this.formData.email = user.user.email
   },
    methods: {
        closeModal() {
            this.$emit('close-profile-modal')
        },
        editValidated(e) {
            e.preventDefault();
            this.alert.status = false
            this.alert.type = ''
            this.alert.message = ''
            let button = document.querySelector('#buttonForm');
            button.innerHTML = 'Atualizar';
            button.classList.remove('edit');
            button.classList.add('update');
            if(this.formTypes.default === true) {
                let inputFile = document.querySelector('#labelFile')
                const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                const userAuth = JSON.parse(localStorage.getItem('Web-Agendamento-auth'))
                const user = users.find(user => user.email === userAuth.user.email)
                if(!inputFile.classList.contains('fileDisable')) {
                    if(user.name === this.user.name && user.email === this.user.email){
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Nada Foi Alterado!!'
                    }else {
                        if(this.user.name.length !== 0 && this.user.email.length !== 0) {
                            console.log('bbb')
                            if(this.user.name !== user.name || this.user.email !== user.email) {
                                user.name = this.user.name;
                                user.email = this.user.email;

                                userAuth.user.name = this.user.name;
                                userAuth.user.email = this.user.email;

                                localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));
                                localStorage.setItem('Web-Agendamento-auth', JSON.stringify(userAuth));

                                this.alert.status = true;
                                this.alert.type = 'alert-success';
                                this.alert.message = 'Dados Atualizados';
                                button.innerHTML = 'Editar';
                                button.classList.remove('update');
                                button.classList.add('edit');
                                inputFile.classList.add('fileDisable');
                                this.inputsValidated.name = true;
                                this.inputsValidated.email = true;
                                this.inputsValidated.image = true;

                            }else {
                                this.alert.status = true;
                                this.alert.type = 'alert-danger';
                                this.alert.message = 'Erro, tente novamente!!';
                            }
                        }else {
                            this.alert.status = true
                            this.alert.type = 'alert-danger'
                            this.alert.message = 'Campo Vazio'
                        }
                    }
                }
                if(inputFile.classList.contains('fileDisable')) {
                    inputFile.classList.remove('fileDisable')
                }
            }
            if(this.formTypes.default === false) {
                const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                const userAuth = JSON.parse(localStorage.getItem('Web-Agendamento-auth'))
                const user = users.find(user => user.email === userAuth.user.email)
                if(this.newPassword.last === user.password) {
                    if(this.newPassword.new === this.newPassword.confirm) {
                        this.alert.status = true
                        this.alert.type = 'alert-success'
                        this.alert.message = 'Senha Alterada'
                        user.password = this.newPassword.new

                        localStorage.setItem('Web-Agendamento-users', JSON.stringify(users));

                    }else {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Senhas diferentes' 
                    }
                }else {
                    this.alert.status = true
                    this.alert.type = 'alert-danger'
                    this.alert.message = 'Senha antiga errada'
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
    margin-top: 5%;
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

@media (max-width: 768px) {
    /* Estilos para dispositivos móveis */
    .content-modal {
        width: 400px !important;
    }
    
}
</style>