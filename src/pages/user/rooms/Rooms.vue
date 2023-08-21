<template>
    <div class="content">
        <div class="search" v-if="schenduling">
            <form action="#" class="d-flex" role="search">
                <input class="form-control me-2" id="search" type="search" placeholder="Pesquise a Sala" aria-label="Search">
                <input class="form-control w-25 me-4" type="date" aria-label="Data">
                
                <button @click="validatedSearch" class="btn btn-primary me-2" type="submit">Search</button>
            </form>
        </div>
        <div class="container">
            <div class="row nothing" v-if="!schenduling">
                <div class="col">
                    <p>Nenhuma Sala Foi Encontrada, Tente Novamente Mais Tarde.</p>
                </div>
            </div>
            <div class="row" v-if="schenduling">
                <div class="col">
                    <CardRoomComponent 
                    title="A1" 
                    type="normal"
                    capacity="30" 
                    :adiditions="adiditions"
                    />
                </div>
            </div>
            <div class="pagination" v-if="schenduling">
               <PaginationComponent />
            </div>
        </div>
    </div>
</template>
<script>
import CardRoomComponent from '@/components/users/CardRoomComponent.vue'
import PaginationComponent from '@/components/users/PaginationComponent.vue'
export default {
    name: 'RoomsPage',
    data() {
        return {
            schenduling: false,
            adiditions: [
                'Ar Condicionado',
                'Projetor',
                'Quadro'
            ]
        }
    },
    components: {
        CardRoomComponent,
        PaginationComponent,
    },
    methods: {
        validatedSearch(event) {
            event.preventDefault()
        }   
    }
}
</script>
<style src="./style.scss" lang="scss" scoped/>
