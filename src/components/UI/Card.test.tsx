import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
	it('should render the Card component with default props', () => {
		const { getByRole } = render(<Card />);
		const cardElement = getByRole('heading', { level: 4 });
		expect(cardElement).toBeInTheDocument();
		expect(cardElement).toHaveTextContent('');
	});

	it('should render the Card component with a title', () => {
		const { getByRole } = render(<Card title='Test Title' />);
		const cardElement = getByRole('heading', { level: 4 });
		expect(cardElement).toBeInTheDocument();
		expect(cardElement).toHaveTextContent('Test Title');
	});

	it('should render the Card component with children elements', () => {
		const { getByText } = render(
			<Card>
				<span>Child Element</span>
			</Card>
		);
		const childElement = getByText('Child Element');
		expect(childElement).toBeInTheDocument();
	});

	it('should not render children when children prop is null', () => {
		const { container } = render(<Card children={null} />);
		const childElement = container.querySelector('span');
		expect(childElement).not.toBeInTheDocument();
	});

	it('should apply additional className to the Card component', () => {
		const { container } = render(<Card className='additional-class' />);
		const cardElement = container.firstChild;
		expect(cardElement).toHaveClass('additional-class');
	});
});
