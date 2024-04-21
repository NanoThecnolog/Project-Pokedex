<template>
  <v-app>    
    <v-main>
      <app-toolbar/>
      <PokemonFilter @apply-filters="updateFilters" @clear-filters="clearFilters"/>
      <PokemonModal v-if="selectedPokemon" :pokemonData="selectedPokemon" @close-modal="closeModal"/>
      <PokemonList :pokemons="currentPokemonList" :filters="filters" @open-modal="openModal"/>      
    </v-main>
    <app-footer/>    
  </v-app>
</template>

<script>
import Vue from 'vue';

import PokemonList from '@/Components/PokemonList.vue';
import PokemonModal from '@/Components/PokemonModal.vue';
import PokemonFilter from '@/Components/PokemonFilter.vue';

import Carousel from '@/Components/Carousel.vue';
import Footer from '@/Components/Footer.vue';
import Toolbar from '@/Components/Toolbar.vue';
import Menu from '@/Components/Menu.vue';

Vue.component('PokemonList', PokemonList);
Vue.component('PokemonModal', PokemonModal);
Vue.component('PokemonFilter', PokemonFilter);

Vue.component('app-footer', Footer);
Vue.component('app-carousel', Carousel);
Vue.component('app-toolbar', Toolbar);
Vue.component('app-menu', Menu);

export default({
  name: 'App',
  components: {
    PokemonModal,
    PokemonList,
    PokemonFilter
  },
  data () {
    return {
      address: "https://pokeapi.co/api/v2/",
      allPokemons: "pokemon?limit=100000&offset=0",
      tempPokemons: [],
      pokemons: [],
      selectedPokemon: null,
      page: 1,      
      loading: false,
      limit: 25,
      filters: {},
    };
  },
  created() {
    this.loadMorePokemons();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetchPokemonsData(page) {
      
        const response = await fetch(`${this.address}${this.allPokemons}${(page - 1) * this.limit}`);
        const data = await response.json();        
        return data.results; 
        
      },
    async loadMorePokemons() {
      if (this.loading) return;

      this.loading = true;
      const results = await this.fetchPokemonsData(this.page);
      
      let count = 0;
      for (const pokemon of results) {
        if (count >= this.limit) break;
        const pokemonData = await this.fetchPokemonData(pokemon.url);
        
        this.tempPokemons.push(pokemonData);          
        count++;
        
      }        
      this.page++;
      this.loading = false;

      if (this.page > 1 && count < this.limit) {
        this.pokemons = this.pokemons.concat(this.tempPokemons);
        this.tempPokemons = [];
      }
    },
    async fetchPokemonData(url) {
      const response = await fetch(url);
      const data = await response.json();
      
      
      if (data.types && data.types.length > 0) {
        data.types = data.types.map(({type}) => type.name);
      }
      if (data.sprites && data.sprites.other?.dream_world?.front_default) {
        data.image = data.sprites.other.dream_world.front_default;
      }        
      if(data.cries && data.cries.latest){
        data.audio = data.cries.latest;          
      }        
      if (data.species && data.species.url) {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();          

        data.description = speciesData.flavor_text_entries[1].flavor_text.replace(/[\f\n]/g, " ");   
      }
      return data;
    },
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        this.loadMorePokemons();
      }
    },
    openModal(pokeModal) {
      this.selectedPokemon = pokeModal.pokeModal;
      console.log("chamando função no pai")
      
      
    },
    closeModal() {
      this.selectedPokemon = null;
      console.log("chamando função closeModal")
    },
    updateFilters(filters) {
      this.filters = filters;
      if (Object.keys(filters).length > 0) {
        
        this.pokemons = this.tempPokemons.filter(pokemon => {            
          return (
            (!filters.id || String(pokemon.id) === filters.id) &&
            (!filters.type || pokemon.type === filters.type) &&
            (!filters.species || pokemon.species === filters.species) &&
            (!filters.name || pokemon.name.toLowerCase() === filters.name.toLowerCase())
          )
        })
      } else {
        this.pokemons = this.tempPokemons;
      }
    },
    clearFilters() {
      this.filters = {};
    }
  },
  computed: {
    currentPokemonList() {
      console.log(this.pokemons)
      return this.tempPokemons.length > 0 ? this.tempPokemons : this.pokemons;
    }
  }
});


</script>
<style>

.body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: auto;
    overflow-x: hidden;    
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
    font-family: sans-serif;
    color: white;
    font-weight: 700;
}
.app {
    display: flex;
    flex-wrap: wrap;
}

</style>
