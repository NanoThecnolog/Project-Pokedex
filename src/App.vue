<template>
  <v-app>    
    <v-main>
      <app-toolbar/>
      <PokemonFilter @apply-filters="updateFilters" @clear-filters="clearFilters"/>
      <PokemonModal v-if="selectedPokemon" :pokemonData="selectedPokemon" @close-modal="closeModal"/>
      <PokemonList :pokemons="currentPokemonList" @clear-filters="clearFilters" :tempPokemons="tempPokemons" :filters="filters" @open-modal="openModal"/>      
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
      teste: [],
      selectedPokemon: null,
      page: 1,      
      loading: false,
      limit: 250,
      filters: {},
    };
  },
  created() {
    this.loadMorePokemons();    
    window.addEventListener('scroll', this.handleScroll);
    
    
    
  },
  methods: {
    async fetchPokemonsData(page) {
      try {
        const response = await fetch(`${this.address}${this.allPokemons}${(page - 1) * this.limit}`);
        const data = await response.json();
        const responseTemp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const dataTemp = await responseTemp.json();
        
        this.teste = dataTemp;
        this.tempPokemons = data;
        this.tempPokemons.length > 0 ? this.tempPokemons : this.pokemons;
        
        //console.log("data results", data.results)
        //console.log("dataTemp results", dataTemp.results)
        return data.results;
      } catch(error) {
        console.log('Erro ao carregar os dados em fetchPokemonsData: ', error);
        return [];
      }
        
      },
    async loadMorePokemons() {
      if (this.loading) return;

      this.loading = true;
      const results = await this.fetchPokemonsData(this.page);
      
      
      let count = 0;
      for (const pokemon of results) {
        if (count >= this.limit) break;
        const pokemonData = await this.fetchPokemonData(pokemon.url);
        
        this.pokemons.push(pokemonData);
        
        count++;
        
      }        
      this.page++;
      this.loading = false;

      if (this.page > 1 && count < this.limit) {
        this.pokemons = this.pokemons.concat(this.tempPokemons);
        
      }
    },
    async fetchPokemonData(url) {
      const response = await fetch(url);
      const data = await response.json();
      //console.log("data em fetchPokemonData: ", data) 
      
      if (data.name && data.id) {
        data.name = String(data.name[0]).toUpperCase() + data.name.slice(1);
        data.id = String(data.id).padStart(4, '0');
      }
      
      if (data.types && data.types.length > 0) {
        data.types = data.types.map(({type}) => type.name);
        data.tipo = data.types.join(', ')

      }
      if (data.sprites && data.sprites.other?.dream_world?.front_default) {
        data.imageDefault = data.sprites.other.dream_world.front_default;
        data.imageGif = data.sprites.other.showdown.front_default;
        data.spriteDefault = data.sprites.front_default;
        data.spriteBackDefault = data.sprites.back_default;

        
        if (data.sprites.front_female || data.sprites.back_female) {
          data.spriteFemale = data.sprites.front_female;
          data.spriteBackFemale = data.sprites.back_female;
        }     
        
        if (data.sprites.front_shiny || data.sprites.back_shiny) {
          data.spriteShiny = data.sprites.front_shiny;
          data.spriteShinyBack = data.sprites.back_shiny;
        }

        if (data.sprites.front_shiny_female || data.sprites.back_shiny_female) {
          data.spriteShinyFemale = data.sprites.front_shiny_female;
          data.spriteShinyFemaleBack = data.sprites.back_shiny_female;
        }


      }        
      if(data.cries && data.cries.latest){
        data.audio = data.cries.latest;          
      }        
      if (data.species && data.species.url) {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();          

        data.description = speciesData.flavor_text_entries[1].flavor_text.replace(/[\f\n]/g, " ");   
        data.specieData = speciesData;       
        
      }
      if (data.game_indices && data.game_indices.length > 0) {
        data.game_indice = data.game_indices.map(({game_index}) => game_index);
        data.game_version = data.game_indices.map(({version}) => version.name)
      }   
      
      
      return data;
    },
    handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 800) {
        this.loadMorePokemons();
      }
    },
    openModal(pokeModal) {
      this.selectedPokemon = pokeModal.pokeModal;
      //console.log("chamando função no pai", this.selectedPokemon)

      
      
      
    },
    closeModal() {
      this.selectedPokemon = null;
      console.log("chamando função closeModal")
    },
    updateFilters(filters) {
      this.filters = filters;     
      
    },
    clearFilters() {
      this.filters = {};
    }
  },
  computed: {//aqui é onde eu passo os pokemons pro componente pokemonList
    currentPokemonList() {     
           
      return (        
        this.tempPokemons.length > 0 ? this.tempPokemons : this.pokemons
      )
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
p,
span {
    font-family: sans-serif;
    color: white;
    font-weight: 700;
}
.app {
    display: flex;
    flex-wrap: wrap;
}

</style>
