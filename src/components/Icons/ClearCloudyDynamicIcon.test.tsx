import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ClearCloudyDynamicIcon from './ClearCloudyDynamicIcon';

describe('ClearCloudyDynamicIcon', () => {
	test('should render the sun shape when timeOfDay is not night', () => {
		const { getByTestId } = render(<ClearCloudyDynamicIcon timeOfDay='day' iconCode='01' />);

		const sunShape = getByTestId('sun-shape');

		expect(sunShape).toBeInTheDocument();
	});

	test('should render the moon shape when timeOfDay is night', () => {
		const { getByTestId } = render(<ClearCloudyDynamicIcon timeOfDay='night' iconCode='01' />);

		const moonShape = getByTestId('moon-shape');

		expect(moonShape).toBeInTheDocument();
	});

	test('should render the clouds shape when iconCode is "02"', () => {
		const { getByTestId } = render(<ClearCloudyDynamicIcon timeOfDay='day' iconCode='02' />);

		const cloudsShape = getByTestId('cloud-shape');

		expect(cloudsShape).toBeInTheDocument();
	});

	test('should not render the clouds shape when iconCode is not "02"', () => {
		const { queryByTestId } = render(<ClearCloudyDynamicIcon timeOfDay='day' iconCode='01' />);

		const cloudsShape = queryByTestId('cloud-shape');

		expect(cloudsShape).not.toBeInTheDocument();
	});

	test('should handle null or undefined values for timeOfDay and iconCode', () => {
		const { queryByTestId } = render(
			<ClearCloudyDynamicIcon
				timeOfDay={null as unknown as string}
				iconCode={undefined as unknown as string}
			/>
		);

		const sunShape = queryByTestId('sun-shape');
		const moonShape = queryByTestId('moon-shape');
		const cloudsShape = queryByTestId('cloud-shape');

		expect(sunShape).not.toBeInTheDocument();
		expect(moonShape).not.toBeInTheDocument();
		expect(cloudsShape).not.toBeInTheDocument();
	});
});
