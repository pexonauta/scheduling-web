<template>
    <div class="container_">
        <div class="content">
            <h1>Registrar-se</h1>
            <div v-if="alert.status" :class="'alert ' +alert.type">
                {{ alert.message }}
            </div>
            <form class="form" id="form">
                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('name')" name="name" id="name" type="text" placeholder="Nome:" required v-model="formData.name">
                    <ion-icon name="person-outline"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.name">{{ messageError.name }}</span>
                </div>
                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('lastname')" name="lastname" id="lastname" type="text" placeholder="Sobrenome:" required v-model="formData.lastname">
                    <ion-icon name="accessibility-outline"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.lastname">{{ messageError.lastname }}</span>
                </div>
                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('email')" name="email" id="email" type="email" placeholder="Email:" required v-model="formData.email">
                    <ion-icon name="mail-outline"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.email">{{ messageError.email }}</span>
                </div>

                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('password')" name="senha" id="password" type="password" placeholder="senha:" required v-model="formData.password">
                    <ion-icon name="eye-outline" id="icon_password" @click="eventPassword"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.password">{{ messageError.password }}</span>
                </div>
                <div class="form-group">
                    <input class="input-group" @focusout="validatedForm('confirmPassword')" id="confirmPassword" type="password" placeholder="Confirmar senha:" required>
                    <ion-icon name="eye-outline" id="icon_confirmpassword" @click="eventConfirmPassword"></ion-icon>
                    <span class="message-text-warn" v-if="messageErrorValidate.confirmPassword">{{ messageError.confirmPassword }}</span>
                </div>

                <div class="form-check">
                    <input type="checkbox" name="lembrar"><span class="lembrar">Lembrar De Mim</span>
                </div>

                <div class="form-button">
                    <button type="submit" @click="authRegister" name="logar" id="logar">Criar Conta</button>
                </div>
            </form>
            <div class="link">
                <router-link to="/scheduling-web/">Logar</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            alert: {
                status: false,
                type: '',
                message: '',
            },
            formData: {
                id: '',
                name: '',
                lastname: '',
                email: '',
                password: '',
                type: 0,
            },
            formValidated: {
                name: false,
                lastname: false,
                email: false,
                password: false,
                confirmPassword: false,
                auth: false,
            },
            messageError: {
                name: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            messageErrorValidate: {
                name: false,
                lastname: false,
                email: false,
                password: false,
                confirmPassword: false,
            },
            
        }
    },
    mounted() {
        if(!localStorage.getItem('Web-Agendamento-users') || 
        JSON.parse(localStorage.getItem('Web-Agendamento-users')).length === 0) {
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
        eventConfirmPassword() {
            let icon = document.querySelector('#icon_confirmpassword')
            let inputPassword = document.querySelector('#confirmPassword')
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
            let input = document.querySelector('#'+ value)
            if(value == "name") {
                this.formValidated.name = false
                if(input.value.length == 0) {
                    this.messageErrorValidate.name = true
                    this.messageError.name = "Campo Obrigatório"
                    input.classList.remove('button-success')
                }
                else {
                    this.messageErrorValidate.name = false
                    this.messageError.name = ""
                    input.classList.add('button-success')
                    this.formValidated.name = true
                }
            }
            if(value == "lastname") {
                this.formValidated.lastname = false
                if(input.value.length == 0) {
                    this.messageErrorValidate.lastname = true
                    this.messageError.lastname = "Campo Obrigatório"
                    input.classList.remove('button-success')
                }
                else {
                    this.messageErrorValidate.lastname = false
                    this.messageError.lastname = ""
                    input.classList.add('button-success')
                    this.formValidated.lastname = true
                }
            }
            if(value == "email") {
                this.formValidated.email = false
                if(input.value.length == 0) {
                    this.messageErrorValidate.email = true
                    this.messageError.email = "Campo Obrigatório"
                    input.classList.remove('button-success')
                }
                else if(!input.value.includes('@') || input.value == "@" || input.value.length <= 10) {
                    console.log('tem algo antes e depois')
                    this.messageErrorValidate.email = true
                    this.messageError.email = "E-mail está incorreto"
                    input.classList.remove('button-success')
                }
                else {
                    const userEmails = JSON.parse(localStorage.getItem('Web-Agendamento-users'))
                    const adminEmails = JSON.parse(localStorage.getItem('Web-Agendamento-admins'))
                    const adminExist = adminEmails.some(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase())
                    const userExist = userEmails.some(user => user.email.toLowerCase() === this.formData.email.toLowerCase())
                    if(userExist || adminExist) {
                        input.classList.remove('button-success')
                        this.formValidated.email = false
                        this.messageErrorValidate.email = true
                        this.messageError.email = "Email já cadastrado"
                    }else {
                        this.messageErrorValidate.email = false
                        this.messageError.email = ""
                        input.classList.add('button-success')
                        this.formValidated.email = true
                    }
                    
                }
            }
            if(value == 'password') {
                this.formValidated.password = false
                let inputConfirmPassword = document.querySelector('#confirmPassword')
                if(input.value.length == 0) {
                    this.messageErrorValidate.password = true
                    this.messageError.password = "Campo Obrigatório"
                    input.classList.remove('button-success')
                    if(inputConfirmPassword.value != input.value) {
                        inputConfirmPassword.classList.remove('button-success')
                        this.messageError.password = "Senhas Diferentes"
                        this.messageError.confirmPassword = "Senhas Diferentes"
                        
                    }
                }
                else if(input.value.length >= 8 && inputConfirmPassword.value.length != 0 && input.value != inputConfirmPassword.value){
                    input.classList.remove('button-success')
                    inputConfirmPassword.classList.remove('button-success')
                    this.messageErrorValidate.password = true
                    this.messageErrorValidate.confirmPassword = true
                    this.messageError.password = "Senhas Diferentes"
                    this.messageError.confirmPassword = "Senhas Diferentes"
                }
                else if(input.value.length < 8) {
                    input.classList.remove('button-success')
                    inputConfirmPassword.classList.remove('button-success')
                    this.messageErrorValidate.password = true
                    this.messageError.password = "A senha deve ter no mínimo 8 caracters"
                }
                else {
                    this.messageError.password = ""
                    this.messageErrorValidate.password = false
                    input.classList.add('button-success')
                    this.formValidated.password = true
                    if(inputConfirmPassword.value.length != 0) {
                        this.messageError.confirmPassword = ""
                        this.messageErrorValidate.confirmPassword = false
                        inputConfirmPassword.classList.add('button-success')
                    }
                }
            }
            if(value == 'confirmPassword') {
                let inputPassword = document.querySelector('#password')
                this.formValidated.confirmPassword = false
                if(input.value.length == 0) {
                    this.messageErrorValidate.confirmPassword = true
                    this.messageError.confirmPassword = "Campo Obrigatório"
                    input.classList.remove('button-success')
                    if(inputPassword.value !=  input.value) {
                        inputPassword.classList.remove('button-success')
                        this.messageError.password = "Senhas Diferentes"
                        this.messageError.confirmPassword = "Senhas Diferentes"
                        
                    }
                }
                else if(input.value.length >= 8 && inputPassword.value.length != 0 && input.value != inputPassword.value){
                    input.classList.remove('button-success')
                    inputPassword.classList.remove('button-success')
                    this.messageErrorValidate.password = true
                    this.messageErrorValidate.confirmPassword = true
                    this.messageError.password = "Senhas Diferentes"
                    this.messageError.confirmPassword = "Senhas Diferentes"
                }
                else if(input.value.length < 8) {
                    input.classList.remove('button-success')
                    inputPassword.classList.remove('button-success')
                    this.messageErrorValidate.confirmPassword = true
                    this.messageError.confirmPassword = "A senha deve ter no mínimo 8 caracters"
                }
                else {
                    this.messageErrorValidate.confirmPassword = false
                    this.messageError.confirmPassword = ""
                    input.classList.add('button-success')
                    this.formValidated.confirmPassword = true
                    if(inputPassword.value.length != 0) {
                        this.messageError.password = ""
                        this.messageErrorValidate.password = false
                        inputPassword.classList.add('button-success')
                    }
                }
            }
        },
        authRegister(e) {
            e.preventDefault()
            let inputName = document.querySelector('#name')
            let inputLastname = document.querySelector('#lastname')
            let inputEmail = document.querySelector('#email')
            let inputPassword = document.querySelector('#password')
            let inputConfirmPassword = document.querySelector('#confirmPassword')
            
            if(inputName.value.length == 0) {
                this.messageError.name = 'Campo Obrigatório'
                this.messageErrorValidate.name = true
            }
            if(inputLastname.value.length == 0) {
                this.messageError.lastname = 'Campo Obrigatório'
                this.messageErrorValidate.lastname = true
            }
            if(inputEmail.value.length == 0) {
                this.messageError.email = 'Campo Obrigatório'
                this.messageErrorValidate.email = true
            }
            if(inputPassword.value.length == 0) {
                this.messageError.password = 'Campo Obrigatório'
                this.messageErrorValidate.password = true
            }
            if(inputConfirmPassword.value.length == 0) {
                this.messageError.confirmPassword = 'Campo Obrigatório'
                this.messageErrorValidate.confirmPassword = true
            }
            if(this.formValidated.name && this.formValidated.email && this.formValidated.password && this.formValidated.confirmPassword) {
                const existingUsersJSON = localStorage.getItem('Web-Agendamento-users');
                const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];
                const existingAdminsJSON = localStorage.getItem('Web-Agendamento-admins');
                const existingAdmins = existingAdminsJSON ? JSON.parse(existingAdminsJSON) : [];
                // Verifique se existem usuários
                if (existingUsers.length > 0) {
                    if(existingUsers.some(user => user.email.toLowerCase() === this.formData.email.toLowerCase())) {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Já existe esse email'
                        let inputEmail = document.querySelector('#email')
                        inputEmail.classList.remove('button-success')
                        this.messageError.email = 'Email já cadastrado'
                        this.formValidated.email = false
                        this.messageErrorValidate.email = true
                    }else if(existingAdmins.length > 0 && existingAdmins.some(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase())) {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Já existe esse email'
                        let inputEmail = document.querySelector('#email')
                        inputEmail.classList.remove('button-success')
                        this.messageError.email = 'Email já cadastrado'
                        this.formValidated.email = false
                        this.messageErrorValidate.email = true
                    }else {
                        // Recupere o último usuário da lista
                        const lastUser = existingUsers[existingUsers.length - 1];
                        // Faça algo com o último usuário
                        this.formData.id = Number(lastUser.id) + 1
                        this.formData.email =  this.formData.email.toLowerCase()
                        existingUsers.push(this.formData);
                        localStorage.setItem('Web-Agendamento-users', JSON.stringify(existingUsers));
                        this.$router.push({path: '/scheduling-web/logar', query: { success: 'newRegister'}})
                    }
                } else {
                    if(existingAdmins.length > 0 && existingAdmins.some(admin => admin.email.toLowerCase() === this.formData.email.toLowerCase())) {
                        this.alert.status = true
                        this.alert.type = 'alert-warning'
                        this.alert.message = 'Já existe esse email'
                        let inputEmail = document.querySelector('#email')
                        inputEmail.classList.remove('button-success')
                        this.messageError.email = 'Email já cadastrado'
                        this.formValidated.email = false
                        this.messageErrorValidate.email = true
                    }else {
                        this.formData.id = 1
                        this.formData.email =  this.formData.email.toLowerCase()
                        existingUsers.push(this.formData);
                        localStorage.setItem('Web-Agendamento-users', JSON.stringify(existingUsers));
                        this.$router.push('/scheduling-web/user/home')
                    }
                    
                }
                
                // this.$router.push('/user/home')
            }
        }
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>