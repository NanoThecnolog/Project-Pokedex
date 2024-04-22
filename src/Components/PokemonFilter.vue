
<template>
    <div class="filter" app>
        <input type="text" v-model="filterId" placeholder="ID">
        <input type="text" v-model="filterType" placeholder="Type">
        <input type="text" v-model="filterSpecies" placeholder="Species">
        <input type="text" v-model="filterName" placeholder="Name">
        <button @click="applyFilters">Search</button>
        <button @click="clearFilters">All Pokemons</button>
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