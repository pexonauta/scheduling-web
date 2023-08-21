<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Sala: {{ title }}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Capacidade: {{ capacity }} </h6>
          <h6 class="card-subtitle mb-2 text-body-secondary">Tipo: {{ type }} </h6>
          <p class="card-text">{{ adiditions.join(', ') }}.</p>
          <a href="#" class="card-link">Agendar</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardRoomComponent',
    props: {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        capacity: {
            type: String,
            required: true,
        },
        adiditions: {
            type: String,
            required: true,
        }
    }
}
</script>