import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Card from './Card.tsx';

describe('Card Component', () => {
	test('should render the Card component with default props', () => {
		const { container } = render(<Card />);
		const cardElement = container.firstChild;

		expect(cardElement).toBeInTheDocument();
		expect(cardElement).toHaveClass('bg-weather-gradient');
		expect(cardElement).toHaveClass('flex');
		expect(cardElement).toHaveClass('h-full');
		expect(cardElement).toHaveClass('w-full');
		expect(cardElement).toHaveClass('flex-col');
		expect(cardElement).toHaveClass('items-center');
		expect(cardElement).toHaveClass('justify-center');
		expect(cardElement).toHaveClass('rounded-lg');
		expect(cardElement).toHaveClass('border-[.2px]');
		expect(cardElement).toHaveClass('border-white/50');
		expect(cardElement).toHaveClass('p-1');
		expect(cardElement).toHaveClass('shadow-basic');

		const headingElement = container.querySelector('h4');
		expect(headingElement).toBeInTheDocument();
		expect(headingElement).toHaveClass('block');
		expect(headingElement).toHaveClass('flex-shrink-0');
		expect(headingElement).toHaveClass('text-center');
		expect(headingElement).toHaveClass('text-sm');
		expect(headingElement).toHaveClass('font-light');
		expect(headingElement).toHaveAttribute('role', 'heading');
		expect(headingElement).toBeEmptyDOMElement();
	});

	test('should render the Card component with a given title', () => {
		const title = 'Test Title';
		const { getByRole } = render(<Card title={title} />);
		const headingElement = getByRole('heading');

		expect(headingElement).toBeInTheDocument();
		expect(headingElement).toHaveTextContent(title);
	});

	test('should apply additional className to the Card component', () => {
		const additionalClassName = 'extra-class';
		const { container } = render(<Card className={additionalClassName} />);
		const cardElement = container.firstChild;

		expect(cardElement).toBeInTheDocument();
		expect(cardElement).toHaveClass('bg-weather-gradient');
		expect(cardElement).toHaveClass('flex');
		expect(cardElement).toHaveClass('h-full');
		expect(cardElement).toHaveClass('w-full');
		expect(cardElement).toHaveClass('flex-col');
		expect(cardElement).toHaveClass('items-center');
		expect(cardElement).toHaveClass('justify-center');
		expect(cardElement).toHaveClass('rounded-lg');
		expect(cardElement).toHaveClass('border-[.2px]');
		expect(cardElement).toHaveClass('border-white/50');
		expect(cardElement).toHaveClass('p-1');
		expect(cardElement).toHaveClass('shadow-basic');
		expect(cardElement).toHaveClass(additionalClassName);
	});

	test('should render children elements inside the Card component', () => {
		const childText = 'Child Element';
		const { getByText } = render(
			<Card>
				<span>{childText}</span>
			</Card>
		);
		const childElement = getByText(childText);

		expect(childElement).toBeInTheDocument();
	});

	test('should not render the title if it is not provided', () => {
		const { container } = render(<Card />);
		const headingElement = container.querySelector('h4');

		expect(headingElement).toBeInTheDocument();
		expect(headingElement).toBeEmptyDOMElement();
	});

	test('should not render children if children prop is null', () => {
		const { container } = render(<Card children={null} />);
		const childElement = container.querySelector('span');

		expect(childElement).not.toBeInTheDocument();
	});

	test('should apply the default styles to the Card component', () => {
		const { container } = render(<Card />);
		const cardElement = container.firstChild;

		expect(cardElement).toBeInTheDocument();
		expect(cardElement).toHaveClass('bg-weather-gradient');
		expect(cardElement).toHaveClass('flex');
		expect(cardElement).toHaveClass('h-full');
		expect(cardElement).toHaveClass('w-full');
		expect(cardElement).toHaveClass('flex-col');
		expect(cardElement).toHaveClass('items-center');
		expect(cardElement).toHaveClass('justify-center');
		expect(cardElement).toHaveClass('rounded-lg');
		expect(cardElement).toHaveClass('border-[.2px]');
		expect(cardElement).toHaveClass('border-white/50');
		expect(cardElement).toHaveClass('p-1');
		expect(cardElement).toHaveClass('shadow-basic');
	});

	test('should render correctly when both title and children are provided', () => {
		const title = 'Test Title';
		const childText = 'Child Element';
		const { getByRole, getByText } = render(
			<Card title={title}>
				<span>{childText}</span>
			</Card>
		);

		const headingElement = getByRole('heading');
		const childElement = getByText(childText);

		expect(headingElement).toBeInTheDocument();
		expect(headingElement).toHaveTextContent(title);
		expect(childElement).toBeInTheDocument();
	});
});
