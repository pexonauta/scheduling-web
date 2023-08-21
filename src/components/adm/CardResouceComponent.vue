<template>
  <div class="card" style="width: 16rem;">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">{{ subtitle }} </h6>
        <h6 class="card-subtitle mb-2 text-body-secondary" v-show="this.total">Quantidade: {{ qtd }} </h6>
        <p @click="eventShow" class="btn btn-primary">Mostrar</p>
      </div>
  </div>
</template>
<script>

export default {
  name: 'CardResoucesComponent',
  components:{   
  },
  props: {
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
    type: {
      type: String,
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
  },
  methods: {
    eventShow() {
      const value = this.type
      if(value == 'showAdmin') {
        this.$emit('event-show', 'showAdmin')
      }
      if(value == 'showRoomAndBLock') {
        this.$emit('event-show', 'showRoomAndBLock')
      }
    }
  }
}
</script>