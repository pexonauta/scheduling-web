<template>
    <div class="w-75 search d-flex">
        <form action="#" class="w-100 d-flex" role="search">
            <input class="form-control me-2" id="search" type="search"  :placeholder="searchValue" aria-label="Search">
            
            <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SearchComponent',
    props: {
        name: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            searchValue: '',
            // fastSearch: {
            //     type: false,
            //     func: '@input="validatedSearch"',
            // },
        }
    },
    mounted() {
        if(this.name == 'showAdmin') {
            this.searchValue = 'Pesquise Administrardores'
        }
        if(this.name == 'showRoomAndBLock') {
            this.searchValue = 'Pesquise Salas'
        }
    },
    methods: {
        validatedSearch(event) {
            event.preventDefault();
            const search = document.querySelector('#search')
            this.$emit('validated-search', search.value)
          
        },
    }
}
</script>