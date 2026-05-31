import { useSelector, useDispatch } from 'react-redux';
import {
	PokemonProfile,
	fetchThreePokemonProfiles,
	updatePokemonIndex
} from '../../../store/pokemonShowroom';
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
	const dispatch = useDispatch<AppDispatch>();
	const { currentPokemonIndex, pokemonStack, isLoading } = useSelector(
		(state: RootState) => state.pokemonShowroomStack
	);
	return (
		<>
			<div className="text-xl">PokemonShowroom</div>

			<div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3">
				{pokemonStack.map(pokemon => {
					return (
						<div className="grid justify-center" key={pokemon.name}>
							<img src={pokemon.sprite} alt="" />
							<div>{capitalizeFirstLetter(pokemon.name)}</div>
						</div>
					);
				})}
			</div>
			<p>
				<button
					className="btn btn-blue rounded-none"
					disabled={isLoading}
					onClick={() => {
						const newThreePokemonProfiles = getMoreThreePokemonsProfiles(
							currentPokemonIndex,
							pokemonProfiles
						);

						dispatch(updatePokemonIndex(currentPokemonIndex + 3));

						dispatch(
							fetchThreePokemonProfiles(newThreePokemonProfiles)
						);
					}}
				>
					{isLoading ? 'Loading...' : 'Load more pokemons..'}
				</button>
			</p>
			<BackToIndex />
		</>
	);
}

export default PokemonShowroom;
