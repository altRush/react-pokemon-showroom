import App from './../App';
import { render, screen } from '@testing-library/react';

describe('first', () => {
	beforeAll(() => {
		render(<App />);
	});

	test('should first', () => {
		expect(screen.getByText('Search Pokemon')).toBeDefined();
		expect(screen.getByText('Pokemon Showroom')).toBeDefined();
	});
});
