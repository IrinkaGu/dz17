const assert = require("chai").assert;
const Pokemon = require("../class/pokemon.js");
const PokemonList = require("../class/pokemonList.js");

describe('Тестирование класса Pokemon', () => {
	describe('Тестирование функции show()', () => {
		let pokemon_norm;
		let action;

		before(() => {
			pokemon_norm = new Pokemon("Пикачу", 3);
			action = function() { 
				pokemon_norm.show(); 
			};
		});
		
		it('Вывод покемона', () => {
			pokemon_norm.show(); 
		});

		it('Функция вывода не изменяет значения name', () => {
			assert.doesNotChange(action, pokemon_norm, 'name');
		});
		
		it('Функция вывода не изменяет значения level', () => {
			assert.doesNotChange(action, pokemon_norm, 'level');
		});
	
	});
});

describe('Тестирование класса PokemonList', () => {
	let pokemon_list_norm;
	let pokemon_list_empty;

	before(() => {
		pokemon_list_norm = new PokemonList();
		pokemon_list_empty = new PokemonList();
	});
	
	describe('Тестирование функции add()', () => {
		it('Добавление первого покемона в список с корректными данными', () => {
			pokemon_list_norm.add("Пикачу",1);
			assert.deepEqual(pokemon_list_norm, [{
				name: "Пикачу",
				level: 1
			}])
		});
		
		it('Добавление последующих покемонов в список с корректными данными', () => {
			pokemon_list_norm.add("Райчу",2);
			pokemon_list_norm.add("Чермандер",1);
			assert.deepEqual(pokemon_list_norm, [
				{
					name: "Пикачу",
					level: 1
				},
				{
					name: "Райчу",
					level: 2
				},
				{
					name: "Чермандер",
					level: 1
				}
			])
		});
		
		it('Добавление покемона в список с пустым именем', () => {
			let action = function() { 
				pokemon_list_norm.add("", 1); 
			};
			
			assert.throws(action, "Пустое имя или уровень!");
		});
		
		it('Добавление покемона в список без уровня', () => {
			let action = function() { 
				pokemon_list_norm.add("Бульбазавр"); 
			};
			
			assert.throws(action, "Пустое имя или уровень!");
		});
	});
	
	describe('Тестирование функции show()', () => {
		before(() => {
			pokemon_list_norm = new PokemonList();
			pokemon_list_norm.add("Бульбазавр", 1);
			pokemon_list_norm.add("Ивизавр", 2);
			pokemon_list_norm.add("Венузавр", 3);
		});
		
		it('Вывод списка покемонов', () => {
			pokemon_list_norm.show();
		});
		
		it('Вывод пустого списка покемонов', () => {
			let action = function() { 
				pokemon_list_empty.show();
			};
			
			assert.throws(action, "Список пуст!");
		});
		
		
	});
	
	describe('Тестирование функции max()', () => {
		before(() => {
			pokemon_list_norm = new PokemonList();
			pokemon_list_norm.add("Бульбазавр", 1);
			pokemon_list_norm.add("Ивизавр", 2);
			pokemon_list_norm.add("Венузавр", 3);
		});
		
		it('Должен вернуть покемона максимального уровня из списка', () => {
			let pokemon_max = pokemon_list_norm.max();
			assert.deepEqual(pokemon_max, {
				name: "Венузавр",
				level: 3
			})
		});
		
		it('Список содержит несколько покемонов максимального уровня, должен вернуть одного', () => {
			pokemon_list_norm.add("Чаризард", 3);
			let pokemon_max = pokemon_list_norm.max();
			assert.deepEqual(pokemon_max, {
				name: "Чаризард",
				level: 3
			})
		});
		
		it('Список покемонов пуст', () => {
			let action = function() { 
				pokemon_list_empty.max();
			};
			
			assert.throws(action, "Список пуст!");
		});
	});

});