<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">{{ title }}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{{ subtitle }} </h6>
          <h6 class="card-subtitle mb-2 text-body-secondary" v-show="this.total">Quantidade: {{ qtd }} </h6>
          <p class="btn btn-primary"><router-link class="text-light" :to="router">Ver</router-link></p>
        </div>
    </div>
</template>
<script>

export default {
    name: 'CardInfoComponent',
    components:{
        
    },
    props: {
        router: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        qtd: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            total: false,
        }
    },
    mounted() {
        if(this.qtd >= 0) {
            this.total = true
        }
    }
}
</script>