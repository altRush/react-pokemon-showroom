import { connect, useSelector } from 'react-redux';
import {
	PokemonFullProfile,
	PokemonStackState,
	fetchThreePokemonProfiles,
	updatePokemonIndex
} from '../../../stores/pokemonShowroom';
import { useDispatch } from 'react-redux';
import { getMoreThreePokemonsProfiles } from '../../../utils';
import gen1Pokemons from '../../../config/gen-1-pokemons.json';

const actionCreators = { updatePokemonIndex };

function PokemonShowroom(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	{ pokemonShowroomStack, updatePokemonIndex }: any
) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<any>();
	const { currentPokemonIndex } = useSelector(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		state => (state as any).pokemonShowroomStack
	);
	return (
		<>
			<h2>PokemonShowroom</h2>

			<div>
				{pokemonShowroomStack?.pokemonStack.map(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(pokemon: any, index: number) => {
						return (
							<div key={index}>
								<img src={pokemon.sprite} alt="" />
								<div>{pokemon.name}</div>
							</div>
						);
					}
				)}
			</div>
			<p>
				<button
					onClick={async () => {
						const newThreePokemonProfiles = getMoreThreePokemonsProfiles(
							currentPokemonIndex,
							gen1Pokemons.results
						);

						await updatePokemonIndex(currentPokemonIndex + 3);

						dispatch(
							fetchThreePokemonProfiles(
								newThreePokemonProfiles as Partial<PokemonFullProfile>[]
							)
						);
					}}
				>
					Load more pokemons..
				</button>
			</p>
		</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: PokemonStackState) => state;

const ConnectedPokemonShowroom = connect(
	mapState,
	actionCreators
)(PokemonShowroom);

export default ConnectedPokemonShowroom;
