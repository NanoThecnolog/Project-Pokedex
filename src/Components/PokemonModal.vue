<template>
    <div class="modal-wrapper" v-if="pokemonData" app>
      <div class="modal">       
        <div class="content">
              <button class="close-btn" @click="closeModal">x</button>
              <div class="col-md-6 painel left-painel">
                <div class="pokemon-name screen">                  
                    {{ pokemonData.name }}
                    <span class="n-name">#{{ pokemonData.id }}</span>
                  
                </div>
                  <div class="shiny-container">
                      <div class="image-container">
                          <p>Peso: {{ pokemonData.weight / 10}} kg</p>
                          <p>Altura: {{ pokemonData.height / 10 }}m</p>
                        
                          <img v-if="sprite" @click="playCrie" :src="sprite" :alt="pokemonData.name" class="pokeImage" title="Clique no pokemon para ouvi-lo!">
                      </div>                      
                      <div class="sprite-controls">
                        <div @click="spriteFemale" class="sprite-control sprite-controls-gender">F</div>
                        <div @click="spriteShiny" class="sprite-control sprite-controls-shiny"><span>Shiny</span></div>
                        <div @click="spriteBack" class="sprite-control sprite-controls-rotate">R</div>

                      </div>
                  </div>
                
                <div class="pokeInfo screen">
                    
                    <!--<p>Peso: {{ pokemonData.weight / 10}} kg</p>
                    <p>Altura: {{ pokemonData.height / 10 }}m</p>-->
                
                  <p>{{ pokemonData.description}}</p>
                  <!--<button class="audio-btn" @click="playCrie"><svg-icon type="mdi" :path="path"></svg-icon></button>-->
                  <audio ref="audioCrie" v-if="pokemonData.audio" :src="pokemonData.audio"></audio>
                  <!--<div class ="types" v-if="pokemonData.types">
                      
                      <div class="d-flex">
                        <h4>Tipos:</h4>
                        <button v-if="pokemonData.types[0]" :style="{ backgroundColor: colors[pokemonData.types[0]]}">{{ pokemonData.types[0] }}</button>
                        <button v-if="pokemonData.types[1]" :style="{ backgroundColor: colors[pokemonData.types[1]]}">{{ pokemonData.types[1] }}</button>
                      </div>
                      
                  </div>-->
                </div>
              </div> 
              <div class="divide">
                <div class="gap"></div>
                <div class="hinge"></div>
                <div class="gap"></div>
                <div class="hinge"></div>
                <div class="gap"></div>
                <div class="hinge"></div>
                <div class="gap"></div>
              </div>       
              <div class="col-md-5 painel right-painel">                
                <!--<p v-if="pokemonData.game_version">{{ pokemonData.game_version.join(', ') }}</p>-->
                <div class="painel-row">
                  <div class="screen stats">
                    <div class="stat-line">HP..............</div>
                    <div class="stat-line">Attack..........</div>
                    <div class="stat-line">Defense.........</div>
                    <div class="stat-line">Sp.Attack.......</div>
                    <div class="stat-line">Sp.Defense......</div>
                    <div class="stat-line">Speed...........</div>
                  </div>
                  <div class="type-list">
                    <div class="panel-header">Types</div>
                    <div class="type-box">
                      <div class="type" v-if="pokemonData.types[0]" :style="{ backgroundColor: colors[pokemonData.types[0]]}">{{ pokemonData.types[0] }}</div>
                      <div class="type" v-if="pokemonData.types[1]" :style="{ backgroundColor: colors[pokemonData.types[1]]}">{{ pokemonData.types[1] }}</div>
                    </div>
                  </div>
                </div>
                <div class="painel-row panel-evo">
                  <div>
                      <div class="flex-center">
                        <div class="evo-num">I</div>
                      </div>
                        <div :class="{ 'pokemon-sprite': !evoOne, 'pokemon-sprite-small': !evoOne, 'empty-evo': !evoOne }">
                          <img v-if="evoOne" :src="evoSpriteOne" :alt="evoOne" class="pokemon-sprite pokemon-sprite-small">
                        </div>
                        <div class="screen evo-name">{{ evoOne ? evoOne : 'No data' }}</div>
                  </div>
                  
                  <div>
                    <div class="flex-center">
                      <div class="evo-num">II</div>
                    </div>                  
                      <div :class="{ 'pokemon-sprite': !evoOne, 'pokemon-sprite-small': !evoOne, 'empty-evo': !evoOne }">
                        <img v-if="evoTwo" :src="evoSpriteTwo" :alt="evoTwo" class="pokemon-sprite pokemon-sprite-small">
                      </div>
                      <div class="screen evo-name">{{ evoTwo ? evoTwo : 'No data' }}</div>
                  </div>
                  
                  <div>
                      <div class="flex-center">
                          <div class="evo-num">III</div>
                      </div>
                      <div :class="{ 'pokemon-sprite': !evoOne, 'pokemon-sprite-small': !evoOne, 'empty-evo': !evoOne }">
                          <img v-if="evoTree" :src="evoSpriteTree" :alt="evoTree" class="pokemon-sprite pokemon-sprite-small">
                      </div>
                      <div class="screen evo-name">{{ evoTree ? evoTree : 'No data' }}</div>
                  </div>
                  
                </div>


                colocar evoluções, a lista de movimentos q ele aprende

              </div>
              
        
        </div>
      </div>
    </div>
