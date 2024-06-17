import { connect } from 'react-redux';

const actionCreators = {};

function PokemonShowroom() {
	return <div>PokemonShowroom</div>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: any) => state;

const ConnectedPokemonShowroom = connect(
	mapState,
	actionCreators
)(PokemonShowroom);

export default ConnectedPokemonShowroom;
