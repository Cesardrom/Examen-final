
import { IPokemon, Pokemon } from './pokemon';

class PokemonTrainer {
    private pokemons: Pokemon[] = [];

    constructor() {
        this.loadPokemonList();
    }

    async loadPokemonList(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/pokemon_data');
            if (!response.ok) {
              throw new Error('Failed to load Pokemon data');
            }
            const data: IPokemon[] = await response.json();
            this.pokemons = data.map(pokemon => new Pokemon(
              pokemon.id,
              pokemon.name,
              pokemon.attack,
              pokemon.defense,
              pokemon.speed,
              pokemon.hp,
              pokemon.special_attack
            ));
            this.populatePokemonList();
            this.startTrain
          } catch (error) {
            console.error(error);
            alert('Error loading Pokemon data.');
          }
        }
        
    private populatePokemonList(): void {
        const select = $('#pokemon-list');
        this.pokemons.forEach(pokemon => {
            select.append(`<option value="${pokemon.id}">${pokemon.name}</option>`);
        });
    }
    
    private startTrain(){
        $('#start-training').on('click', () => {
            const selectedId = parseInt($('#pokemon-list').val() as string);
            const selectedPokemon = this.pokemons.find(p => p.id === selectedId);
            if (selectedPokemon) {
                this.startTraining(selectedPokemon);
            }
        });
    }

    private startTraining(pokemon: Pokemon): void {
        const skill: 'attack' | 'defense' | 'speed' | 'hp' | 'special_attack' = 'attack'; // Puedes cambiar esto para seleccionar la habilidad a entrenar
        const trainingTime = Math.floor(Math.random() * 10) + 1; // Tiempo aleatorio entre 1 y 10 segundos

        $('#message').text(`Entrenando a ${pokemon.name} en ${skill} durante ${trainingTime} segundos.`);
        
        setTimeout(() => {
            pokemon.train(skill, 10); // Incrementar un 10%
            $('#message').text(`El Pokémon ${pokemon.name} ha subido de nivel en ${skill} con ${pokemon[skill]} puntos. ¿Desea actualizarlos?`);
            if (confirm('¿Desea actualizar los puntos de la habilidad entrenada?')) {
                this.updatePokemonData(pokemon);
            }
        }, trainingTime * 1000);
    }

    async updatePokemonData(updatedPokemon: Pokemon): Promise<void> {
        try {
          console.log('Enviando datos actualizados al servidor:', updatedPokemon);
          const response = await fetch('http://localhost:3000/pokemon_data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPokemon)
          });
          if (!response.ok) {
            throw new Error('Failed to update Pokemon data');
          }
          console.log('Pokemon data updated successfully');
        } catch (error) {
          console.error('Error updating Pokemon data:', error);
          alert('Failed to update Pokémon data.');
        }
      }
};

$(document).ready(() => {
    new PokemonTrainer();
});