</template>

<script>

import { mdiWaveform } from '@mdi/js';

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
  name: "my-component",

  data() {
    return {
      path: mdiWaveform,
      colors: colors,
      sprite: this.pokemonData.spriteDefault,
      isShiny: false,
      female: false,
      isBack: false,
      evoOne: '',
      evoTwo: '',
      evoTree: '',
      evoSpriteOne: '',
      evoSpriteTwo: '',
      evoSpriteTree: '',
    }
  },
  props: ['pokemonData'],
    
  methods: {
    closeModal() {
        this.$emit('close-modal');
        
    },
    playCrie(){
        const audioCrie = this.$refs.audioCrie;
        audioCrie.play();
    },
    spriteShiny() {      
      if (!this.isShiny) {
        if(this.pokemonData.spriteShiny) {
          this.sprite = this.pokemonData.spriteShiny
        } else {
          this.sprite = this.pokemonData.spriteDefault
        }       
      } else {
        this.sprite = this.pokemonData.spriteDefault        
      }
      this.isShiny = !this.isShiny;
      
      console.log("chamando shiny", this.isShiny)

    },    
    spriteFemale() {
      if (!this.isShiny) {
        if (this.female) {
          this.sprite = this.pokemonData.spriteDefault;
        } else {
          this.sprite = this.pokemonData.spriteFemale || this.pokemonData.spriteDefault;
        }
      } else {
        if (this.female) {
          this.sprite = this.pokemonData.spriteShiny;
        } else {
          this.sprite = this.pokemonData.spriteShinyFemale || this.pokemonData.spriteShiny;
        }
      }

      this.female = !this.female;
      //console.log("chamando female", this.female);
},
    spriteBack() {
        if (!this.isBack) {
          if (this.female) {
            if (this.shiny && this.pokemonData.spriteShinyFemaleBack) {
              this.sprite = this.pokemonData.spriteShinyFemaleBack;
            } else if (this.pokemonData.spriteBackFemale) {
              this.sprite = this.pokemonData.spriteBackFemale;
            } else {
              this.sprite = this.pokemonData.spriteBackDefault || this.pokemonData.spriteDefault;
            }
          } else {
            if (this.shiny && this.pokemonData.spriteShinyBack) {
              this.sprite = this.pokemonData.spriteShinyBack;
            } else {
              this.sprite = this.pokemonData.spriteBackDefault || this.pokemonData.spriteDefault;
            }
          }
        } else {
          if (this.female) {
            if (this.shiny && this.pokemonData.spriteShinyFemale) {
              this.sprite = this.pokemonData.spriteShinyFemale;
            } else {
              this.sprite = this.pokemonData.spriteFemale || this.pokemonData.spriteDefault;
            }
          } else {
            if (this.shiny && this.pokemonData.spriteShiny) {
              this.sprite = this.pokemonData.spriteShiny;
            } else {
              this.sprite = this.pokemonData.spriteDefault;
            }
          }
        }
        this.isBack = !this.isBack;
        //console.log("chamando back", this.isBack);
    },
    async evoChain() {      
      const evoUrl = this.pokemonData.specieData.evolution_chain.url;
      const urlSprite = 'https://pokeapi.co/api/v2/pokemon/';
        try {
        
        const evoResponse = await fetch(evoUrl);
        const evoData = await evoResponse.json();      
        
        if (evoData.chain.species.name) {
          this.evoOne = evoData.chain.species.name;
          if (this.evoOne){
            const fetchEvoSpriteOne = await fetch(urlSprite + this.evoOne);
          const dataEvoSpriteOne = await fetchEvoSpriteOne.json();
          this.evoSpriteOne = dataEvoSpriteOne.sprites.front_default;
          }
        } else {
          this.evoOne = null;
        }
        if (evoData.chain.evolves_to[0].species.name) {
          this.evoTwo = evoData.chain.evolves_to[0].species.name;
          if (this.evoTwo){
            const fetchEvoSpriteTwo = await fetch(urlSprite + this.evoTwo);
            const dataEvoSpriteTwo = await fetchEvoSpriteTwo.json();
            this.evoSpriteTwo = dataEvoSpriteTwo.sprites.front_default;
          }
        } else {
          this.evoTwo = null;
        }
        if (evoData.chain.evolves_to[0].evolves_to[0].species.name) {
          this.evoTree = evoData.chain.evolves_to[0].evolves_to[0].species.name;
          if (this.evoTree) {
            const fetchEvoSpriteTree = await fetch(urlSprite + this.evoTree);
            const dataEvoSpriteTree = await fetchEvoSpriteTree.json();
            this.evoSpriteTree = dataEvoSpriteTree.sprites.front_default;
          }
          
        } else {
          this.evoTree = null;
        }            
        console.log("funcionando");
        
        return evoData
      }catch (error) {
        console.error("Erro ao buscar dados da cadeia de evolução:", evoUrl, error);
      }

      
      
    },
    
    
    
  },
  mounted() {
    this.$refs.audioCrie.volume = 0.3;
    this.evoChain();
    
    
  },
  computed: {    
    
  }
}



