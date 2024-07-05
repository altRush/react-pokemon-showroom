import { PokemonFullProfile, PokemonProfile } from '../stores/pokemonShowroom';

export function capitalizeFirstLetter(word: string): string {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getMoreThreePokemonsProfiles(
	currentIndex: number,
	pokemonData: PokemonProfile[]
): Partial<PokemonFullProfile>[] {
	const newThreePokemonsToDisplay: Partial<PokemonFullProfile>[] =
		pokemonData.slice(currentIndex, currentIndex + 3);

	return newThreePokemonsToDisplay;
}
