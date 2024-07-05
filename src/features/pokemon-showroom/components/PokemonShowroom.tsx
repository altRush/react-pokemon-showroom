import { useSelector } from 'react-redux';
import {
	PokemonProfile,
	fetchThreePokemonProfiles,
	updatePokemonIndex
} from '../../../store/pokemonShowroom';
import { useDispatch } from 'react-redux';
import {
	capitalizeFirstLetter,
	getMoreThreePokemonsProfiles
} from '../../../utils';

import BackToIndex from '../../../components/BackToIndex';
import { AppDispatch, RootState } from '../../../store';

interface IProps {
	pokemonProfiles: PokemonProfile[];
}

function PokemonShowroom({ pokemonProfiles }: IProps) {
	const gen1Pokemons = pokemonProfiles;
	const dispatch = useDispatch<AppDispatch>();
	const { currentPokemonIndex, pokemonStack } = useSelector(
		(state: RootState) => state.pokemonShowroomStack
	);
	return (
		<>
			<div className="text-xl">PokemonShowroom</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3">
				{pokemonStack.map((pokemon, index: number) => {
					return (
						<div className="grid justify-center" key={index}>
							<img src={pokemon.sprite} alt="" />
							<div>{capitalizeFirstLetter(pokemon.name)}</div>
						</div>
					);
				})}
			</div>
			<p>
				<button
					className="btn btn-blue rounded-none"
					onClick={async () => {
						const newThreePokemonProfiles = getMoreThreePokemonsProfiles(
							currentPokemonIndex,
							gen1Pokemons
						);

						dispatch(updatePokemonIndex(currentPokemonIndex + 3));

						dispatch(
							fetchThreePokemonProfiles(
								newThreePokemonProfiles as PokemonProfile[]
							)
						);
					}}
				>
					Load more pokemons..
				</button>
			</p>
			<BackToIndex />
		</>
	);
}

export default PokemonShowroom;
