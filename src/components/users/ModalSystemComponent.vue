<template>
    <div class="content-modal">
        <div class="title">
            <h1> {{ title }} </h1>
        </div>
        
        <button @click="closeModal" class="close-modal">
            X
        </button>
        <form action="#">
            <div class="content-default">
                <div class="form-group">
                <label for="mode">Trocar de Tema:</label>
                    <div class="container">
                        <label class="switch">
                            <input type="checkbox" v-model="darkMode" checked @click="toggleMode">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>
            <button class="button-form save" id="buttonForm" >Salvar</button>
        </form>
        
    </div>
</template>
<script>
// import InputComponent from './InputComponent.vue';
export default {
    name: 'ModalProfileComponent',
    components: {
        // InputComponent
    },
    props: {
        title:{
            type: String,
            required: true,
        }
    },
    data() {
        return {
            darkMode: false,
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-profile-modal')
        },
        toggleMode() {
            this.darkMode = !this.darkMode;
        },
    }
}
</script>
<style lang="scss" scoped>

.content-modal {
    position: absolute;
    margin-top: 5%;
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
        .container {
            margin: 0 auto;
            max-width: 400px;
            .switch input {
                display: none;
            }
            .switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #858585;
                    transition: 0.4s;
                    border-radius: 34px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    transition: 0.6s ;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background-color: #3b3b3b;
                }
                input:checked + .slider:before {
                    transform: translateX(26px);
                }
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
        .save {
            background-color: rgb(25, 192, 19);
        }
        .save:hover {
            background-color: rgb(15, 104, 12);
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