<template>
     <router-Link :to="router">
        <span class="icon"><ion-icon :name="icon"></ion-icon></span>
        <span class="title" v-if="this.title"> {{ text }}</span>
    </router-Link>
</template>
<script>
export default {
    name: 'RouteLinkComponent',
    props: {
        router: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            default: '',
        }

    },
    data() {
        return {
            title: true,
        }
    },
    mounted() {
        if(this.text == 'disable') {
            this.title = false
        }
    }
}
</script>