<template>
    <div class="container_">
        <div class="content">
            <h1>Login</h1>
            <div v-if="alert.status" :class="'alert ' +alert.type">
                {{ alert.message }}
            </div>
            <form method="get" class="form" id="form">
                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('email')" name="email" id="email" type="email" v-model="formData.email" placeholder="Email:" required>
                    <ion-icon name="mail-outline"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.email">{{ messageError.email }}</span>
                </div>

                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('password')" name="senha" id="password" type="password" v-model="formData.password" placeholder="senha:" required>
                    <ion-icon name="eye-outline" id="icon_password" @click="eventPassword"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.password">{{ messageError.password }}</span>
                </div>

                <div class="form-check">
                    <input type="checkbox" name="lembrar"><span class="lembrar">Lembrar De Mim</span>
                </div>

                <div class="form-button">
                    <button class="btn-adm me-5" type="submit" name="logar" @click="authAdmin" id="logar">Admin</button>
                    <button class="btn-auth me-5" type="submit" name="logar" @click="authLogin" id="logar">Entrar</button>
                    <button class="btn-auth btn-user" type="submit" name="logar" @click="authUser" id="logar">Usuário</button>
                </div>
            </form>
            <div class="link">
                <router-link to="/register">Registrar-se</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
         return {
            alert: {
                status: false,
                type: '',
                message: '',
            },
            formData: {
                email: '',
                password: '',
            },
            formValidated: {
                email: false,
                password: false,
            },
            messageError: {
                email: '',
                password: '',
            },
            messageErrorValidate: {
                email: false,
                password: false,
            }
        }
    },
    created() {
        if(this.$route.query.success === 'newRegister') {
            this.alert.status = true
            this.alert.type = 'alert-success'
            this.alert.message = 'Conta Registrada aguarde até 48 horas para o acesso'
            setTimeout(() => {
                this.$route.query.success == null
                this.alert.status = false
                this.alert.type = ''
            }, 5000)
        }
    },
    mounted() {
        if(!localStorage.getItem('Web-Agendamento-users')) {
            const users = [
                {id: 1,name: 'Govern',lastname: 'afternoon', email: 'user@gmail.com',password: '12345678', type: 1},
            ]
            
            localStorage.setItem('Web-Agendamento-users', JSON.stringify(users))
        } 
        if(!localStorage.getItem('Web-Agendamento-admins')) {
            const admins = [
                {id: 1,name: 'Life',lastname: 'Next', email: 'lifeNext@gmail.com',password: '12345678', type: 1},
                {id: 2,name: 'Ceo',lastname: 'bennings', email: 'benning@gmail.com',password: '12345678', type: 2},
            ]
            
            localStorage.setItem('Web-Agendamento-admins', JSON.stringify(admins))
        } 
        if(localStorage.getItem('Web-Agendamento-auth') === null ) {
            const webAgendamentoAuth = {
                auth: 'undefined',
            }
            localStorage.setItem('Web-Agendamento-auth', JSON.stringify(webAgendamentoAuth))
        }
        if(localStorage.getItem('Web-Agendamento-auth') !== null ) {
            const webAgendamentoJSON = localStorage.getItem('Web-Agendamento-auth')
            const agendamentoAuth = JSON.parse(webAgendamentoJSON);
            if(agendamentoAuth.auth !== 'undefined') {
                if(agendamentoAuth.admin) {
                    this.$router.push('/adm/')
                }else {
                    this.$router.push('/user/home')
                }
                
            }else {
                const webAgendamentoAuth = {
                    auth: 'undefined',
                }
                localStorage.setItem('Web-Agendamento-auth', JSON.stringify(webAgendamentoAuth))
            }
        }
    },
    methods: {
        eventPassword() {
            let icon = document.querySelector('#icon_password')
            let inputPassword = document.querySelector('#password')
            if(icon.name == "eye-outline") {
                icon.name = "eye-off-outline"
                inputPassword.type = 'text'
            }
            else {
                icon.name = "eye-outline"
                inputPassword.type = 'password'
            }
            
        },
        validatedForm(value) {
            if(value === null) {
                this.alert.status = true
                this.alert.type = 'alert-danger'
                this.alert.message = 'Credenciais Inválidas'
            }
            let input = document.querySelector('#' + value)
            if(this.alert.status === true) {
                this.alert.status = false
                this.alert.type = ''
                this.alert.type = ''
            }
            
            if(value == "email"){
                if(input.value.length == 0) {
                    input.classList.remove('button-success')
                    this.messageError.email = 'Campo Obrigatório'
                    this.messageErrorValidate.email = true
                }
                else if(input.value.length < 10){
                    input.classList.remove('button-success')
                    this.messageError.email = 'E-mail Incorreto'
                    this.messageErrorValidate.email = true
                }
                else {
                    this.messageError.email = ""
                    this.messageErrorValidate.email = false
                    input.classList.add('button-success')
                    this.formValidated.email = true
                }
            }
            if(value == "password"){
                if(input.value.length == 0) {
                    input.classList.remove('button-success')
                    this.messageError.password = 'Campo Obrigatório'
                    this.messageErrorValidate.password = true
                }
                else if(input.value.length < 8){
                    input.classList.remove('button-success')
                    this.messageError.password = 'A senha deve conter no mínimo 8 catacter'
                    this.messageErrorValidate.password = true
                }
                else {
                    this.messageError.password = ""
                    this.messageErrorValidate.password = false
                    input.classList.add('button-success')
                    this.formValidated.password = true
                }
            }
        },
        authLogin(e) {
            e.preventDefault()
            setTimeout(() => {
                
            let inputEmail = document.querySelector('#email')
            let inputPassword = document.querySelector('#password')
            if(inputEmail.value.length == 0) {
                this.messageError.email = 'Campo Obrigatório'
                this.messageErrorValidate.email = true
            }
            if(inputPassword.value.length == 0) {
                this.messageError.password = 'Campo Obrigatório'
                this.messageErrorValidate.password = true
            }
            if(this.formValidated.email && this.formValidated.password) {
                const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
                const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                if(admins.length > 0 && users.length > 0) {
                    if(admins.some(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase())) {
                        if(admins.some(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase() && admin.password === this.formData.password)) {
                            const admin = admins.find(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase())
                            const auth = {
                                auth: 'authenticated',
                                admin: {
                                    id: admin.id,
                                    name: admin.name,
                                    lastname: admin.lastname,
                                    email: admin.email,
                                    type: admin.type,
                                }
                            }
                            localStorage.setItem('Web-Agendamento-auth', JSON.stringify(auth))
                            this.$router.push('/adm/')
                        }else {
                            this.alert.status = true
                            this.alert.type = 'alert-danger'
                            this.alert.message = 'Credenciais Inválidas'
                            this.formValidated.password = false
                        }
                    }else {
                        if(users.some(user => user.email.toLowerCase() === this.formData.email.toLowerCase())) {
                            if(users.some(user => user.email.toLowerCase() === this.formData.email.toLowerCase() && user.password === this.formData.password)) {
                                const user = users.find(user => user.email.toLowerCase() === this.formData.email.toLowerCase())
                                if(user.type === 0 ||user.type === -1) {
                                    if(user.type === 0) {
                                        this.alert.status = true
                                        this.alert.type = 'alert-warning'
                                        this.alert.message = 'Usuário em análise, tente novamente mais tarde'
                                    }else {
                                        this.alert.status = true
                                        this.alert.type = 'alert-danger'
                                        this.alert.message = 'Usuário Negado!!'
                                    }
                                } else {
                                    const auth = {
                                    auth: 'authenticated',
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            type: user.type,
                                        }
                                    }
                                    localStorage.setItem('Web-Agendamento-auth', JSON.stringify(auth))
                                    this.$router.push('/user/home')
                                }
                            }else {
                                this.alert.status = true
                                this.alert.type = 'alert-danger'
                                this.alert.message = 'Credenciais Inválidas'
                                this.formValidated.password = false
                            }
                        }
                        else {
                            this.alert.status = true
                            this.alert.type = 'alert-warning'
                            this.alert.message = 'E-mail não existente'
                            this.formValidated.email = false
                        }
                    }
                }
                else {
                    this.alert.status = true
                    this.alert.type = 'alert-warning'
                    this.alert.message = 'E-mail não existente'
                    this.formValidated.email = false
                }
            }
            }, 100)
        },
        authAdmin(e) {
            e.preventDefault()
            const admins = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
            if(admins.length > 0) {
                const adminsT = admins.filter(admin => admin.type === 2)
                const admin = adminsT[0]
                const auth = {
                    auth: 'authenticated',
                    admin: {
                        id: admin.id,
                        name: admin.name,
                        lastname: admin.lastname,
                        email: admin.email,
                        type: admin.type,
                    }
                }
                localStorage.setItem('Web-Agendamento-auth', JSON.stringify(auth))
                this.$router.push('/adm/')
            }else {
                this.alert.status = true
                this.alert.type = 'alert-warning'
                this.alert.message = 'Nenhum usuário encontrado'
            }
            
        },
        authUser(e) {
            e.preventDefault()
            const users = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
            if(users.length > 0) {
                const usersT = users.filter(user => user.type === 1)
                const user = usersT[0]
                const auth = {
                    auth: 'authenticated',
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            type: user.type,
                        }
                    }
                localStorage.setItem('Web-Agendamento-auth', JSON.stringify(auth))
                this.$router.push('/user/home')
            }else {
                this.alert.status = true
                this.alert.type = 'alert-warning'
                this.alert.message = 'Nenhum usuário encontrado'
            }
            
        },
    }
}
</script>

<style src="./style.scss" lang="scss" scoped/>