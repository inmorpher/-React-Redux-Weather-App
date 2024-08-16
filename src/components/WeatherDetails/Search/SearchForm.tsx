import React, { ReactNode, RefObject } from 'react';
import Button from '../../UI/Button';

interface ISearchFormProps {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	children?: ReactNode;
}

interface ISearchButtonProps {
	handleGeolocationSearch: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => Promise<void>;
}

interface ISearchInputProps {
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inputRef: RefObject<HTMLInputElement>;
}

type ISearchFormComponentProps = React.FC<ISearchFormProps> & {
	Button: React.FC<ISearchButtonProps>;
	Input: React.FC<ISearchInputProps>;
};

/**
 * SearchForm component for rendering a customizable search form.
 *
 * This component includes two subcomponents:
 * - SearchForm.Button: A button for geolocation search
 * - SearchForm.Input: An input field for text-based search
 *
 * @component
 * @param {Object} props - The component props.
 * @param {(event: React.FormEvent<HTMLFormElement>) => void} props.handleSubmit - Function to handle form submission.
 * @param {ReactNode} props.children - Child components to be rendered inside the form.
 * @returns {JSX.Element} A form element with provided children and submission handler.
 *
 * @example
 * <SearchForm handleSubmit={onSubmit}>
 *   <SearchForm.Button handleGeolocationSearch={geoSearch} />
 *   <SearchForm.Input handleInputChange={onChange} inputRef={inputRef} />
 * </SearchForm>
 */
const SearchForm: ISearchFormComponentProps = ({ handleSubmit, children }) => {
	return (
		<form
			className='bg-weather-gradient border-1 flex h-full w-full justify-center justify-self-end overflow-hidden rounded-md border-white transition-all md:w-full'
			onSubmit={handleSubmit}
			role='form'
			aria-label='search form'
		>
			{children && children}
		</form>
	);
};

/**
 * Button subcomponent for SearchForm, used for geolocation search.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>} props.handleGeolocationSearch - Function to handle geolocation search.
 * @returns {JSX.Element} A Button component configured for geolocation search.
 */
const SearchButton: React.FC<ISearchButtonProps> = ({ handleGeolocationSearch }) => (
	<Button
		tabIndex={0}
		size='medium'
		onClick={handleGeolocationSearch}
		type='button'
		className='aspect-square flex-shrink-0 bg-geolocation-btn bg-contain bg-center bg-no-repeat opacity-50 transition-opacity focus:outline-none hocus:opacity-100'
		aria-label='geolocation'
		role='button'
	/>
);

/**
 * Input subcomponent for SearchForm, used for text-based search.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.handleInputChange - Function to handle input changes.
 * @param {RefObject<HTMLInputElement>} props.inputRef - Ref object for the input element.
 * @returns {JSX.Element} An input element configured for search functionality.
 */
const SearchInput: React.FC<ISearchInputProps> = ({ handleInputChange, inputRef }) => (
	<input
		type='search'
		name='searchbox'
		autoComplete='off'
		className='w-full border-b-2 border-transparent bg-transparent px-3 text-right text-white outline-none placeholder:text-white/[.5] focus:border-b-2 focus:border-b-white'
		placeholder='type your city'
		ref={inputRef}
		onChange={handleInputChange}
		autoFocus
	/>
);

SearchForm.Button = SearchButton;
SearchForm.Input = SearchInput;

export default SearchForm;
