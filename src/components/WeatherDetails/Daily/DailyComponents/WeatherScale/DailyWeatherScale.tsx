import {
	forwardRef,
	ReactNode,
	SVGLineElementAttributes,
	SVGProps,
	SVGTextElementAttributes,
} from 'react';

/**
 * A component that provides a container for daily weather scale elements.
 *
 * @param children - The child elements to be rendered within the container.
 * @returns A div element with the specified children, styled to center the content.
 */
const DailyWeatherScale = ({ children }: { children: ReactNode }) => {
	return <div className='mt-2 flex justify-center'>{children}</div>;
};

export const SVGWrapper = (props: SVGProps<SVGSVGElement>) => <svg {...props} />;

export const Line = (props: SVGLineElementAttributes<SVGLineElement>) => (
	<line {...props} data-testid='weather-curve-line' />
);

export const Text = (props: SVGTextElementAttributes<SVGTextElement>) => (
	<text {...props} data-testid='weather-curve-text' />
);

export const Curve = forwardRef<SVGPathElement, SVGProps<SVGPathElement>>((props, ref) => (
	<path {...props} ref={ref} />
));

DailyWeatherScale.SVGWrapper = SVGWrapper;
DailyWeatherScale.Line = Line;
DailyWeatherScale.Text = Text;
DailyWeatherScale.Curve = Curve;

export default DailyWeatherScale;
