<template>
  <div class="container" app>
    <div v-for="pokemon in filteredPokemons"
      :style="{ backgroundColor: colors[pokemon.types[0]] || 'rgb(255, 146, 146)' }" :key="pokemon.id"
      class="pokemon container-pokemon" @click="openModal(pokemon)">
      <div class="img-container">
        <img v-if="pokemon.imageDefault" v-bind:src="pokemon.imageDefault" :alt="pokemon.name">
      </div>
      <h2>{{ pokemon.name }}</h2>
      <p>#{{ pokemon.id }}</p>

    </div>
  </div>

</template>

<script>
const colors = {
  fire: '#EC8484',
  grass: '#8CC66D',
  electric: '#e5e549',
  water: '#6699FF',
  ground: '#e0c068',
  rock: '#b8a038',
  fairy: '#F6C8D6',
  poison: '#C596BD',
  bug: '#a8b820',
  ghost: '#705898',
  dragon: '#7038f8',
  ice: '#98d8d8',
  dark: '#5b5b5b',
  psychic: '#f85888',
  flying: '#a890f0',
  fighting: '#903028',
  steel: '#b8b8d0',
  normal: '#a8a878'
}

export default {
  props: {
    pokemons: Array,
    filters: Object,
    tempPokemons: []
  },
  data() {
    return {
      colors: colors,
      pokemonsTemp: {}
    }
  },
  computed: {
    filteredPokemons() {
      //console.log("pokemons: ", this.pokemons)    
      if (!this.filters || Object.values(this.filters).every(value => value === '')) {
        return this.pokemons;
      }
      return this.pokemons.filter(pokemon => {
        return (
          (!this.filters.id || String(pokemon.id) === String(this.filters.id).padStart(4, '0')) &&
          (!this.filters.type || (Array.isArray(pokemon.types) ? pokemon.types.includes(this.filters.type) : pokemon.types === this.filters.type)) &&
          (!this.filters.species || pokemon.specieData.name === this.filters.species.toLowerCase()) &&
          (!this.filters.name || pokemon.name.toLowerCase().startsWith(this.filters.name.toLowerCase()))

        )
      },
      )
    },

  },

  methods: {
    openModal(pokemon) {
      //console.log(pokemon)
      this.$emit('open-modal', { pokeModal: pokemon });
    },
  }
}  
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

}

.container-pokemon {
  flex: 0 0 calc(15% - 10px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 10px;
  padding: 15px;
  border-radius: 15px;
  width: 164px;
  min-width: 205px;
  height: 300px;
  transition: all 0.5s ease;

}

.container-pokemon:hover {
  transform: scale(1.1);
  box-shadow: 2px 2px 15px 5px #24242465;



}

.img-container {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 140px;
  height: 140px;
  text-align: center;
  margin-bottom: 20px;
  color: #d4c937;

}

.img-container img {
  margin: 1px;
  width: 80%;
  height: 80%;
  border-radius: 15px;
  filter: drop-shadow(3px 1px 3px rgba(0, 0, 0, 0.5));
  transition: all 0.5s ease;
  padding-bottom: 5px;
}

.img-container img:hover {
  transform: scale(1.8);

  background-position: bottom;
}

/**phone*/
@media (max-width: 575.98px) {
  .img-container {
    width: 120px;
    height: 120px;
  }

  .container-pokemon {
    transform: scale(1);
    margin: 1%;
  }

  .container {
    padding: 0;
  }

}

/**Small*/
@media (min-width: 576px) and (max-width: 767.98px) {
  .img-container {
    width: 120px;
    height: 120px;
  }

  .container-pokemon {
    transform: scale(1);
    margin: 1%;

  }
}

/**tablet*/
@media (min-width: 768px) and (max-width: 991.98px) {
  .img-container {
    width: 120px;
    height: 120px;
  }
}

/**pc */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .img-container {
    width: 120px;
    height: 120px;
  }
}

/**large */
@media (min-width: 1200px) and (max-width: 1688.98px) {
  .img-container {
    width: 120px;
    height: 120px;
  }


}

/**extra large */
@media (min-width: 1689px) {}
</style>