import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store/store';
import Search from './Search'; // Adjust the import path as necessary
describe('Search Component', () => {
	it('renders correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Search />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByPlaceholderText('type yor city')).toBeInTheDocument();
	});

	it('allows typing in the search input', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Search />
				</MemoryRouter>
			</Provider>,
		);

		const input = screen.getByPlaceholderText('type yor city') as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'New York' } });
	});

	it('displays search results when typing', async () => {
		// Assuming your useSearch hook handles fetching/displaying results
		// This might require mocking the hook or the fetch call within it
	});

	it('calls onSubmitHandler when form is submitted', () => {
		// This test would check if the form submission is handled correctly
		// You might need to mock the onSubmitHandler function to test this
	});

	it('handles geolocation button click', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Search />
				</MemoryRouter>
			</Provider>,
		);

		const button = screen.getByLabelText('Search by geolocation');
		fireEvent.click(button);

		// Verify if the click handler does what it's supposed to do
		// This might involve mocking or spying on functions called within the handler
	});
});
