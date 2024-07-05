import {
	capitalizeFirstLetter,
	getMoreThreePokemonsProfiles
} from '../../utils';

describe('Utils', () => {
	test('capitalizeFirstLetter', () => {
		const allLowerCaseWord = 'letter';
		const firstLetterCapitalizedWord = capitalizeFirstLetter(allLowerCaseWord);

		expect(firstLetterCapitalizedWord).toBe('Letter');
	});

	test('getMoreThreePokemonsProfiles', () => {
		const pokemonData = [
			{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
			{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
			{ name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
			{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
			{ name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }
		];
		const currentIndex = 3;

		const moreThreePokemonProfiles = getMoreThreePokemonsProfiles(
			currentIndex,
			pokemonData
		);

		expect(moreThreePokemonProfiles).toEqual([
			{ name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
			{ name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
			{ name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' }
		]);
	});
});
