import { connect } from 'react-redux';
import {
	PokemonStackState,
	loadMoreThreePokemons
} from '../../../stores/pokemonShowroom';

const actionCreators = { loadMoreThreePokemons };

function PokemonShowroom(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	{ pokemonShowroomStack, loadMoreThreePokemons }: any
) {
	return (
		<>
			<h2>PokemonShowroom</h2>
			<button
				onClick={() => {
					loadMoreThreePokemons(pokemonShowroomStack?.currentPokemonIndex);
				}}
			>
				Load more pokemons..
			</button>
			<div>
				{
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					pokemonShowroomStack?.pokemonStack.map((pokemon: any) => {
						return <div>{pokemon.name}</div>;
					})
				}
			</div>
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
