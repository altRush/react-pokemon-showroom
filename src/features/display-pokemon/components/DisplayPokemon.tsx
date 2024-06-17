import { connect } from 'react-redux';
import { searchPokemon, PokemonState } from '../../../stores/searchedPokemon';

const actionCreators = {
	searchPokemon
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DisplayPokemon({ searchPokemon, searchedPokemon }: any) {
	return (
		<>
			<h3>Search Pokemon</h3>
			<h2>{searchedPokemon}</h2>
			<div className="card">
				<input
					onChange={e => {
						searchPokemon(e.target.value);
					}}
					type="text"
					name="search-pokemon"
					id="search-pokemon"
				/>
			</div>
		</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: PokemonState) => state;

const ConnectedDisplayPokemon = connect(
	mapState,
	actionCreators
)(DisplayPokemon);

export default ConnectedDisplayPokemon;