</script>


<style scoped>
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;    
    align-items: center;
    justify-content: center;   
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
    
}
.modal {
  background-color: #E61515;
  border: 15px double black;
  padding: 5px;
  border-radius: 10px;
  position: relative;  
  width: 50%; 
  display: flex; 
}
.content {  
  display: flex;
}
.painel {
  display: flex;
  flex-direction: column;
}
.left-painel {
  

}
.pokemon-name {
  font-size: 18px;
  letter-spacing: 4px;
  border-radius: 5px;
  height: 35px;
  box-sizing: border-box;


}
.n-name {
  float: right;  
}
.image-container {
  position: relative;
  width: 100%;
  background: linear-gradient(15deg, #cad5b5 64%, #dde2d4 70%, #dde2d4 81%, #fff 86%, #dde2d4 89%, #dde2d4 100%);
  border-radius: 10px;
  border: inset #9aa28b 5px;
  height: 300px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-container p {
  position: absolute;
  bottom: 1%;
  left: 5%;
  font-size: 12px;
  letter-spacing: 4px;
  color: #2424247e;  
}
.image-container p + p {
  position: absolute;
  top: 5%;
  left: 5%;
  font-size: 12px;
  letter-spacing: 4px;
  color: #2424247e;  
}
.pokeInfo {
  font-size: 12px;
  letter-spacing: 0;
  box-sizing: border-box;
  min-height: 110px;
  flex: 1;
}



.divide {
    display: flex;
    flex-direction: column;
    width: 30px;
    margin: 0 20px;
    align-items: center;
    border: inset #460f0f 4px;
    border-radius: 4px;
    background: #460f0f;
}

.divide > * {
    border-radius: 4px;
    border: solid #2d0d0d 2px;
}

.hinge {
    background: linear-gradient(90deg, #891313 0, #b31818 30%, #e61515 45%, #fd5555 65%, #e61515 95%);
    border-right-color: #fd5555;
    border-top-color: #fd5555;
    flex: 10;
    width: 100%;
    border-left-color: #5f1010;
}
.gap:first-child {
    border-radius: 0 0 5px 5px;
    border-top: none;
}
.gap:last-child {
    border-radius: 5px 5px 0 0;
}
.gap {
    background: linear-gradient(90deg, #460f0f 0, #891313 30%, #b31818 45%, #fd5555 65%, #b31818 95%);
    border-top-color: #891313;
    border-right-color: #b31818;
    flex: 1;
    width: 95%;
}






.screen {
  
  background: linear-gradient(14deg, rgb(165, 205, 83) 60%, rgb(193, 217, 144) 65%);
  border: inset #879a65 3px;  
  box-sizing: border-box;

}

.pokeImage {  
  padding: 50px;
  height: 250px;
  display: flex;
  flex-direction: column;  
  image-rendering: pixelated;
  cursor: pointer;
}

.sprite-controls {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  
}
.sprite-control {
  height: 30px;
  width: 30px;
  border: groove grey 3px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;  
  color: white;
  padding: 1px;
  border-color: #b06868;
}
.sprite-control:hover {
  border-color: #b8ed7c;
}
.sprite-control:active {
  border-color: #f4fcb9;
}

.sprite-controls-shiny {
  background: linear-gradient(14deg, #bf8823 10%, #ffee90 25%, #e6a617 47%, #ffee90 73%, #fff6c8 74%, #ffee90 80%);
  border-color: #cdb589;
  width: 90px;
  text-shadow: black -1px 1px;
}
.screen {
  background: linear-gradient(14deg, rgb(165, 205, 83) 60%, rgb(193, 217, 144) 65%);
  padding: 5px;
  border: inset #879a65 3px;


}

.right-painel {
  padding: 0;
  width: 100%;
}
.painel-row {
  display: flex;
  border-bottom: groove #757575 3px;
  justify-content: space-evenly;
}
.painel-row:last-child {
  border-top: groove #757575 3px;
  border-bottom: none;
}
.stats {
  width: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 5px;
  flex: 1;
}
.stat-line {
  font-size: 17px;
  text-transform: capitalize;
}
.type {
  text-transform: capitalize;
  font-size: 1.5em;
  padding: 2px;
  margin: 2px;
  border: groove #757575 3px;
  border-radius: 10px;
  width: 150px;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: rgba(255,255,255,0.3) -1px -1px;
  align-self: center;
  background-blend-mode: hard-light;
}
.panel-header {
  text-transform: capitalize;
  font-size: 1.25em;
  padding: 5px;
  letter-spacing: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(14deg, #460f0f 0, #891313 30%, #b31818 45%, #fd5555 65%, #b31818 95%);
  border: groove #e61515 3px;
  border-width: 3px 2px;
  text-shadow: #fd5555 -1px 1px;
}
.type-list {
  display: flex;
  flex-direction: column;
  border-left: groove #757575 3px;
  flex: 1;
}
.type-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
  background: linear-gradient(14deg, #afafaf 50%, #ffffff 80%, #afafaf 90%);
  border-top: groove #757575 3px;
}
.panel-evo {
  flex-wrap: wrap;
}
.empty-evo {
  background: linear-gradient(15deg, #83887b 64%, #8b8f81 70%, #8b8f81 81%, #babfb1 86%, #8b8f81 89%, #8b8f81 100%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.poke-ball {
    border: solid black 4px;
    background: black;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    position: relative;
    opacity: 0.8;
}
.poke-ball-top {
    background: #83887a;
    flex: 1;
    width: 100%;
    opacity: 0.3;
}
.poke-ball-center {
    display: flex;
    width: 22px;
    height: 22px;
    border: solid black 4px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
}
.poke-ball-dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: black;
    border: solid #83887a 6px;
}
.poke-ball-bottom {
    background: #83887a;
    flex: 1;
    width: 100%;
}








.types button {
  width: 80px;
  height: 30px;
  margin: 10px;  
  border-radius: 5px;
  box-shadow: 0px 0px 0px 2px #289bb88a;
  font-family: sans-serif;
  color: white;
  font-weight: 700;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;  
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  font-size: 20px;
  cursor: pointer;
}
.audio-btn {
  color: white;  
}


/**phone*/
@media (max-width: 575.98px) {
  .content img {
    width: 150px;
  }
  .modal {
    width: 80%;
  }
}
/**Small*/
@media (min-width: 576px) and (max-width: 767.98px) {
  .content img {
    width: 150px;
  }
  .modal {
    width: 80%;
  }
}
/**tablet*/
@media (min-width: 768px) and (max-width: 991.98px){
  .modal {
    width: 80%;
  }
}
/**pc */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .modal {
    width: 80%;
  }

}
/**large */
@media (min-width: 1200px) and (max-width: 1688.98px) {

}
/**extra large */
@media (min-width: 1689px) {

}
    
</style>