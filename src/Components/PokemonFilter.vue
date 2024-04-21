
<template>
    <div class="filter" app>
        <input type="text" v-model="filterId" placeholder="Filtrar por ID">
        <input type="text" v-model="filterType" placeholder="Filtrar por Tipo">
        <input type="text" v-model="filterSpecies" placeholder="Filtrar por Espécie">
        <input type="text" v-model="filterName" placeholder="Filtrar por Nome">
        <button @click="applyFilters">Filtrar</button>
        <button @click="clearFilters">Todos os Pokemons</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                filterId: '',
                filterType: '',
                filterSpecies: '',
                filterName: '',
            };
        },
        methods: {
            applyFilters() {
                const filters = {
                    id: this.filterId,
                    type: this.filterType,
                    species: this.filterSpecies,
                    name: this.filterName,                
                };
                
                this.$emit('apply-filters', filters);
            },
            clearFilters() {
                this.filterId = '';
                this.filterType = '';
                this.filterSpecies = '';
                this.filterName = '';
                this.$emit('clear-filters');
            }
        }
    }
</script>

<style scoped>

.filter {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.filter input {
    background-color: #c2c2c298;
    padding: 10px;
    margin: 2px;
    border-radius: 10px;
}
.filter button {
    margin: 10px;
    padding: 10px;
    background-color: red;
    border-radius: 10px;
}
    
</style>