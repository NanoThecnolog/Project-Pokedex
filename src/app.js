

Vue.component('pokemon-list', {
  props: ['pokemons'],
  template: `
  <div class="container">
    <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon container-pokemon" @click="openModal(pokemon)">
      <h2>{{ pokemon.name }}</h2>
      <img v-if="pokemon.image" v-bind:src="pokemon.image" :alt="pokemon.name">
      <p>Nº:{{ formatId(pokemon.id) }}</p>
     <!-- <p>Altura: {{ pokemon.height / 10 }}m</p>
      <p>Peso: {{ pokemon.weight / 10}} kg</p>
      <p>Descrição: {{ pokemon.description}}</p>
      <audio v-if="pokemon.audio" :src="pokemon.audio" controls></audio>
      <p v-if="pokemon.types">Tipos: {{ pokemon.types.join(', ') }}</p>
      <button>abrir modal</button>-->
    </div>
  </div>  
  `,
  methods: {
    openModal(pokemon) {
      this.$emit('open-modal', pokemon);
    },
    formatId(id){
      return String(id).padStart(4, '0');
    }
  }
});
Vue.component('pokemon-modal', {
  props: ['pokemonData'],
  template: `
  <div class="modal">
    <p>{{ pokemonData.name }}</p>
    <p>{{ pokemonData.weight }}</p>
    <p>{{ pokemonData.height }}</p>
  </div>
  `
});

new Vue({
    el: '#app',
    data () {
      return {
        address: "https://pokeapi.co/api/v2/",
        allPokemons: "pokemon?limit=100000&offset=0",
        pokemons: [],
        selectedPokemon: false,
        page: 1,
        loading: false,
        limit: 20,        
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
          this.pokemons.push(pokemonData);
          count++;          
        }  
        this.page++;
        this.loading = false;        
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
      openModal(pokemon) {
        this.selectedPokemon = pokemon;
        console.log(selectedPokemon)  
      },
      closeModal() {
        this.selectedPokemon = false;
      }
      
    }
  });
  