

class PokemonTrainer {
  private pokemonData: Pokemon[] = [];

  async loadPokemonList(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/pokemon_data');
      if (!response.ok) {
        throw new Error('Failed to load Pokemon data');
      }
      const data: IPokemon[] = await response.json();
      this.pokemonData = data.map(pokemon => new Pokemon(
        pokemon.id,
        pokemon.name,
        pokemon.attack,
        pokemon.defense,
        pokemon.speed,
        pokemon.hp,
        pokemon.special_attack
      ));
      this.populatePokemonList();
    } catch (error) {
      console.error(error);
      alert('Error loading Pokemon data.');
    }
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
}



export {};

