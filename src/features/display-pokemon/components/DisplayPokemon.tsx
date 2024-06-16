import { connect } from 'react-redux';
import { incremented, decremented } from '../../../stores';

const actionCreators = {
	incremented,
	decremented
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DisplayPokemon({ counter, incremented, decremented }: any) {
	return (
		<>
			<div>{counter}</div>
			<h1>Vite + React</h1>
			<div className="card">
				<p onClick={incremented}>Increase</p>
				<p onClick={decremented}>Decrese</p>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapState = (state: any) => state;

const ConnectedDisplayPokemon = connect(
	mapState,
	actionCreators
)(DisplayPokemon);

export default ConnectedDisplayPokemon;
