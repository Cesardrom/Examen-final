
// TypeScript types for Pokémon data
export interface IPokemon {
    id: number;
    name: string;
    attack: number;
    defense: number;
    speed: number;
    hp: number;
    special_attack: number;
}


export class Pokemon implements IPokemon{ // Creamos una Clase llamada Pokemon que implementa la Interface IPokemon
    constructor(public id: number, public name:string, public attack: number, public defense: number, public speed: number, public hp: number, public special_attack: number){} // Designamos un constructor al cual se le pasan todos los parametros requeridos junto con sus tipos
    train(skill: 'attack'|'defense'|'speed'|'hp'|'special_attack', percentage: number){ // Se crea un metodo train dentro de la clase Pokemon para que las habilidades puedan ser entrenadas.
        const increment = Math.round(this[skill] * (percentage/100)); //  Esto se hace a traves de la funcion de Javascript Math.round para redondear el valor y despues se multiplica el valor de la habilidad por un porcentaje recibido
        this[skill] += increment; // Sumamos la cantidad que calculamos a la habilidad
    }
}