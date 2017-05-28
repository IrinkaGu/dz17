const Pokemon = require('./pokemon.js');
const random = require('./random.js');

class PokemonList  extends Array{

	add(name, level){
		if (name != "" && level != undefined){
			let pokemon = new Pokemon (name, level); 
			this.push(pokemon);
		} else {
			throw Error("Пустое имя или уровень!");
		}
	}
	
	show(){
		if (this.length > 0) {
			for (let pokemon of this){
				pokemon.show();
			}
		} else {
			throw Error("Список пуст!");
		}
	}
	
	max(){
		if (this.length > 0) {
			return this.reduce((prev, cur) => {
				return cur >= prev
					? cur
					: prev;
			});
		} else {
			throw Error("Список пуст!");
		}
	}
	
	loadPokemon(pokemonsJson){
		pokemonsJson.map(
			obj => this.add(obj.name, obj.level)
		);
	}
	
	getRandomPokemon(){
		let length = (this.length > 0) ? this.length - 1 : 0;
        let index = random(0, length);
        return super.splice(index, 1)[0];
	}
	
	getPokemonCountSync(max_pokemon){
		let max;
		let res;
		(this.length > max_pokemon) ? max = max_pokemon : max = this.length;
		res = random(1, max);
		return res;
	}
}

module.exports = PokemonList;

